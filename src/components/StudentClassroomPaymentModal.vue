<template>
  <a-modal class="modal-student-classroom-payment" :visible="true" title="Оплата" @cancel="handleCancel" @ok="handleSubmit">
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
          v-for="({ title, key, filter: { type, variants } }) in columns"
          :key="key"
          :span="24"
        >
          <a-form-item :label="title">
            <a-textarea
              v-if="type === 'text'"
              v-decorator="[
                key,
                {
                  rules: [],
                  initialValue: content[key] || undefined
                },
              ]"
              :placeholder="title"
            />
            <a-input-number
              v-if="type === 'inputNumber'"
              v-decorator="[
                key,
                {
                  rules: [{ required: true, message: 'Поле обязательно для заполнения!' }],
                  initialValue: content[key] || undefined
                },
              ]"
              :placeholder="title"
              class="filters__input-number"
            />
            <a-select
              v-if="type === 'select'"
              v-decorator="[
                key,
                {
                  rules: [{ required: true, message: 'Поле обязательно для заполнения!' }],
                  initialValue: content[key]
                },
              ]"
              :placeholder="title"
            >
              <a-select-option v-for="(variant, key) in variants" :key="key">
                {{ variant }}
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
    content: [Object, null]
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
      form: this.$form.createForm(this, { name: 'student_classroom_payment_modal' }),
      columns: [
        {
          title: 'Сумма обучения',
          dataIndex: 'amount',
          key: 'amount',
          filter: {
            type: 'inputNumber'
          }
        },
        {
          title: 'Триместер',
          dataIndex: 'trimester',
          key: 'trimester',
          filter: {
            type: 'select',
            variants: {
              '1': 'Первый',
              '2': 'Второй',
              '3': 'Третий'
            }
          }
        },
        {
          title: 'Комментарий',
          dataIndex: 'comment',
          key: 'comment',
          filter: {
            type: 'text'
          }
        },
      ]
    }
  },

  mounted() {

  },

  computed: {
    title() {
      return this.type === 'add' ? 'Добавить' : 'Изменить'
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        if(error) {
          return
        }

        const url = this.type === 'add' ? `` : `/${this.content.id}`
        const type = this.type === 'add' ? 'post' : 'put'

        apiRequest[type](`/student-classrooms/${this.$route.params.student_classroom_id}/payments${url}`, values)
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
  &-student-classroom-payment {
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