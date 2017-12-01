// 第一步 定义组件需要的所有数据类型
import { playMode } from 'common/js/config'
const state = {
  singer: {},
  playing: false, // 播放或者暂停
  fullScreen: false, // 是否是全屏
  playlist: [], // 播放列表
  sequenceList: [],  // 顺序列表，根据选择的模式确定里面的数据
  mode: playMode.sequence, // 播放模式: 顺序、随机、单曲循环
  currentIndex: -1 // 当前播放歌曲的索引
}
export default state