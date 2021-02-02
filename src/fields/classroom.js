export default [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'School start date',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: 'Name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Status',
    key: 'status',
    scopedSlots: { customRender: 'status' },
  }
]