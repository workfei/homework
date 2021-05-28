import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import { config } from 'vue/types/umd'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 配置axios
const Axios = axios.create({
  baseURL: 'http://loaclhost:3000',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
// 请求拦截器
Axios.interceptors.request.use(function (config) {
  config.headers.mytoken = 'jwdlh'
  return config
}, function (err) {
  console.log(err)
})
// 响应拦截器
Axios.interceptors.response.use(function (res) {
  return res.data
}, function (err) {
  console.log(err)
})
Vue.prototype.$http = Axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
