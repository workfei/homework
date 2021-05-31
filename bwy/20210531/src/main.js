import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css'

Vue.config.productionTip = false

// 配置axios
const Axios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
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

Vue.use(ElementUI)
Vue.prototype.$http = Axios
Vue.prototype.$layer = layer(Vue)
Vue.prototype.imgURL = 'http://localhost:3000'
Vue.prototype.hub = new Vue()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
