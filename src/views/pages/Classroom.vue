<template>
  <div class="page page-classrooms">
    <a-page-header
      title="Класс 10Y"
      sub-title="Описание"
      class="page-classrooms__header"
    />
    <div class="page__content">
      <div class="filters">
        
      </div>
      <div class="table">
        <a-table rowKey="id" :columns="columns" :data-source="data" bordered>
          <span slot="application" slot-scope="text, record">{{ record.name }}</span>
          <span slot="assessment" slot-scope="text, record">{{ record.name }}</span>
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
import { PageHeader, Table } from 'ant-design-vue'
export default {
  components: {
    'a-page-header': PageHeader,
    'a-table': Table
  },

  data() {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Имя',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'ДР',
          dataIndex: 'birthdate',
          key: 'birthdate',
        },
        {
          title: 'Визит',
          dataIndex: 'visit_date',
          key: 'visit_date',
        },
        {
          title: 'Application',
          key: 'application',
          scopedSlots: { customRender: 'application' },
        },
        {
          title: 'Application Date',
          dataIndex: 'application_date',
          key: 'application_date',
        },
        {
          title: 'Assessment',
          key: 'assessment',
          scopedSlots: { customRender: 'assessment' },
        },
        {
          title: 'Assessment Date',
          dataIndex: 'assessment_date',
          key: 'assessment_date',
        },
        {
          title: 'Контракт',
          dataIndex: 'contract',
          key: 'contract',
        },
        {
          title: 'Начало школы',
          dataIndex: 'school_start_date',
          key: 'school_start_date',
        },
        {
          title: 'Payment',
          dataIndex: 'payment',
          key: 'payment',
        },
        {
          title: 'Действия',
          key: 'actions',
          scopedSlots: { customRender: 'actions' },
        },
      ],

      data: [

      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  &-classrooms {
    &__header {
      border: 1px solid rgb(235, 237, 240);
    }
    
    .table {
      margin-top: 24px;
    }
  }
}
</style>