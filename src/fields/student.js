import moment from 'moment'

export const applicationStatuses = {
  unfilled: 'Не заполнен',
  filled: 'Заполнен',
  'filled-online': 'Заполнен онлайн'
}

export const assessmentStatuses = {
  unset: 'Не выполнено',
  done: 'Заполнен',
  reports: 'Отчёт',
  // date => Date
}

export const contractStatuses = {
  ungiven: 'Не выдан',
  given: 'Выдан',
  done: 'Заполнен',
  cancelled: 'Отменен'
}

export const paymentStatuses = {
  unpaid: 'Не оплачен',
  paid: 'Оплачено',
  'paid-partly': 'Частично оплачено',
  cancelled: 'Отменен',
}

export const studentColumns = [
  {
    title: '№',
    key: 'index',
    scopedSlots: { customRender: 'index' },
    // filter: {
    //   type: 'inputNumber'
    // },
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    filter: {
      type: 'input'
    },
    sorter: (a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    },
  },
  {
    title: 'Classroom',
    dataIndex: 'actual_classroom',
    key: 'actual_classroom',
    scopedSlots: { customRender: 'actualClassroom' },
    filter: {
      type: 'selectClassroom',
    },
    sorter: (a, b) => {
      const a_actual_classroom = a.actual_classroom && a.actual_classroom.grade + a.actual_classroom.symbol || ''
      const b_actual_classroom = b.actual_classroom && b.actual_classroom.grade + b.actual_classroom.symbol || ''

      if(a_actual_classroom.length < b_actual_classroom.length) { return -1; }
      if(a_actual_classroom.length > b_actual_classroom.length) { return 1; }
      return 0;
    }
  },
  {
    title: 'BD',
    dataIndex: 'birthdate',
    key: 'birthdate',
    scopedSlots: { customRender: 'birthdate' },
    filter: {
      type: 'date'
    },
    sorter: (a, b) => {
      if(moment(a.birthdate) < moment(b.birthdate)) { return -1; }
      if(moment(a.birthdate) > moment(b.birthdate)) { return 1; }
      return 0;
    },
  },
  {
    title: 'Visit',
    dataIndex: 'visit_date',
    key: 'visit_date',
    scopedSlots: { customRender: 'visit_date' },
    filter: {
      type: 'date'
    },
    sorter: (a, b) => {
      if(moment(a.visit_date) < moment(b.visit_date)) { return -1; }
      if(moment(a.visit_date) > moment(b.visit_date)) { return 1; }
      return 0;
    }
  },
  {
    title: 'Application',
    dataIndex: 'application',
    key: 'application',
    scopedSlots: { customRender: 'application' },
    filter: {
      type: 'select',
      variants: applicationStatuses
    },
    sorter: (a, b) => {
      if(a.application.length < b.application.length) { return -1; }
      if(a.application.length > b.application.length) { return 1; }
      return 0;
    }
  },
  {
    title: 'Application Date',
    dataIndex: 'application_date',
    key: 'application_date',
    scopedSlots: { customRender: 'application_date' },
    filter: {
      type: 'date'
    },
    sorter: (a, b) => {
      if(moment(a.application_date) < moment(b.application_date)) { return -1; }
      if(moment(a.application_date) > moment(b.application_date)) { return 1; }
      return 0;
    }
  },
  {
    title: 'Assessment',
    dataIndex: 'assessment',
    key: 'assessment',
    scopedSlots: { customRender: 'assessment' },
    filter: {
      type: 'selectWithDate',
      variants: assessmentStatuses
    },
    sorter: (a, b) => {
      if(a.assessment.length < b.assessment.length) { return -1; }
      if(a.assessment.length > b.assessment.length) { return 1; }
      return 0;
    }
  },
  {
    title: 'Assessment Date',
    dataIndex: 'assessment_date',
    key: 'assessment_date',
    scopedSlots: { customRender: 'assessment_date' },
    filter: {
      type: 'date'
    },
    sorter: (a, b) => {
      if(moment(a.assessment_date) < moment(b.assessment_date)) { return -1; }
      if(moment(a.assessment_date) > moment(b.assessment_date)) { return 1; }
      return 0;
    }
  },
  {
    title: 'Contract',
    dataIndex: 'contract',
    scopedSlots: { customRender: 'contract' },
    key: 'contract',
    filter: {
      type: 'select',
      variants: contractStatuses
    },
    sorter: (a, b) => {
      if(a.contract.length < b.contract.length) { return -1; }
      if(a.contract.length > b.contract.length) { return 1; }
      return 0;
    }
  },
  {
    title: 'School start date',
    dataIndex: 'school_start_date',
    key: 'school_start_date',
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
    key: 'payment',
    scopedSlots: { customRender: 'payment' },
    filter: {
      type: 'select',
      variants: paymentStatuses
    },
    sorter: (a, b) => {
      if(a.payment.length < b.payment.length) { return -1; }
      if(a.payment.length > b.payment.length) { return 1; }
      return 0;
    }
  },
  {
    title: 'Actions',
    key: 'actions',
    scopedSlots: { customRender: 'actions' },
  },
]