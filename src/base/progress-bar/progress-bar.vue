<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <!-- progress走过的进度条 -->
      <div class="progress" ref="progress"></div>
      <!-- progress-btn-wrapper进度条上的按钮 -->
      <div class="progress-btn-wrapper" ref="progressBtn">
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
      if (newPercent >= 0) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        // 小球偏移的宽度
        const offsetWidth = newPercent * barWidth
        // 进度条的偏移
        this.$refs.progress.style.width = `${offsetWidth}px`
        // 进度球的偏移
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
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