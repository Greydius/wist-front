<template>
  <div class="page page-classroom-students">
    <a-page-header
      :title="title"
      sub-title="Описание"
      class="page-classroom-students__header"
    />
    <div class="page__content">
      <div class="filters">
        <a-form class="filters__form" :form="form" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col
              v-for="({ title, key, filter: { type, variants } }, i) in filterableColumns"
              :key="key"
              :span="8"
              :style="{ display: i < count ? 'block' : 'none' }"
            >
              <a-form-item :label="title">
                <a-input
                  v-if="type === 'input'"
                  v-decorator="[
                    key,
                    {
                      rules: [
                      ],
                    },
                  ]"
                  :placeholder="title"
                />
                <a-input-number
                  v-if="type === 'inputNumber'"
                  v-decorator="[
                    key,
                    {
                      rules: [
                      ],
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
                      rules: [
                      ],
                    },
                  ]"
                  mode="tags"
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
                    },
                  ]"
                  mode="tags" 
                  :placeholder="title"
                >
                  <div slot="dropdownRender" slot-scope="menu">
                    <v-nodes :vnodes="menu" />
                    <a-divider style="margin: 4px 0;" />
                    <a-date-picker @change="(value) => selectDate(key, value)">
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
                <a-range-picker
                  v-if="type === 'date'"
                  format="DD.MM.YYYY"
                  v-decorator="[
                    key,
                    {
                      rules: [
                      ],
                    },
                  ]"
                  class="filters__datepicker"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" :style="{ textAlign: 'right' }">
              <a-button type="primary" html-type="submit">
                Поиск
              </a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                Очистить
              </a-button>
              <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
                Развернуть <a-icon :type="expand ? 'up' : 'down'" />
              </a>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table">
        <a-table rowKey="id" :columns="classroomStudentsColumns" :data-source="data" bordered>
          <span slot="application" slot-scope="text">{{ applicationStatuses[text] }}</span>
          <span slot="assessment" slot-scope="text">{{ assessmentFiled(text) }}</span>
          <span slot="contract" slot-scope="text">{{ contractStatuses[text] }}</span>
          <span slot="payment" slot-scope="text">{{ paymentStatuses[text] }}</span>
          <span slot="actions" slot-scope="text, record">
            <router-link :to="{ name: 'student', params: { id: record.id } }">
              <a-button type="primary">Перейти</a-button>
            </router-link>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import apiRequest from '../../utils/apiRequest'

import { PageHeader, Table, Form, Row, Col, InputNumber, Select, DatePicker, Divider } from 'ant-design-vue'

import { studentColumns, applicationStatuses, assessmentStatuses, contractStatuses, paymentStatuses } from '../../fields/student'

export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
    'a-page-header': PageHeader,
    'a-table': Table,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-row': Row,
    'a-col': Col,
    'a-input-number': InputNumber,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-date-picker': DatePicker,
    'a-range-picker': DatePicker.RangePicker,
    'a-divider': Divider,
  },

  data() {
    return {
      isLoading: true,
      expand: false,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      columns: studentColumns,
      classroom: {
        id: 1,
        year: '2021-01-30',
        grade: 11,
        symbol: 'Y',
        limit: 30
      },
      data: [],
      applicationStatuses,
      contractStatuses,
      paymentStatuses
    }
  },

  mounted() {
    this.getClassroom()
    this.getStudents()
  },

  computed: {
    count() {
      return this.expand ? 11 : 6;
    },

    filterableColumns() {
      return this.classroomStudentsColumns.filter(column => column.filter)
    },
    
    title() {
      const { grade, symbol } = this.classroom

      return `Класс ${grade + symbol}`
    },

    classroomStudentsColumns() {
      return this.columns.filter(({ key }) => key !== 'actual_classroom')
    }
  },

  methods: {
    getClassroom() {
      apiRequest.get(`/classrooms/${this.$route.params.id}`)
        .then(({ data }) => {
          this.classroom = data.data
          this.isLoading = false
        })
        .catch((error) => console.log(error))
    },

    getStudents(filters = null) {
      apiRequest.get(`/students`, {
        params: {
          classroom_id: this.$route.params.id,
          ...filters
        }
      })
        .then(({ data }) => {
          this.data = data.data
          this.isLoading = false
        })
        .catch((error) => console.log(error))
    },

    assessmentFiled(data) {
      return (data in assessmentStatuses) ? assessmentStatuses[data] : data
    },

    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        if(error) {
          return
        }

        this.getStudents(values)
      });
    },

    handleReset() {
      this.form.resetFields();
      this.getStudents();
    },

    toggle() {
      this.expand = !this.expand;
    },

    selectDate(key, value) {
      let values = this.form.getFieldValue(key)
      if(values) {
        values.push(value.format('DD.MM.YYYY'))
      } else {
        values = [value.format('DD.MM.YYYY')]
      }
      
      this.form.setFieldsValue({
        [key]: values
      })
    }
  }
}
</script>

<style lang="scss">
.page {
  &-classroom-students {
    &__header {
      border: 1px solid rgb(235, 237, 240);
    }

    .filters {
      margin-top: 24px;
      padding: 24px;
      border: 1px solid rgb(235, 237, 240);
      &__form {
        .ant-form {
          max-width: none;

          &-item {
            
          }
        }
      }
      &__datepicker,
      &__input-number {
        width: 100%;
      }
    }
    
    .table {
      margin-top: 24px;
    }
  }
}
</style>