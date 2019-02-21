import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '../components/home.vue'
import users from '../components/users.vue'
import index from '../components/index.vue'
import rights from '../components/rights.vue'
import roles from '../components/roles.vue'
import goods from '../components/goods.vue';
import goodsadd from '../components/goodsadd.vue';
import goodsedit from '../components/goodsedit.vue';
import reports from '../components/reports.vue'
import params from '../components/params.vue';
import categories from '../components/categories.vue'
import orders from '../components/orders.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',// 默认首页路由
      redirect: '/index'
    },
    {
      name: 'home',// home框架路由
      path: '/home',
      component: Home,
      children: [{
        name: 'index', // 首页列表路由
        path: '/index',
        component: index
      }, {
        name: 'users', // 用户列表路由
        path: '/users',
        component: users
      }, {
        name: 'rights', // 权限列表路由
        path: '/rights',
        component: rights
      }, {
        name: 'roles', // 角色列表路由
        path: '/roles',
        component: roles
      }, {
        name: 'goods', // 商品列表路由
        path: '/goods',
        component: goods
      }, {
        name: 'goodsadd', // 商品添加路由
        path: '/goodsadd',
        component: goodsadd
      }, {
        name: 'goodsedit', // 商品编辑路由
        path: '/goodsedit/:id',
        component: goodsedit
      }, {
        name: 'params', // 分类参数路由
        path: '/params',
        component: params
      }, {
        name: 'categories', // 商品分类路由
        path: '/categories',
        component: categories
      }, {
        name: 'orders', // 订单列表路由
        path: '/orders',
        component: orders
      }, {
        name: 'reports', // 统计报表路由
        path: '/reports',
        component: reports
      },]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
