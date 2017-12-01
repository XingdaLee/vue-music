// 这里通常是异步操作或者对mutations的封装
import * as types from './mutations-types'
// {commit, state} 是vuex里的anction方法提供的
// {list, index} 里的两个数据是从组件中传入
export const selectPlay = function({commit, state}, {list, index}) {
  // 封装好后提交到mutations
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}