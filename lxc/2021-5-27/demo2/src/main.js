import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
// import { Button, Table } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(Button)
// Vue.use(Table)

// 配置axios
const Axios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
// 拦截器 请求拦截器
Axios.interceptors.request.use(function (config) {
  config.headers.mytoken = 'jwkyl'
  return config
}, function (err) {
  console.log(err)
})
// 响应拦截器
Axios.interceptors.request.use(function (res) {
  return res.data
}, function (err) {
  console.log(err)
})
Vue.prototype.$http = Axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
