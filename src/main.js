// babel-polyfill补丁，对es6语法的转义
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
// 必须在webpack下注册别名才可以使用
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'

fastclick.attach(document.body)
Vue.config.productionTip = false
// require是webpack的语法
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: require('common/images/default.png'),
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})