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
import HttpServer from './plugIn/http';
Vue.use(HttpServer);
// 引入面包屑导航组件
import crumbs from './components/crumbs.vue'
Vue.component(crumbs.name, crumbs);
// 引入echarts报表模块
// import echarts from 'echarts';
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/line' // 线型统计表
import 'echarts/lib/chart/bar' // 柱形统计表
Vue.component('chart', ECharts);

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
