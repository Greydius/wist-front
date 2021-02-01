<template>
  <a-modal class="modal-classroom-invoice" :visible="true" title="Инвойс" @cancel="handleCancel" @ok="handleSubmit">
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
                  rules: [],
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
    <template v-if="trimesters && trimesters.length > 0">
      <p v-for="student in students" :key="student.id">
        <a :href="invoiceUrl(student.pivot.id)" target="_blank">{{ student.name }}</a>
      </p>
    </template>
  </a-modal>
</template>

<script>
import apiRequest from '../utils/apiRequest'

import { Modal, Form, Row, Col, Select } from 'ant-design-vue'

export default {
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
      ],
      trimesters: [],
      students: []
    }
  },

  mounted() {
    this.getStudents()
  },

  methods: {
    getStudents() {
      apiRequest.get(`/classrooms/${this.$route.params.id}/students`)
        .then(response => {
          const { data } = response.data
          this.students = data
        })
        .finally(() => {
          this.isDataLoading = false
        })
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        if(error) {
          return
        }
        this.trimesters = values.trimesters
      });
    },

    handleCancel() {
      this.$emit('close')
    },

    invoiceUrl(id) {
      const trimesters = this.trimesters.join('&trimesters[]=')
      return `${process.env.VUE_APP_API_URL}/api/student-classrooms/${id}/invoice?trimesters[]=${trimesters}`
    }
  }
}
</script>

<style lang="scss">
.modal {
  &-classroom-invoice {
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