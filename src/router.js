import Vue from 'vue'
import Router from 'vue-router'

import Login from './view/Login/Login.vue'
import My from './view/My/My.vue' // 优化了项目结构
import Home from './view/Home/Home.vue' // 优化了项目结构
import PlayListDetail from './view/PlayListDetail/PlayListDetail.vue'
import PlayControl from './view/PlayControl/PlayControl.vue'
import store from './store'

Vue.use(Router)
// 路由懒加载
// const PlayControl = () => import(/* webpackChunkName:'PlayControl' */'./view/PlayControl/PlayControl.vue')
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      meta: {
        needLogin: true
      }
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

/* // 如果后台登录接口不稳定，可以用这种临时的解决方案：通过localStorage里是否有uid来判断是否登录，而不用发请求的方式
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (localStorage.getItem('uid')) next();
    else router.push('/login');
  } else next();
}); */

/* 全局守卫，记录登录状态。当用户没有登录时，限制用户不能访问某些页面 */
router.beforeEach((to, from, next) => {
  console.log(this.$Store)
  /*  meta对象中定义needLogin */
  /*  需要登录且登录状态为false */
  if (to.meta.needLogin && !store.state.loginStatus) {
    router.push('/login')
  } else {
    next()
  }
})

export default router
