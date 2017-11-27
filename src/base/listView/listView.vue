<template>
  <!-- @scroll监听方法 -->
  <!-- :listenScroll等是向scroll组件里传值 -->
  <Scroll class="listview" :data="data" ref="listview" @scroll="scroll" :listenScroll=listenScroll :probeType="probeType">
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
    <!-- touchmove.stop.prevent 加prevent可以阻止事件冒泡，防止背景的滚动-->
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <!-- 增加了扩展属性index，便于点击时获取节点 -->
        <!-- 绑定一个class样式，当滑动时，在索引的区间时，索引值高亮 -->
        <li class="item" :class="{'current': currentIndex === index}" v-for="(item, index) in shortcutList" :data-index="index" :key="item.id">
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
  // 为什么不适用data而是使用created来记录值，因为我们不需要操作dom，不需要监听数据变化
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  // currentIndex是哪个，哪个索引就高亮
  data() {
    return {
      scrollY: -1,
      currentIndex: 0
    }
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
        // 截取第一个字符
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    onShortcutTouchStart(element) {
      // index点击的索引
      let anchorIndex = getData(element.target, 'index')
      // 第一次触碰的时的位置
      let firstTouch = element.touches[0]
      this.touch.y1 = firstTouch.pageY
      // 记录点击的位置
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    // 手指放在索引列表上滑动时触发
    onShortcutTouchMove(element) {
      let firstTouch = element.touches[0]
      this.touch.y2 = firstTouch.pageY
      // this.touch.y2 - this.touch.y1是滑动后，第一个节点和当前节点的偏差值，|0是取整的意思
      // delta获取滚动几个元素
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HRIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    // 从scroll.vue里获得的参数。实时获取BScroll滚动Y的距离，实现滚动时联动右边的索引列表
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      // 没有Index时表示点击的位置是无意义的，比如索引列表下的空白区域
      if (!index && index !== 0) {
        return
      }
      // 边界条件的处理
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      // this.$refs.listGroup[index]能够获取需要滚动到这的dom节点
      // 0是动画时间，0是没有动画
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    // 当watch监听到数据变化时，计算高度
    // this.listHeight记录从第一个元素到最后一个，每一个元素的高度
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    // 当监听到数据变化时
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    // 思想是，判断scrollY落在哪一个区间
    scrollY(newY) {
      const listHeight = this.listHeight
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        // 当滚动到顶部时
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 滚动到中间的时候,如果高度在newY的区间
        if (!height2 || (-newY > height1 && -newY < height2)) {
          this.currentIndex = i
          return
        }
      }
      // 滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
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
