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

BScroll的节点是父子级关系，父元素高度固定，子元素在父元素基础上滚动