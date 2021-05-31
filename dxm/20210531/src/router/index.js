import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Reg from '../views/Reg.vue'
import Protect from '../views/Protect.vue'

import userlist from '../components/userlist'
import detailuser from '../components/detailuser'
import edituser from '../components/edituser'
import books from '../components/books'
import addbooks from '../components/addbooks'
import upload from '../components/upload'
import exit from '../components/exit'

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
        component: userlist
      },
      {
        path: '/userlist',
        name: 'userlist',
        component: userlist
      },
      {
        path: '/detailuser/:id',
        name: 'detailuser',
        component: detailuser
      },
      {
        path: '/edituser/:id',
        name: 'edituser',
        component: edituser
      },
      {
        path: '/books',
        name: 'books',
        component: books
      },
      {
        path: '/addbooks',
        name: 'addbooks',
        component: addbooks
      },
      {
        path: '/upload',
        name: 'upload',
        component: upload
      },
      {
        path: '/exit',
        name: 'exit',
        component: exit
      }
    ]
  },
  {
    path: '/reg',
    name: 'Reg',
    component: Reg
  },
  {
    path: '/protect/:testid',
    name: 'Protect',
    component: Protect
  }
]

const router = new VueRouter({
  routes
})

export default router
