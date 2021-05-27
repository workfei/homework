import Vue from 'vue'
import VueRouter from 'vue-router'
import AddUser from '../components/Adduser'
import UserList from '../components/Userlist'
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
        component: AddUser
      },
      {
        path: '/userlist',
        name: 'Userlist',
        component: UserList
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
