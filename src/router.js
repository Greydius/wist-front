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
    path: '/classroom/:id',
    name: 'classroom',
    component: () => import(/* webpackChunkName: "classroom" */ './views/pages/Classroom'),
    meta: {
      title: 'Класс'
    },
  },
  {
    path: '/students',
    name: 'students',
    component: () => import(/* webpackChunkName: "students" */ './views/pages/Classrooms'),
    meta: {
      title: 'Студенты'
    },
  },
  {
    path: '/student/:id',
    name: 'student',
    component: () => import(/* webpackChunkName: "student" */ './views/pages/Classrooms'),
    meta: {
      title: 'Студент'
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
