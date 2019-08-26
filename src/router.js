import Vue from 'vue'
import Router from 'vue-router'

import Login from './view/Login/Login.vue'

import Home from './view/Home/Home.vue' // home
import My from './view/My/My.vue' // 我的
import Find from './view/Find/Find.vue' // 发现页面
import PlayListDetail from './view/PlayListDetail/PlayListDetail.vue'
import PlayControl from './view/PlayControl/PlayControl.vue'
import store from './store'

Vue.use(Router)
// 路由懒加载
// const PlayControl = () => import(/* webpackChunkName:'PlayControl' */'./view/PlayControl/PlayControl.vue')
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/find',
      children: [
        {
          path: '/home/find',
          name: 'find',
          component: Find
        },
        {
          path: '/home/my',
          name: 'my',
          component: My,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/play-list-detail',
      name: 'PlayListDetail',
      component: PlayListDetail
    },
    {
      path: '/song',
      name: 'PlayControl',
      component: PlayControl
    }
  ]
})

/* 全局守卫，记录登录状态。当用户没有登录时，限制用户不能访问某些页面 */
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    if (store.state.loginStatus) { // 通过vuex state获取当前loginStatus是否存在
      next() // 用户已登录，直接跳转
    } else { // 用户未登录，跳转至/login
      console.log(to.fullPath)
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由作为参数，登录成功后跳转到该路由
      })
    }
  } else { // 不需要登录权限直接跳转
    next()
  }
})

export default router
