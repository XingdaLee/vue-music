export function addClass(el, className) {
  // 有这个class时什么都不做
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
// 检查是否有class
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// 获取页面上的数据
export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

// 在js中，自动给this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`这样的属性添加
// webkit 变成 this.$refs.filter.style['webkitBackdrop-filter'] = `blur(${blur}px)`
let elementStyle = document.createElement('div').style
// 立即执行函数
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform', // 火狐
    O: 'OTransform', // oper
    ms: 'msTransform', // IE
    standard: 'transform' // 什么都不带
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}