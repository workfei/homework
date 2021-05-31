import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Reg from '../views/Reg.vue'
import UserList from '../components/Userlist'
import AddUser from '../components/Adduser'
import Details from '../components/Details'
import EditUser from '../components/Edituser'
import FileUp from '../components/FileUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
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
        redirect: '/adduser'
      },
      {
        path: '/userlist',
        name: 'Userlist',
        component: UserList
      },
      {
        path: '/adduser',
        name: 'AddUser',
        component: AddUser
      },
      {
        path: '/details/:id',
        name: 'Details',
        component: Details
      },
      {
        path: '/edituser/:id',
        name: 'EditUser',
        component: EditUser
      },
      {
        path: '/fileup',
        name: 'FileUp',
        component: FileUp
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
