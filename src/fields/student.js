export const applicationStatuses = {
  unfilled: 'Не заполнен',
  filled: 'Заполнен',
  'filled-onlne': 'Заполнен онлайн'
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
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    filter: {
      type: 'inputNumber'
    }
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    filter: {
      type: 'input'
    }
  },
  {
    title: 'Класс',
    dataIndex: 'actual_classroom',
    key: 'actual_classroom',
    scopedSlots: { customRender: 'actualClassroom' },
    filter: {
      type: 'selectClassroom',
    }
  },
  {
    title: 'ДР',
    dataIndex: 'birthdate',
    key: 'birthdate',
    filter: {
      type: 'date'
    }
  },
  {
    title: 'Визит',
    dataIndex: 'visit_date',
    key: 'visit_date',
    filter: {
      type: 'date'
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
    }
  },
  {
    title: 'Application Date',
    dataIndex: 'application_date',
    key: 'application_date',
    filter: {
      type: 'date'
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
    }
  },
  {
    title: 'Assessment Date',
    dataIndex: 'assessment_date',
    key: 'assessment_date',
    filter: {
      type: 'date'
    }
  },
  {
    title: 'Контракт',
    dataIndex: 'contract',
    scopedSlots: { customRender: 'contract' },
    key: 'contract',
    filter: {
      type: 'select',
      variants: contractStatuses
    }
  },
  {
    title: 'Начало школы',
    dataIndex: 'school_start_date',
    key: 'school_start_date',
    filter: {
      type: 'date'
    }
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
    key: 'payment',
    scopedSlots: { customRender: 'payment' },
    filter: {
      type: 'select',
      variants: paymentStatuses
    }
  },
  {
    title: 'Действия',
    key: 'actions',
    scopedSlots: { customRender: 'actions' },
  },
]