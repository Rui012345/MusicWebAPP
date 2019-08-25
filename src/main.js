// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import './iconfont/iconfont.css'
// 引入自定义全局样式
import './style/index.less'
import VueLazyload from 'vue-lazyload'
// 全局引入轮播组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './store'
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload)

import fastclick from 'fastclick'

fastclick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
