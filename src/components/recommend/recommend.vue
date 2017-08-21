<template>
  <div class="recommend">
    <Scroll ref="scroll" class="recommend-content" :data="discList">
      <!-- 有值的时候才会去渲染slider，否则会slider里会拿不到元素 -->
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <Slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl" />
              </a>
            </div>
          </Slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList" :key="item.dissid">
              <div class="icon">
                <img width="60" height="60" :src="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script type="text/ecmascript-6">
// scroll抽象出来的公共组件
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
export default {
  components: {
    Slider,
    Scroll
  },
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    // 防止slider没加载出来时，歌单就加载出来，导致歌单显示不完整
    loadImage() {
      // checkLoaded是标志位。只需要加载一张图片时重新渲染即可
      // 必须在页面注册 ref="scroll"才可以使用，这个是dom暴露的接口。
      if (!this.checkLoaded) {
        // this.$refs.scroll.refresh()
        this.checkLoaded = true
        // this.$refs.scroll.refresh()调用的是scroll组建里的refresh()
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
 .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
 
</style>
