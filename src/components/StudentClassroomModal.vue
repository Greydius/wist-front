<template>
  <a-modal class="modal-student-classroom" :visible="true" title="Класс студента" @cancel="handleCancel" @ok="handleSubmit">
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        Отмена
      </a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">
        {{ title }}
      </a-button>
    </template>
    <a-form class="filters__form" :form="form" @submit="handleSubmit">
      <a-row :gutter="24">
        <a-col
          v-for="({ title, key, dataIndex, filter: { type: inputType } }) in columns"
          :key="key"
          :span="24"
        >
          <a-form-item :label="title">
            <a-textarea
              v-if="inputType === 'text'"
              v-decorator="[
                key,
                {
                  rules: [],
                  initialValue: content.pivot && content.pivot[key] || undefined
                },
              ]"
              :placeholder="title"
            />
            <a-input-number
              v-if="inputType === 'inputNumber'"
              v-decorator="[
                key,
                {
                  rules: [{ required: true, message: 'Поле обязательно для заполнения!' }],
                  initialValue: content.pivot && content.pivot[key] || undefined
                },
              ]"
              :placeholder="title"
              class="filters__input-number"
            />
            <a-select
              :disabled="type == 'edit'"
              v-if="inputType === 'selectClassroom'"
              v-decorator="[
                key,
                {
                  rules: [{ required: true, message: 'Поле обязательно для заполнения!' }],
                  initialValue: content[dataIndex] && String(content[dataIndex]) || undefined
                },
              ]"
              :placeholder="title"
            >
              <a-select-option v-for="variant in filterDataClassrooms" :key="variant.id">
                {{ variant.title }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import apiRequest from '../utils/apiRequest'

import { Modal, Form, Row, Col, Input, InputNumber, Select, } from 'ant-design-vue'

export default {
  props: {
    type: String,
    content: [Object, null],
    student_id: String,
  },
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-row': Row,
    'a-col': Col,
    'a-textarea': Input.TextArea,
    'a-input-number': InputNumber,
    'a-select': Select,
    'a-select-option': Select.Option,
  },

  data() {
    return {
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      filtersData: {
        classrooms: []
      },
      columns: [
        {
          title: 'Класс',
          dataIndex: 'id',
          key: 'classroom_id',
          filter: {
            type: 'selectClassroom'
          }
        },
        {
          title: 'Сумма обучения',
          dataIndex: 'pivot.amount',
          key: 'amount',
          filter: {
            type: 'inputNumber'
          }
        },
        {
          title: 'Комментарий',
          dataIndex: 'pivot.comment',
          key: 'comment',
          filter: {
            type: 'text'
          }
        },
      ]
    }
  },

  mounted() {
    this.getClassrooms()
  },

  computed: {
    title() {
      return this.type === 'add' ? 'Добавить' : 'Изменить'
    },

    filterDataClassrooms() {
      return this.filtersData.classrooms.map(({ id, grade, symbol, year }) => {
        return {
          id: String(id),
          title: `${grade + symbol} (${year})` 
        }
      })
    }
  },

  methods: {
    getClassrooms() {
      apiRequest.get(`/classrooms`)
        .then(({ data }) => {
          this.filtersData.classrooms = data.data
        })
        .catch((error) => console.log(error))
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        if(error) {
          return
        }

        const type = this.type === 'add' ? 'post' : 'put'

        apiRequest[type](`/students/${this.$route.params.id}/classrooms/${values.classroom_id}`, values)
          .then(() => {
            this.$emit('close')
          })
      });
    },

    handleCancel() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.modal {
  &-student-classroom {
    .filters {
      padding: 24px;
      border: 1px solid rgb(235, 237, 240);
      &__form {
        .ant-form {
          max-width: none;

          &-item {
            
          }
        }
      }
      &__input-number {
        width: 100%;
      }
    }
  }
}
</style>