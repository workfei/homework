import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Reg from '../views/Reg.vue'

import userlist from '../components/userlist'
import books from '../components/books'
import addbooks from '../components/addbooks'
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
  }
]

const router = new VueRouter({
  routes
})

export default router
