import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  index:() => import('@/views/index')
}

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: components.index
    }
  ]
})

export default router