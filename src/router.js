import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/classrooms',
    name: 'classrooms',
    component: () => import(/* webpackChunkName: "classrooms" */ './views/pages/Classrooms'),
    meta: {
      title: 'Классы'
    },
    alias: '/'
  },
  {
    path: '/classroom/add',
    name: 'classroom-add',
    component: () => import(/* webpackChunkName: "classroom" */ './views/pages/Classroom'),
    meta: {
      title: 'Добавить Класс'
    },
  },
  {
    path: '/classroom/:id',
    name: 'classroom',
    component: () => import(/* webpackChunkName: "classroom-students" */ './views/pages/ClassroomStudents'),
    meta: {
      title: 'Класс'
    },
  },
  {
    path: '/classroom/:id/edit',
    name: 'classroom-edit',
    component: () => import(/* webpackChunkName: "classroom" */ './views/pages/Classroom'),
    meta: {
      title: 'Изменить Класс'
    },
  },
  {
    path: '/students',
    name: 'students',
    component: () => import(/* webpackChunkName: "students" */ './views/pages/Students'),
    meta: {
      title: 'Ученики'
    },
  },
  {
    path: '/student/add',
    name: 'student-add',
    component: () => import(/* webpackChunkName: "student" */ './views/pages/Student'),
    meta: {
      title: 'Добавить Ученика'
    },
  },
  {
    path: '/student/:id',
    name: 'student',
    component: () => import(/* webpackChunkName: "student" */ './views/pages/Student'),
    meta: {
      title: 'Изменить Ученика'
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Wist.uz`

  next()
})

export default router
