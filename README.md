# vue-music

> music player

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
