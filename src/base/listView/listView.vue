<template>
  <Scroll class="listview" :data="data" ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" :key="group.title" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items" :key="item.id">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- touchstart和touchmove是BScroll的事件 -->
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <!-- 增加了扩展属性index，便于点击时获取节点 -->
        <li class="item" v-for="(item, index) in shortcutList" :data-index="index" :key="item.id">
          {{item}}
        </li>
      </ul>
    </div>
  </Scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'
// 每一个锚点的高度，右边点击的锚点A-B,B-C....每个字符之间的高度（字体高度加上padding的值）
const ANCHOR_HRIGHT = 18
export default {
  // this.touch可以让onShortcutTouchStart和onShortcutTouchMove共享数据
  // 为什么使用created来记录值，因为我们不需要操作dom，不需要监听数据变化
  created() {
    this.touch = {}
  },
  components: {
    Scroll
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    onShortcutTouchStart(element) {
      let anchorIndex = getData(element.target, 'index')
      // 第一次触碰的时的位置
      let firstTouch = element.touches[0]
      this.touch.y1 = firstTouch.pageY
      // 记录点击的位置
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(element) {
      let firstTouch = element.touches[0]
      this.touch.y2 = firstTouch.pageY
      // this.touch.y2 - this.touch.y1是滑动后，第一个节点和当前节点的偏差值，|0是取整的意思
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HRIGHT | 0
      let anchorIndex = this.touch.anchorIndex + delta
      this._scrollTo(anchorIndex)
    },
    _scrollTo(index) {
      // this.$refs.listGroup[index]能够获取需要滚动到这的dom节点
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
