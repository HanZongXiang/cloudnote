import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const components = {
  layout:() => import('@/views/layout'),
  index:() => import('@/views/index/index'),
  register:() => import('@/views/register/register'),
  userEdit:() => import('@/views/register/userEdit'),
  userCenter: () => import('@/views/register/userCenter'),
  writeNote:() => import('@/views/writeNote/writeNote'),
  searchNote:() => import('@/views/searchNote/searchNote'),
  detail:() => import('@/views/detail/detail'),
  login: () => import('@/views/login/index')
}

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: components.login
    },
    {
      path: '/layout',
      name: 'layout',
      component: components.layout,
      redirect:'/layout/index',
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
          path: 'userEdit/:id',
          name: 'userEdit',
          meta: {
            title: '修改个人信息'
          },
          component: components.userEdit
        },
        {
          path: 'userCenter',
          name: 'userCenter',
          meta: {
            title: '用户中心'
          },
          component: components.userCenter
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
          path: 'editNote/:id',
          name: 'editNote',
          meta: {
            title: '编辑云笔记'
          },
          component: components.writeNote
        },
        {
          path: 'searchNote',
          name: 'searchNote',
          meta: {
            title: '查找云笔记'
          },
          component: components.searchNote
        },
        {
          path:'detail/:id',
          name:'detail',
          meta: {
            title:'笔记详情页'
          },
          component:components.detail
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