<template>
  <div class="page page-classrooms">
    <a-page-header
      title="Классы"
      sub-title="Описание"
      class="page-classrooms__header"
    />
    <div class="page__content">
      <div class="filters">
        
      </div>
      <div class="table">
        <a-table rowKey="id" :columns="columns" :data-source="data" bordered>
          <span slot="name" slot-scope="text, { grade, symbol }">{{ grade + symbol }}</span>
          <span slot="status" slot-scope="text, { students_count, limit }">{{ `${students_count}/${limit}` }}</span>
          <span slot="actions" slot-scope="text, record">
            <router-link :to="{ name: 'classroom', params: { id: record.id } }">
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
          title: 'Год',
          dataIndex: 'start_year',
          key: 'year',
        },
        {
          title: 'Название',
          key: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Статус',
          key: 'status',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: 'Действия',
          key: 'actions',
          scopedSlots: { customRender: 'actions' },
        }
      ],
      data: [
        {
          id: 1,
          start_year: 2020,
          grade: 10,
          symbol: 'A',
          limit: 26,
          students_count: 24
        },
        {
          id: 2,
          start_year: 2021,
          grade: 9,
          symbol: 'B',
          limit: 30,
          students_count: 22
        },
        {
          id: 3,
          start_year: 2020,
          grade: 10,
          symbol: 'C',
          limit: 30,
          students_count: 20
        },
        {
          id: 4,
          start_year: 2020,
          grade: 10,
          symbol: 'D',
          limit: 30,
          students_count: 24
        },
        {
          id: 5,
          start_year: 2020,
          grade: 10,
          symbol: 'E',
          limit: 30,
          students_count: 24
        },
        {
          id: 6,
          start_year: 2020,
          grade: 10,
          symbol: 'F',
          limit: 30,
          students_count: 24
        },
        {
          id: 7,
          start_year: 2020,
          grade: 10,
          symbol: 'G',
          limit: 30,
          students_count: 24
        },
        {
          id: 8,
          start_year: 2020,
          grade: 10,
          symbol: 'K',
          limit: 30,
          students_count: 24
        },
        {
          id: 9,
          start_year: 2020,
          grade: 10,
          symbol: 'L',
          limit: 30,
          students_count: 24
        },
        {
          id: 10,
          start_year: 2020,
          grade: 10,
          symbol: 'M',
          limit: 30,
          students_count: 24
        },
        {
          id: 11,
          start_year: 2020,
          grade: 10,
          symbol: 'N',
          limit: 30,
          students_count: 24
        },
        {
          id: 12,
          start_year: 2020,
          grade: 10,
          symbol: 'O',
          limit: 30,
          students_count: 24
        },
        {
          id: 13,
          start_year: 2020,
          grade: 10,
          symbol: 'P',
          limit: 30,
          students_count: 24
        },
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