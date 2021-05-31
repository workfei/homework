import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Reg from '../views/Reg.vue'
import Adduser from '../components/Adduser.vue'
import Userlist from '../components/userlist.vue'
import EditUser from '../components/Edituser.vue'
import FileUpload from '../components/FileUp.vue'
import Details from '../components/Details.vue'

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
        redirect: '/adduser'
      },
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
        path: '/fileupload',
        name: 'FileUpload',
        component: FileUpload
      },
      {
        path: '/details/:id',
        name: 'Details',
        component: Details
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
