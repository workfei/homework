import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css'

Vue.use(ElementUI)

Vue.config.productionTip = false
const Axios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 8000,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  }
})
// 请求拦截器
Axios.interceptors.request.use(function (config) {
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
// 将vue原型添加axios方法
Vue.prototype.$http = Axios
// layer插件
Vue.prototype.$layer = layer(Vue)
// 创建全局的vue事件中心
Vue.prototype.hub = new Vue()
// 设置全局的请求头
Vue.prototype.imgURL = 'http://localhost:3000'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
