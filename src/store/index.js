// vuex解决各个组件之间数据传递的问题
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
// strict严格模式调试，检查对state的修改是不是mutations修改的。npm run dev的时候才会执行
const debug = process.env.NODE_ENV !== 'production'
// createLogger是vuex封装的日志打印服务，每一次mutations修改state时，会在控制台打印修改信息
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})