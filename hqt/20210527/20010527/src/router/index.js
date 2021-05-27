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
        redirect: '/adduser'
      },
      {
        path: '/tian',
        name: 'Tian',
        component: () => import('../components/Tian.vue')
      },
      {
        path: '/wyy',
        name: 'Wyy',
        component: () => import('../components/Wyy.vue')
      },
      {
        path: '/books',
        name: 'Books',
        component: () => import('../components/Books.vue')
      },
      {
        path: '/adduser',
        name: 'Adduser',
        component: () => import('../components/Adduser.vue')
      },
      {
        path: '/userlist',
        name: 'Userlist',
        component: () => import('../components/Userlist.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
