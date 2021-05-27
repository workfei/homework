import Vue from 'vue'
import VueRouter from 'vue-router'
import Adduser from '../components/Adduser'
import Userlist from '../components/Userlist'
import Tian from '../components/Tian'
import Wyy from '../components/Wyy'
import Books from '../components/Books'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
        {
          path: '/adduser',
          name: 'Adduser',
          component: Adduser
        },
        {
          path: '/userlist',
          name: 'Userlist',
          component: Userlist
        },
        {
          path: '/tian',
          name: 'Tian',
          component: Tian
        },
        {
          path: '/wyy',
          name: 'Wyy',
          component: Wyy
        },
        {
          path: '/books',
          name: 'Books',
          component: Books
        }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
