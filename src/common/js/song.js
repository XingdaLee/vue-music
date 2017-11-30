/* eslint-disable */
// 设计成类，代码集中维护，拓展性比对象好，面向对象方式
export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
      this.id = id,
      this.mid = mid,
      this.singer = singer,
      this.name = name,
      this.album = album,
      this.duration = duration,
      this.image = image,
      this.url = url
  }
}
// 抽象一个工厂方法,方便复用
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,// 歌曲名称
    album: musicData.albumname,// 专辑名称
    duration: musicData.interval,// 歌曲时间
    image: "https://y.gtimg.cn/music/photo_new/T002R300x300M000" + musicData.albummid + ".jpg?max_age=2592000",
    url: "http://ws.stream.qqmusic.qq.com/" + musicData.songid + ".m4a?fromtag=38" //歌曲源
  })
}
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  });
  return ret.join('/')
}
/* eslint-enable */