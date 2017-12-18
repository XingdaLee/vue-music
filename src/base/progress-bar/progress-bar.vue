<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <!-- progress走过的进度条 -->
      <div class="progress" ref="progress"></div>
      <!-- progress-btn-wrapper进度条上的按钮 -->
      <!-- prevent阻止浏览器的默认行为 -->
      <div class="progress-btn-wrapper" ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { prefixStyle } from 'common/js/dom'
const transform = prefixStyle('transform')
// 进度条的宽度等于总宽度减去上面小球的宽度
const progressBtnWidth = 16
export default {
  // 在created钩子函数中创建touch是方便progressTouchStart，progressTouchMove，progressTouchEnd之间的数据通信
  created() {
    this.touch = {}
  },
  methods: {
    // 刚开始第一次点击的时候
    progressTouchStart(e) {
      // 是否已经点击进度条
      this.touch.initiated = true
      // 点击的位置，横向的坐标
      this.touch.startX = e.touches[0].pageX
      // 点击按钮的时候，当前进度条的宽度
      this.touch.left = this.$refs.progress.clientWidth
    },
    // 拖动进度条事件
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      // 拖动时的偏移量(单位px)
      const deltax = e.touches[0].pageX - this.touch.startX
      // offsetWidth = this.touch.left + deltax 已经偏移的数据+后来继续拖动偏移的数据
      // Math.max表示数据必须要大于0,offsetWidth要小于progressBar的宽度
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltax))
      this._offset(offsetWidth)
    },
    // 拖动结束后
    progressTouchEnd() {
      this.touch.initiated = false
      this._triggerPercent()
    },
    // 设置进度球和进度条的样式
    _offset(offsetWidth) {
      // 进度条的偏移
      this.$refs.progress.style.width = `${offsetWidth}px`
      // 进度球的偏移
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
    },
    _triggerPercent() {
      // 进度条的宽度
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      // this.$refs.progress.clientWidth已播放的进度条的宽度
      // percent是已播放的比例
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    },
    progressClick(e) {
      // 先设置样式
      this._offset(e.offsetX)
      // 在设置歌曲的进度
      this._triggerPercent()
    }
  },
  props: {
    // 百分比，根据百分比确定进度条的位置
    percent: {
      type: Number,
      default: 0
    }
  },
  // 监听从player计算属性穿过来的比例，来计算进度条的偏移量
  watch: {
    percent(newPercent) {
      // 当拖动比例大于0并且没有在拖动进度条的时候
      if (newPercent >= 0 && !this.touch.initiated) {
        // 进度条的宽度
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        // 小球偏移的宽度
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>