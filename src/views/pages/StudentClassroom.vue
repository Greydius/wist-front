<template>
  <div class="page page-student-classroom">
    <a-page-header
      :title="pagetitle"
      sub-title="Описание"
      class="page-student-classroom__header"
      @back="() => $router.push({ name: 'student', params: { id: $route.params.id } })"
    >
      <template slot="extra">
        <a-button @click="() => isStudentClassroomInvoiceModalOpen = true" type="default">
          Получить инвойс
        </a-button>  
      </template>
    </a-page-header>
    <div class="table">
      <a-page-header
        title="Оплаты"
        sub-title="Описание"
        class="page-student-classroom__header"
      >
        <template slot="extra">
          <a-button @click="addPayment" type="primary">
            Добавить оплату
          </a-button>
        </template>
      </a-page-header>
      <a-table
        rowKey="id"
        :columns="paymentColumns"
        :data-source="studentClassroom.payments || []"
        bordered
      >
        <span slot="actions" slot-scope="text, record">
          <a-button @click="() => editPayment(record)" type="primary" style="margin-left: 15px">Редактировать</a-button>
          <a-button @click="() => deletePayment(record.id)" type="danger" style="margin-left: 15px">Удалить</a-button>
        </span>
      </a-table>
    </div>
    <StudentClassroomPaymentModal
      v-if="isStudentClassroomPaymentModalOpen"
      :type="studentClassroomPaymentModalData.type"
      :content="studentClassroomPaymentModalData.content"
      @close="closeStudentClassroomPaymentModal"
    />
    <StudentClassroomInvoiceModal
      v-if="isStudentClassroomInvoiceModalOpen"
      @close="closeStudentClassroomInvoiceModal"
    />
  </div>
</template>

<script>
import apiRequest from '../../utils/apiRequest'

import { PageHeader, Table } from 'ant-design-vue'
import StudentClassroomPaymentModal from '../../components/StudentClassroomPaymentModal'
import StudentClassroomInvoiceModal from '../../components/StudentClassroomInvoiceModal'

export default {
  components: {
    'a-page-header': PageHeader,
    'a-table': Table,
    StudentClassroomPaymentModal,
    StudentClassroomInvoiceModal
  },

  data() {
    return {
      isStudentClassroomPaymentModalOpen: false,
       isStudentClassroomInvoiceModalOpen: false,
      studentClassroomPaymentModalData: {
        type: 'add',
        content: {

        },
        student_classroom_id: this.$route.params.student_classroom_id
      },
      isDataLoading: true,
      form: this.$form.createForm(this, { name: 'student_classroom' }),
      paymentColumns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: 'Сумма',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Триместер',
          dataIndex: 'trimester',
          key: 'trimester',
        },
        {
          title: 'Комментарий',
          dataIndex: 'comment',
          key: 'comment',
        },
        {
          title: 'Действия',
          key: 'actions',
          scopedSlots: { customRender: 'actions' },
        }
      ],
      studentClassroom: {}
    }
  },

  
  mounted() {
    this.getStudentClassroom()
  },

  computed: {
    pagetitle() {
      const { grade, symbol, year } = this.studentClassroom && this.studentClassroom.classroom || { grade: '', symbol: '', year: 'Загрузка...' }
      return `${grade + symbol} (${year})`
    },
    invoiceUrl() {
      return `${process.env.VUE_APP_API_URL}/student-classrooms/${this.$route.params.student_classroom_id}/invoice`
    }
  },

  methods: {
    getStudentClassroom() {
      apiRequest.get(`/student-classrooms/${this.$route.params.student_classroom_id}`)
        .then(response => {
          const { data } = response.data
          this.studentClassroom = data
        })
        .finally(() => {
          this.isDataLoading = false
        })
    },

    editPayment(payment) {
      this.studentClassroomPaymentModalData.type = 'edit'
      this.studentClassroomPaymentModalData.content = payment
      this.isStudentClassroomPaymentModalOpen = true
    },

    addPayment() {
      this.studentClassroomPaymentModalData.type = 'add'
      this.studentClassroomPaymentModalData.content = {}
      this.isStudentClassroomPaymentModalOpen = true
    },

    closeStudentClassroomPaymentModal() {
      this.isStudentClassroomPaymentModalOpen = false
      this.getStudentClassroom()
    },

    closeStudentClassroomInvoiceModal() {
      this.isStudentClassroomInvoiceModalOpen = false
    },

    deleteClassroom(payment_id) {
      apiRequest.delete(`/student-classroom/${this.$route.params.student_classroom_id}/payments/${payment_id}`)
        .then(() => {
          this.getStudentClassroom()
        })
    }
  }
}
</script>

<style lang="scss">
.page {
  &-student-classroom {
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
      margin-top: 60px;
    }
  }
}
</style>