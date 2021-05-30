import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/main.vue'
import Reg from '../views/Reg.vue'
import Userlist from '../components/userlist'
import Books from '../components/books'
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
    path: '/reg',
    name: 'Reg',
    component: Reg
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [{
      path: '/',
      redirect: '/Userlist'
    },
    {
      path: '/Userlist',
      name: 'Userlist',
      component: Userlist
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    }]
  }
]
const router = new VueRouter({
  routes
})

export default router
