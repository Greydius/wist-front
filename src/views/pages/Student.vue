<template>
  <div class="page page-student">
    <a-page-header
      :title="pagetitle"
      sub-title="Описание"
      class="page-student__header"
      @back="() => $router.go(-1)"
    />
    <a-form class="filters__form" :form="form" @submit="handleSubmit" v-if="!isDataLoading">
      <a-row :gutter="24">
        <a-col
          v-for="({ title, key, filter: { type, variants } }) in filterableColumns"
          :key="key"
          :span="8"
        >
          <a-form-item :label="title">
            <a-input
              v-if="type === 'input'"
              v-decorator="[
                key,
                {
                  rules: [{ required: true, message: 'Поле обязательно для заполнения!' }],
                  initialValue: data[key]
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
                  initialValue: data[key]
                },
              ]"
              :placeholder="title"
              class="filters__input-number"
            />
            <a-date-picker
              v-if="type === 'date'"
              format="DD.MM.YYYY"
              valueFormat="YYYY-MM-DD"
              v-decorator="[
                key,
                {
                  rules: [{ required: true, message: 'Поле обязательно для заполнения!' }],
                  initialValue: data[key]
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
                  initialValue: data[key]
                },
              ]"
              :placeholder="title"
            >
              <a-select-option v-for="(variant, key) in variants" :key="key">
                {{ variant }}
              </a-select-option>
            </a-select>
            <a-select
                v-if="type === 'selectWithDate'"
                format="DD.MM.YYYY"
                v-decorator="[
                  key,
                  {
                    rules: [
                    ],
                    initialValue: data[key]
                  },
                ]"
                :placeholder="title"
              >
                <div slot="dropdownRender" slot-scope="menu">
                  <v-nodes :vnodes="menu" />
                  <a-divider style="margin: 4px 0;" />
                  <a-date-picker format="DD.MM.YYYY" @change="(value) => selectDate(key, value)">
                    <div
                      style="padding: 4px 8px; cursor: pointer;"
                      @mousedown="e => e.preventDefault()"
                    >
                      <a-icon type="plus" /> Дата
                    </div>  
                  </a-date-picker>
                </div>
                <a-select-option v-for="(variant, key) in variants" :key="key">
                  {{ variant }}
                </a-select-option>
              </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'left' }">
          <a-button type="primary" html-type="submit">
            {{ pagetitle }}
          </a-button>
        </a-col>
      </a-row>
    </a-form>

    <div class="table">
      <a-page-header
        title="Классы"
        sub-title="Описание"
        class="page-student__header"
      >
        <template slot="extra">
          <a-button type="primary">
            Добавить класс
          </a-button>
        </template>
      </a-page-header>
      <a-table
        rowKey="id"
        :columns="classroomColumns"
        :data-source="data.classrooms"
        :loading="isLoading"
        bordered
      >
        <span slot="name" slot-scope="text, { grade, symbol }">{{ grade + symbol }}</span>
        <span slot="status" slot-scope="text, { students_count, limit }">{{ `${students_count}/${limit}` }}</span>
        <span slot="actions">
          <a-button type="primary">Редактировать</a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import apiRequest from '../../utils/apiRequest'

import { PageHeader, Form, Row, Col, InputNumber, Select, DatePicker, Divider, Table } from 'ant-design-vue'

import { studentColumns, applicationStatuses, assessmentStatuses, contractStatuses, paymentStatuses } from '../../fields/student'

import classroomColumns from '../../fields/classroom'

export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
    'a-page-header': PageHeader,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-row': Row,
    'a-col': Col,
    'a-input-number': InputNumber,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-date-picker': DatePicker,
    'a-divider': Divider,
    'a-table': Table
  },

  data() {
    return {
      isDataLoading: true,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      columns: studentColumns,
      classroomColumns: [
        ...classroomColumns,
        {
          title: 'Сумма обучения',
          dataIndex: 'pivot.amount',
          key: 'amount',
        },
        {
          title: 'Комментарий',
          dataIndex: 'pivot.comment',
          key: 'comment',
        },
        {
          title: 'Действия',
          key: 'actions',
          scopedSlots: { customRender: 'actions' },
        }
      ],
      data: {},
      applicationStatuses,
      contractStatuses,
      paymentStatuses
    }
  },

  
  mounted() {
    if(this.type === 'add') {
      this.isDataLoading = false
    } else {
      apiRequest.get(`/students/${this.$route.params.id}`, {
        params: {
          with_classrooms: true
        }
      })
        .then(response => {
          const { data } = response.data
          this.data = data
        })
        .finally(() => {
          this.isDataLoading = false
        })
    }
    
  },

  computed: {
    type() {
      return this.$route.name === 'student-add' ? 'add' : 'update'
    },

    filterableColumns() {
      const guarded = ['id', 'actual_classroom', 'school_start_date']
      return this.columns.filter(column => column.filter && !guarded.includes(column.key))
    },

    pagetitle() {
      return this.type === 'add' ? 'Добавить ученика' : 'Изменить данные'
    },
  },

  methods: {

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        if(error) {
          return
        }
        const url = this.type === 'add' ? '/students' : `/students/${this.$route.params.id}`
        const type = this.type === 'add' ? 'post' : 'put'

        this.isDataLoading = true

        apiRequest[type](url, values)
          .then(response => {
            const { data } = response.data
            this.data = data

            this.$router.push({ name: 'student', params: { id: data.id } })
          })
          .finally(() => {
            this.isDataLoading = false
          })
      });
    },

    assessmentFiled(data) {
      return (data in assessmentStatuses) ? assessmentStatuses[data] : data
    },

    selectDate(key, value) {    
      this.form.setFieldsValue({
        [key]: value.format('DD.MM.YYYY')
      })
    }
  }
}
</script>

<style lang="scss">
.page {
  &-student {
    &__header {
      border: 1px solid rgb(235, 237, 240);
      margin-bottom: 24px;
    }

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

    .table {
      margin-top: 90px;
    }
  }
}
</style>