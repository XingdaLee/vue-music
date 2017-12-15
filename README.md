# vue-music

> music player

slider:轮播图

recommend:推荐歌单页，包括better-scroll的使用，歌单列表的渲染，lazyload图片懒加载的使用

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## package.json

 fastclick解决移动端点击300毫秒延迟的问题

 ## 笔记

Promise 封装是为了让所有的请求，不管是 axios 请求还是 jsonp 都是统一的 Promise

语法链式调用，而原始的 jsonp 是只支持 callback 的方式调用，需要 Promise 封装。

keep-alive包裹router-view可以缓存dom对象和数据，切换的时候才不会闪烁。主要用于保留组件状态或避免重新渲染。

BScroll的节点是父子级关系，父元素高度必须是固定的，子元素能够撑开父元素，在父元素基础上滚动

`
// 花括号叫目标对象，后面的obj、obj1是源对象。对象合并是指：将源对象里面的属性添加到目标对象中去，若两者的属性名有冲突，后面的将会覆盖前面的
  const data = Object.assign({}, commonParams, {
    'channel': 'singer',
    'page': 'list',
    'key': 'all_all_all',
    'pagesize': 100,
    'pagenum': 1,
    'g_tk': 5381,
    'jsonpCallback': 'GetSingerListCallback',
    'loginUin': 0,
    'hostUin': 0,
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': 0,
    'platform': 'yqq',
    'needNewCode': 0
  })
`

使用 /* eslint-disable */ 和 /* eslint-enable */ 包裹的代码块不会被eslint检查

定义数据流程，映射到组件，和修改数据的方式(7-2)
`
 state -> config -> getters -> mutations-types -> mutations(通过此方法修改到state的值)
`
一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数。一个vue实例被生成后还要绑定到某个html元素上，之后还要进

行编译，然后再插入到document中。每一个阶段都会有一个钩子函数，方便开发者在不同阶段处理不同逻辑。