import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Reg from '../views/Reg.vue'
import Adduser from '../components/Adduser'
import Userlist from '../components/Userlist'
import EditUser from '../components/Edituser'
import FileUp from '../components/FileUp'
import Defails from '../components/Defails'

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
        path: '/edituser/:id',
        name: 'EditUser',
        component: EditUser
      },
      {
        path: '/fileup',
        name: 'FileUp',
        component: FileUp
      },
      {
        path: '/defails/:id',
        name: 'Defails',
        component: Defails
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
