export default [
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
]