import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUI)
// 配置axios
const Axios = axios.create({
  baseURL: 'http://localhost:3000'
})
// 拦截器 请求拦截器
Axios.interceptors.request.use(function (config) {
  // config.headers.mytoken = 'jwdlh'
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
