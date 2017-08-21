<template>
  <div class="slider" ref="slider">
    <!-- sliderGroup是BScroll内部元素 -->
    <div class="slider-group" ref="sliderGroup">
      <!-- slot 插槽-->
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  // currentPageIndex默认小圆点是第一个
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
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
      // 小圆点_initDots必须在_initSlider之前执行，防止拿到的子节点的数量不对
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    // 监听窗口大小的变化
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      // BScroll的刷新方法，重新计算
      setTimeout(() => {
        this.slider.refresh()
      }, 20)
    })
  },
  methods: {
    // 横向滚动设置宽度
    _setSliderWidth(isResize) {
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
      // 加上isResize是防止每次宽度都增加
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
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
        snapSpeed: 400
      })
      // 通过BScroll的scrollEnd事件返回当前是第几个元素
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        // 每次点击时候都要清除轮播的效果，重置轮播开始的时间
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    // 自动播放
    _play() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      // pageIndex横向方向，0代表纵向Y的，400是时间间隔
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    },
    /*
      Vue 实例销毁后调用destroyed。调用后，Vue 实例指示的所有东西都会解绑定，
      所有的事件监听器会被移除，所有的子实例也会被销毁。
    */
    destroyed() {
      clearTimeout(this.timer)
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
