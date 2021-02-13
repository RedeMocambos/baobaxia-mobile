import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Grid from '@/components/Grid'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Grid',
      component: Grid
    }
  ]
})
