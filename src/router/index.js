import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '../components/home.vue'
import user from '../components/user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [{
        name: 'user',
        path: '/user',
        component: user
      }]
    }, {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
