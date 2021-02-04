import moment from 'moment'

export default [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'School start date',
    dataIndex: 'year',
    key: 'year',
    sorter: (a, b) => {
      if(moment(a.school_year.first_trimester_start_date) < moment(b.school_year.first_trimester_start_date)) { return -1; }
      if(moment(a.school_year.first_trimester_start_date) > moment(b.school_year.first_trimester_start_date)) { return 1; }
      return 0;
    },
  },
  {
    title: 'Name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    sorter: (a, b) => a.grade - b.grade,
  },
  {
    title: 'Status',
    key: 'status',
    scopedSlots: { customRender: 'status' },
    sorter: (a, b) => a.students_count - b.students_count,
  }
]