import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 配置axios
Vue.prototype.$axios = axios
const Axios = axios.create({
  // 请求接口
  baseURL: 'http://wthrcdn.etouch.cn',
  // 超时设置
  timeout: 8000,
  // 请求头设置
  headers: {
    // 'accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
// 在发送请求之前做些什么("请求拦截器")
Axios.interceptors.request.use(function (res) {
  return res.data
}, function (err) {
  console.log(err)
})
Vue.prototype.$http = Axios

new Vue({
  router,
  render: h => h(App),
  axios,
  components: { App },
  template: '<App/>'
}).$mount('#app')
