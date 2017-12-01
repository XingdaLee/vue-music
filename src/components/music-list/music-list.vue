<template>
 <div class="music-list">
   <div class="back" @click="back">
     <i class="icon-back"></i>
   </div>
   <div class="title" v-html="title"></div>
   <div class="bg-image" :style="bgStyle" ref="bgImage">
     <div class="play-wrapper">
       <div class="play" v-show="songs.length > 0" ref="playBtn">
         <i class="icon-play"></i>
         <span class="text">随机播放全部</span>
       </div>
     </div>
     <div class="filter" ref="filter"></div>
   </div>
   <div class="bg-layer" ref="layer"></div>
   <!-- ref="list"拿到Scroll的引用 -->
   <!-- @scroll 触发  scroll的方法-->
   <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll = "listenScroll" :data="songs" class="list" ref="list">
     <div class="song-list-wrapper">
       <song-list :songs="songs"></song-list>
     </div>
     <div class="loading-container" v-show="!songs.length">
       <loading></loading>
     </div>
   </scroll>
 </div>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import { prefixStyle } from 'common/js/dom'
import Loading from 'base/loading/loading'
const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
// props接收从别的组件调用时传过来的数据
export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  // computed 计算属性
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {
    // 实时的拿到scrollY的值
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()
    }
  },
  watch: {
    scrollY(newY) {
      let tranlateY = Math.max(this.minTranslateY, newY)
      let zIndex = 0
      // 下拉列表时放大image
      let scale = 1
      // 上拉的时候，高斯模糊效果
      let blur = 0
      // this.$refs.layer.style['transform'] = `translate3d(0,${tranlateY}px,0)`
      // this.$refs.layer.style['webkitTransform'] = `translate3d(0,${tranlateY}px,0)`
      this.$refs.layer.style[transform] = `translate3d(0,${tranlateY}px,0)`
      // 放大的比例公式
      const precent = Math.abs(newY / this.imageHeight)
      // 上拉的时候
      if (newY > 0) {
        scale = 1 + precent
        zIndex = 10
      } else {
        blur = Math.min(20 * precent, 20)
      }
      // // 高斯模糊效果只能iphone可以看到
      // this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`
      // this.$refs.filter.style['webkitBackdrop-filter'] = `blur(${blur}px)`
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      // 上下滑动列表时，防止列表遮盖title
      if (newY < this.minTranslateY) {
        // 滚动到顶部时
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style.zIndex = zIndex
      // this.$refs.bgImage.style['transform'] = `scale(${scale})`
      // this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`
      this.$refs.bgImage.style[transform] = `scale(${scale})`
    }
  },
  // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用mounted。
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    // 如果不给scroll的top高度，scroll会覆盖整个页面。高度等于当前页面背景图的高度
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  components: {
    Scroll,
    SongList,
    Loading
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>