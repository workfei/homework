import Vue from 'vue'
import VueRouter from 'vue-router'
import Adduser from '../components/Adduser.vue'
import Tzd from '../components/Tzd.vue'
import Books from '../components/Books.vue'
import Wyy from '../components/Wyy.vue'
import Userlist from '../components/Userlist.vue'

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
        path: '/',
        redirect: '/userlist'
      },
      {
        path: '/adduser',
        name: 'Adduser',
        component: Adduser
      },
      {
        path: '/tzd',
        name: 'Tzd',
        component: Tzd
      },
      {
        path: '/books',
        name: 'Books',
        component: Books
      },
      {
        path: '/wyy',
        name: 'Wyy',
        component: Wyy
      },
      {
        path: '/userlist',
        name: 'Userlist',
        component: Userlist
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
