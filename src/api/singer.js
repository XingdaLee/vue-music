import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  // 花括号叫目标对象，后面的obj、obj1是源对象。对象合并是指：将源对象里面的属性添加到目标对象中去，若两者的属性名有冲突，后面的将会覆盖前面的
  const data = Object.assign({}, commonParams, {
    'channel': 'singer',
    'page': 'list',
    'key': 'all_all_all',
    'pagesize': 100,
    'pagenum': 1,
    'needNewCode': 0,
    'platform': 'yqq',
    'g_tk': 5381,
    'loginUin': 0,
    'hostUin': 0,
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': 0
  })
  return jsonp(url, data, options)
}
export function getSingerDetail(singerid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    'g_tk': 5381,
    'singermid': singerid,
    'loginUin': 0,
    'hostUin': 0,
    'uin': 0,
    'format': 'jsonp',
    'inCharset': 'utf-8',
    'outCharset': 'utf-8',
    'notice': 0,
    'platform': 'yqq',
    'needNewCode': 0,
    'order': 'listen',
    'from': 'h5',
    'num': 15,
    'begin': 0,
    'songstatus': 1
  })
  return jsonp(url, data, options)
}