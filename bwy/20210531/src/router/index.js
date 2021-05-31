import Vue from 'vue'
import VueRouter from 'vue-router'
import Reg from '../views/Reg.vue'
import Userlist from '../components/Userlist.vue'
import Adduser from '../components/Adduser.vue'
import filesUpload from '../components/filesUpload.vue'
import details from '../components/details.vue'
import xg from '../components/xg.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Reg'
  }, {
    path: '/Reg',
    name: 'Reg',
    component: Reg,
    children: [
      {
        path: '/filesUpload',
        name: 'filesUpload',
        component: filesUpload
      }, {
        path: '/Adduser',
        name: 'Adduser',
        component: Adduser
      }, {
        path: '/Userlist',
        name: 'Userlist',
        component: Userlist
      }, {
        path: 'details/:id',
        name: 'details',
        component: details
      }, {
        path: 'xg/:id',
        name: 'xg',
        component: xg
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
