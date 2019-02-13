// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入vue插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共css文件
import './assets/css/base.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
// vue插件使用
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})