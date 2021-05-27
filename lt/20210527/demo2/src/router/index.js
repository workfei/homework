import Vue from 'vue'
import VueRouter from 'vue-router'
import Adduser from '../components/Adduser'
import Books from '../components/Books'
import tian from '../components/tian'
import Yun from '../components/Yun'
import Userlist from '../components/Userlist'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [{
        path: '/',
        redirect: '/Userlist'
      },
      {
        path: '/Adduser/:id',
        name: 'adduser',
        component: Adduser
      },
      {
        path: '/Books',
        name: 'Books',
        component: Books
      },
      {
        path: '/tian',
        name: 'tian',
        component: tian
      },
      {
        path: '/Yun',
        name: 'Yun',
        component: Yun
      },
      {
        path: '/Userlist',
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
