import Vue from 'vue';
import App from './App';
import router from './router';
import moment from 'moment';
// 引入vue插件及css样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入公共css文件
import './assets/css/base.css'
// 挂载axios封装插件
// import HttpServer from './plugIn/axios';
// Vue.use(HttpServer);

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
Vue.prototype.$axios = axios;



Vue.config.productionTip = false
// vue插件使用
Vue.use(ElementUI)
// 定义日期过滤器
Vue.filter("frmDate", (v) => {
  return moment(v).format('YYYY-MM-DD');
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
