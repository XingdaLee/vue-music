import * as types from './mutations-types'
// state是state.js传过来的
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}
export default mutations