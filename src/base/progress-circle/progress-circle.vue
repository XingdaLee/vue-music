<template>
  <div class="progress-circle">
    <!-- viewBox和半径对应，width,height圈的大小 -->
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <!-- 内圈的样式，r半径50，cx圆心坐标50。通过半径可得直径100，和viewBox对应 -->
      <circle class="progress-background" r="50" cx="50" cy="50" 
        fill="transparent"/>
      <!-- 外圈的样式 -->
      <!-- :stroke-dasharray 描边的距离 -->
      <!-- stroke-dashoffset 偏移距离,来控制进度,值是314时是满的 -->
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" 
        :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    // 如果不传入半径radius，默认是100
    props: {
      radius: {
        type: Number,
        default: 100
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dashArray: Math.PI * 100
      }
    },
    computed: {
      dashOffset() {
        return (1 - this.percent) * this.dashArray
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
        // 缩放0.9 保证是个圆圈，-90deg是顺时针的转
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>