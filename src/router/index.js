import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '../components/home.vue'
import user from '../components/user.vue'
import index from '../components/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [{
        name: 'user',
        path: '/user',
        component: user
      }, {
        name: 'index',
        path: '/index',
        component: index
      }]
    }, {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
