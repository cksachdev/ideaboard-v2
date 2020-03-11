import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './components/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    { path: '*', component: Dashboard }
  ]
})