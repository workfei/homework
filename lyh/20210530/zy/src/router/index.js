import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Reg from '../views/Reg.vue'
import Userlist from '../components/Userlist.vue'
import Books from '../components/Books.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Login'
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
        redirect: '/userlist'
      },
      {
        path: '/userlist',
        name: 'Userlist',
        component: Userlist
      },
      {
        path: '/books',
        name: 'Books',
        component: Books
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
