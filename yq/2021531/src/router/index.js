import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
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
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'userlist',
        component: () => import('../components/userlist.vue')
      },
      {
        path: '/userlist',
        name: 'userlist',
        component: () => import('../components/userlist.vue')
      },
      {
        path: '/detailuser/:id',
        name: 'detailuser',
        component: () => import('../components/detailuser.vue')
      },
      {
        path: '/edit/:id',
        name: 'edit',
        component: () => import('../components/edit.vue')
      },
      {
        path: '/adduser',
        name: 'adduser',
        component: () => import('../components/adduser.vue')
      }
    ]
  },
  {
    path: '/reg',
    name: 'Reg',
    component: Reg
  }
]

const router = new VueRouter({
  routes
})

export default router
