import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Grid from '@/components/Grid'
import Map from '@/components/Map'
import Video from '@/components/VideoThumbBeta'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/grid',
      name: 'Grid',
      component: Grid
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/',
      name: 'Video',
      component: Video
    },
  ]
})
