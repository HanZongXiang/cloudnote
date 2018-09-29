import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const components = {
  layout:() => import('@/views/layout'),
  index:() => import('@/views/index/index'),
  register:() => import('@/views/register/register'),
  writeNote:() => import('@/views/writeNote/writeNote'),
  detail:() => import('@/views/detail/detail'),
  searchNote:() => import('@/views/searchNote/searchNote')
}

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: components.layout,
      redirect:'/index',
      children: [
        {
          path:'index',
          name:'index',
          meta:{
            title:'云笔记首页'
          },
          component:components.index
        },
        {
          path:'register',
          name:'register',
          meta: {
            title:'云笔记注册'
          },
          component:components.register
        },
        {
          path:'writeNote',
          name:'writeNote',
          meta: {
            title:'编写云笔记'
          },
          component:components.writeNote
        },
        {
          path:'detail/:id',
          name:'detail',
          meta: {
            title:'笔记详情页'
          },
          component:components.detail
        },
        {
          path:'searchNote',
          name:'searchNote',
          meta: {
            title:'笔记搜索页'
          },
          component: components.searchNote
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next) => {
  Nprogress.start()

  if (to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

router.afterEach((to,from) => {
  Nprogress.done()
})

export default router