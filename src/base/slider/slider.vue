<template>
  <div class="slider" ref="slider">
    <!-- sliderGroup是BScroll内部元素 -->
    <div class="slider-group" ref="sliderGroup">
      <!-- slot 插槽-->
      <slot></slot>
    </div>
    <div class="dots"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  // props可以从外部组建进行调用里面的属性
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 轮播间隔interval多少毫秒滚动一次
    interval: {
      type: Number,
      default: 4000
    }
  },
  // mounted是Dom被渲染时调用
  mounted() {
    // 一般DOM渲染需要17毫秒。这里设置为20比较科学
    setTimeout(() => {
      this._setSliderWidth()
      this._initSlider()
    }, 20)
  },
  methods: {
    // 横向滚动设置宽度
    _setSliderWidth() {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      // 父容器的宽度
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        // 给每一个轮播图添加slider-item样式
        addClass(child, 'slider-item')
        // 宽度都等于父容器的宽度
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      // this.loop是true时，会克隆两个dom,保证循环切换，所以增加2倍宽度
      if (this.loop) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // _initSlider初始化slider
    /*
      scroll横向滚动
      momentum惯性
      snapLoop循环
      click是否允許點擊
    */
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
