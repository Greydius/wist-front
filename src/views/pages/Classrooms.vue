<template>
  <div class="page page-classrooms">
    <a-page-header
      title="Классы"
      sub-title="Описание"
      class="page-classrooms__header"
    >
      <template slot="extra">
        <router-link :to="{ name: 'classroom-add' }">
          <a-button type="primary">
            Добавить класс
          </a-button>  
        </router-link>
      </template>
    </a-page-header>
    <div class="page__content">
      <div class="filters">
        
      </div>
      <div class="table">
        <a-table
          rowKey="id"
          :columns="columns"
          :data-source="data"
          :loading="isLoading"
          bordered
        >
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
import apiRequest from '../../utils/apiRequest'
import { PageHeader, Table } from 'ant-design-vue'

import classroomColumns from '../../fields/classroom'

export default {
  components: {
    'a-page-header': PageHeader,
    'a-table': Table
  },

  data() {
    return {
      isLoading: true,
      columns: [
        ...classroomColumns,
        {
          title: 'Действия',
          key: 'actions',
          scopedSlots: { customRender: 'actions' },
        }
      ],
      data: []
    }
  },

  mounted() {
    this.getClassrooms()
  },

  methods: {
    getClassrooms() {
      apiRequest.get('/classrooms')
        .then(({ data }) => {
          this.data = data.data
          this.isLoading = false
        })
        .catch((error) => console.log(error))
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