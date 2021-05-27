import Vue from 'vue'
import VueRouter from 'vue-router'
import Adduser from '../components/Adduser'
import Books from '../components/Books'
import tian from '../components/tian'
import Userlist from '../components/Userlist'
import Wyy from '../components/Wyy'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Main',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/',
        redirect: '/Adduser'
      }, {
        path: '/Adduser',
        name: Adduser,
        component: Adduser
      }, {
        path: '/Books',
        name: Books,
        component: Books
      }, {
        path: '/tian',
        name: tian,
        component: tian
      }, {
        path: '/Userlist',
        name: Userlist,
        component: Userlist
      }, {
        path: '/Wyy',
        name: Wyy,
        component: Wyy
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
