<template>
  <a-modal class="modal-student-classroom-invoice" :visible="true" title="Инвойс" @cancel="handleCancel" @ok="handleSubmit">
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        Отмена
      </a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">
        Скачать
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
            <a-select
              v-if="type === 'select'"
              v-decorator="[
                key,
                {
                  rules: [{ required: true, message: 'Поле обязательно для заполнения!' }],
                },
              ]"
              mode="tags"
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

import { Modal, Form, Row, Col, Select } from 'ant-design-vue'

export default {
  props: {
    student_classroom_id: [Number, null]
  },
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-row': Row,
    'a-col': Col,
    'a-select': Select,
    'a-select-option': Select.Option,
  },

  data() {
    return {
      form: this.$form.createForm(this, { name: 'student_classroom_invoice_modal' }),
      columns: [
        {
          title: 'Триместры',
          dataIndex: 'trimesters',
          key: 'trimesters',
          filter: {
            type: 'select',
            variants: {
              '1': 'Первый',
              '2': 'Второй',
              '3': 'Третий'
            }
          }
        },
      ]
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        if(error) {
          return
        }
        const trimesters = values.trimesters.join('&trimesters[]=')
        const student_classroom_id = this.student_classroom_id ? this.student_classroom_id : this.$route.params.student_classroom_id

        window.open(`${process.env.VUE_APP_API_URL}/api/student-classrooms/${student_classroom_id}/invoice?trimesters[]=${trimesters}`, '_blank')

        this.handleCancel()
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
  &-student-classroom-invoice {
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