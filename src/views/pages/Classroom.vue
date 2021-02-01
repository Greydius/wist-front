<template>
  <div class="page page-classroom">
    <a-page-header
      :title="pagetitle"
      sub-title="Описание"
      class="page-classroom__header"
      @back="() => $router.go(-1)"
    />
    <a-form class="filters__form" :form="form" @submit="handleSubmit" v-if="!isDataLoading">
      <a-row :gutter="24">
        <a-col
          v-for="({ title, key, filter: { type } }) in columns"
          :key="key"
          :span="6"
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
            <a-select
              v-if="type === 'selectSchoolYear'"
              v-decorator="[
                key,
                {
                  rules: [{ required: true, message: 'Поле обязательно для заполнения!' }],
                  initialValue: data[key]
                },
              ]"
              :placeholder="title"
            >
              <a-select-option v-for="variant in filterDataSchoolYear" :key="variant.id">
                {{ variant.title }}
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
  </div>
</template>

<script>
import apiRequest from '../../utils/apiRequest'

import { PageHeader, Form, Row, Col, InputNumber, Select } from 'ant-design-vue'

export default {
  components: {
    'a-page-header': PageHeader,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-row': Row,
    'a-col': Col,
    'a-input-number': InputNumber,
    'a-select': Select,
    'a-select-option': Select.Option,
  },

  data() {
    return {
      isDataLoading: true,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      columns: [
        {
          title: 'Учебный год',
          dataIndex: 'school_year_id',
          key: 'school_year_id',
          filter: {
            type: 'selectSchoolYear'
          }
        },
        {
          title: 'Grade',
          dataIndex: 'grade',
          key: 'grade',
          filter: {
            type: 'inputNumber'
          }
        },
        {
          title: 'Символ',
          dataIndex: 'symbol',
          key: 'symbol',
          filter: {
            type: 'input'
          }
        },
        {
          title: 'Лимит',
          dataIndex: 'limit',
          key: 'limit',
          filter: {
            type: 'inputNumber'
          }
        },
      ],
      data: {},
      schoolYears: []
    }
  },

  
  mounted() {
    if(this.type === 'add') {
      this.isDataLoading = false
    } else {
      apiRequest.get(`/classrooms/${this.$route.params.id}`)
        .then(response => {
          const { data } = response.data
          this.data = data
        })
        .finally(() => {
          this.isDataLoading = false
        })  
    }
    
    this.getSchoolYears()
  },

  computed: {
    type() {
      return this.$route.name === 'classroom-add' ? 'add' : 'update'
    },

    pagetitle() {
      return this.type === 'add' ? 'Добавить класс' : 'Изменить класс'
    },

    filterDataSchoolYear() {
      return this.schoolYears.map(({ id, first_trimester_start_date, third_trimester_end_date }) => {
        return {
          id,
          title: `${first_trimester_start_date} - ${third_trimester_end_date}`
        }
      })
    }
  },

  methods: {
    getSchoolYears() {
      apiRequest.get(`/school-years`)
        .then(response => {
          const { data } = response.data
          this.schoolYears = data
        })
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        if(error) {
          return
        }
        const url = this.type === 'add' ? '/classrooms' : `/classrooms/${this.$route.params.id}`
        const type = this.type === 'add' ? 'post' : 'put'

        this.isDataLoading = true

        apiRequest[type](url, values)
          .then(response => {
            const { data } = response.data
            this.data = data

            this.$router.push({ name: 'classrooms' })
          })
          .finally(() => {
            this.isDataLoading = false
          })
      });
    },
  }
}
</script>

<style lang="scss">
.page {
  &-classroom {
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
      &__input-number {
        width: 100%;
      }
    }
  }
}
</style>