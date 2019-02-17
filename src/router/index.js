import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '../components/home.vue'
import user from '../components/user.vue'
import index from '../components/index.vue'
import state from '../components/state.vue'
import role from '../components/role.vue'
import categories from '../components/categories.vue';
import statistics from '../components/statistics.vue'

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
        name: 'user', // 用户列表路由
        path: '/user',
        component: user
      }, {
        name: 'state', // 权限列表路由
        path: '/state',
        component: state
      }, {
        name: 'role', // 角色列表路由
        path: '/role',
        component: role
      }, {
        name: 'categories', // 商品列表路由
        path: '/categories',
        component: categories
      },
      {
        name: 'statistics', // 统计报表路由
        path: '/statistics',
        component: statistics
      },]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
