import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '../components/home.vue'
import user from '../components/user.vue'
import index from '../components/index.vue'
import state from '../components/state.vue'
import role from '../components/role.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [{
        name: 'index',
        path: '/index',
        component: index
      }, {
        name: 'user',
        path: '/user',
        component: user
      }, {
        name: 'state',
        path: '/state',
        component: state
      }, {
        name: 'role',
        path: '/role',
        component: role
      },]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
