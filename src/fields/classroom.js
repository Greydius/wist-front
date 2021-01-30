export default [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Начало учебного года',
    dataIndex: 'year',
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
  }
]