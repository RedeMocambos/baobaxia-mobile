import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Grid from '@/components/Grid'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/grid',
      name: 'Grid',
      component: Grid
    }
  ]
})
