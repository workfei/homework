import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Reg from '../views/Reg.vue'

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
    path: '/reg',
    name: 'Reg',
    component: Reg
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/',
        redirect: '/adduser'
      },
      {
        path: '/adduser',
        name: 'Adduser',
        component: () => import('../components/Adduser.vue')
      },
      {
        path: '/books',
        name: 'Books',
        component: () => import('../components/Books.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
