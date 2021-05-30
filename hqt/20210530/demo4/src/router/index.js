import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/',
        redirect: '/userlist'
      },
      {
        path: '/userlist',
        name: 'Userlist',
        component: () => import('../views/Userlist.vue')
      },
      {
        path: '/books',
        name: 'Books',
        component: () => import('../views/Books.vue')
      }
    ]
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('../views/Reg.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
