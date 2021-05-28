<template>
  <div class='player bfq'>
    <div class='above'>
      <p>悦听</p>
      <div class='search'>
        <input type='text' name='text' id='text' v-model='text' />
        <input type='button' value='搜索' id='btn' />
      </div>
    </div>
    <div class='box'>
      <ul class='box-l'>
        <li v-for='val in books' :key='val.id'>
          <a @click='getPlay(val.id)'>{{ val.name }}</a>
          <a
            v-if='val.mvid'
            @click='getMvid(val.mvid, val.id)'
            style='float: right'
            >MV</a
          >
        </li>
      </ul>
      <div class='box-c'>
        <img :src='imgsec' alt='' />
        <video :src='url' controls autoplay></video>
        <div class='box-c-box'>
          <p>{{ p1 }}</p>
          <p>{{ p2 }}</p>
        </div>
      </div>
      <div class='box-r'>
        <h2>热门留言</h2>
        <ul class='box-r-box'>
          <li v-for='val in books2' :key='val.id'>
            <img :src='val.user.avatarUrl' />
            {{ val.user.nickname }}<br />
            {{ val.content }}
          </li>
        </ul>
      </div>
    </div>
    <div class='below'>
      <audio :src='src' controls autoplay></audio>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
export default {
  data () {
    return {
      books: [],
      books2: [],
      url: '',
      src: '',
      text: '',
      id: '',
      imgsec: '../img/00.png',
      p1: '',
      p2: ''
    }
  },
  watch: {
    // 搜索渲染
    async text () {
      var data = await axios.get(
        'https://autumnfish.cn/search?keywords=' + this.text
      )
      // console.log(data.data.result.songs);
      this.books = data.data.result.songs
    }
  },
  methods: {
    async getPlay (id) {
      this.id = id
      // 点击选择音乐播放的src
      var data = await axios.get(
        'https://autumnfish.cn/song/url?id=' + this.id
      )
      // console.log(data.data.data[0].url)
      this.src = data.data.data[0].url
      this.url = ''
      $('.box-c video').css('display', 'none')
      $('.box-c img').css('display', 'block')

      // 歌曲详细
      var data2 = await axios.get(
        'https://autumnfish.cn/song/detail?ids=' + this.id
      )
      // console.log(data2.data.songs[0])
      this.p1 = data2.data.songs[0].al.name
      this.p2 = data2.data.songs[0].ar[0].name
      this.imgsec = data2.data.songs[0].al.picUrl

      // 热门留言评论
      var data3 = await axios.get(
        'https://autumnfish.cn/comment/hot?type=0&id=' + this.id
      )
      // console.log(data3.data.hotComments);
      this.books2 = data3
      this.books2 = this.books2.data.hotComments
      // console.log(this.books2);
    },
    async getMvid (mvid, id) {
      this.getPlay(id)
      var data = await axios.get('https://autumnfish.cn/mv/url?id=' + mvid)
      $('.box-c video').css('display', 'block')
      $('.box-c img').css('display', 'none')
      console.log(data.data.data.url)
      this.url = data.data.data.url
      this.src = ''
    }
  }
}
</script>

<style scoped>
.player {
  position: relative;
  width: 800px;
  height: 500px;
  margin: 20px auto;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  background-color: oldlace;
}
.above {
  width: 100%;
  height: 50px;
  background-color: skyblue;
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
}
.above p {
  color: #fff;
  line-height: 50px;
  font-size: 25px;
}
.search {
  width: 300px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  height: 30px;
  border-radius: 20px;
  background-color: powderblue;
  box-sizing: border-box;
  padding: 0 10px;
  overflow: hidden;
}
.search input {
  outline: none;
  height: 99%;
  border: none;
  background-color: powderblue;
}
.search input:nth-of-type(1) {
  width: 100%;
}
.search input:nth-of-type(2) {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
}
.box {
  width: 100%;
  height: 400px;
  overflow: hidden;
}
.box-l {
  float: left;
  width: 200px;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
  overflow-y: scroll;
}
.box-c {
  float: left;
  width: 400px;
  height: 100%;
  border: 1px solid #666;
  border-top: none;
  border-bottom: none;
  box-sizing: border-box;
  background-color: rgb(230, 210, 185);
}
.box-c img {
  width: 100%;
  height: 80%;
  overflow: hidden;
}
.box-c video {
  width: 100%;
  height: 80%;
  display: none;
}
.box-c-box {
  height: 68px;
}
.box-c p {
  display: block;
  height: 34px;
  width: 100%;
  background-color: rgb(230, 210, 185);
  color: #fff;
  text-align: center;
  line-height: 34px;
}
.box-l li {
  position: relative;
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-indent: 35px;
  font-size: 15px;
  overflow: hidden;
}

.box-l li::after {
  content: '';
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: url('./img/1.png') no-repeat 0 0;
  background-size: 100% 100%;
  border-radius: 10px;
}
.box-l li:nth-of-type(2n) {
  background-color: #fff;
}
.box-r {
  float: right;
  width: 200px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  padding-left: 15px;
}
.below {
  width: 100%;
  height: 50px;
}
.below audio {
  width: 100%;
  height: 100%;
}
.box-r-box {
  line-height: 25px;
  color: #333;
  padding-right: 5px;
  line-height: 20px;
}
.box-r-box li {
  margin-bottom: 5px;
}
.box-r-box img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}
.box-r h2 {
  margin: 10px 0;
}
::-webkit-scrollbar {
  width: 0px;
}
.page-l {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 200px;
  text-align: center;
}
.page-l li {
  height: 30px;
  margin: 4px;
  line-height: 30px;
  background-color: #ccc;
}
.page-box {
  width: 800px;
  height: 500px;
  position: absolute;
  left: 300px;
  top: 100px;
}
ul,
li {
  list-style: none;
}
</style>
