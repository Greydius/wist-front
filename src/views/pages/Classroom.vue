<template>
  <div class="page page-classrooms">
    <a-page-header
      title="Класс 10Y"
      sub-title="Описание"
      class="page-classrooms__header"
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
        <a-table rowKey="id" :columns="columns" :data-source="data" bordered>
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
      expand: false,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      columns: studentColumns,
      data: [
        {
          id: 1,
          name: 'Тестовый ученик',
          birthdate: '19.12.2000',
          visit_date: '15.01.2020',
          application: 'filled',
          application_date: '13.01.2020',
          assessment: 'done',
          assessment_date: '14.01.2020',
          contract: 'given',
          school_start_date: '15.01.2021',
          payment: 'paid'
        },
        {
          id: 2,
          name: 'Тестовый ученик 2',
          birthdate: '18.12.2000',
          visit_date: '14.01.2020',
          application: 'unfilled',
          application_date: '15.01.2020',
          assessment: '19.01.2019',
          assessment_date: '10.01.2020',
          contract: 'cancelled',
          school_start_date: '15.01.2020',
          payment: 'paid-partly'
        }
      ],
      applicationStatuses,
      contractStatuses,
      paymentStatuses
    }
  },

  computed: {
    count() {
      return this.expand ? 11 : 6;
    },

    filterableColumns() {
      return this.columns.filter(column => column.filter)
    }
  },

  methods: {
    assessmentFiled(data) {
      return (data in assessmentStatuses) ? assessmentStatuses[data] : data
    },

    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log('error', error);
        console.log('Received values of form: ', values);
      });
    },

    handleReset() {
      this.form.resetFields();
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
  &-classrooms {
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