<template>
    <div class="wangyi wy-player">
                <header>
                    <div class="title">
                        <h3>XM PLAYER</h3>
                    </div>
                    <div class="search">
                        <input type="text" value="" autocomplete="on" v-model="name">
                        <img src="../assets/img/search.png" alt="" class="sear-icon" @click="search">
                    </div>
                </header>
                <article>
                    <div class="left">
                        <ul >
                            <li v-for="val in data" :key="val.id">
                                <p @click="playsong(val.id)">{{val.album.name}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="center">
                        <div class="cd">
                            <div class="poster"><img src="../assets/img/logo.png" alt=""></div>
                        </div>
                    </div>
                    <div class="right">
                        <h4>热门留言</h4>
                        <ul class="hot">
                            <li v-for="item in data1" :key="item.id">
                                <p>{{item.content}}</p>
                            </li>
                        </ul>
                    </div>
                </article>

                <footer>
                    <audio src="" controls autoplay></audio>
                </footer>
            </div>
</template>
<style scoped>
 * {
  padding: 0;
  margin: 0;
  outline: none;
  list-style: none;
}
.wy-player {
  width: 1200px;
  margin: 0 auto;
}
.wy-player header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  width: 100%;
  height: 60px;
  background-color: steelblue;
  box-sizing: border-box;
}
.wy-player header .title h3 {
  color: #fff;
  font-size: 25px;
  font-style: italic;
}
.wy-player header .search {
  position: relative;
}
.wy-player header .search input {
  width: 250px;
  height: 30px;
  color: #999;
  text-indent: 15px;
  line-height: 30px;
  border: 0;
  border-radius: 20px;
}
.wy-player header .search img {
  position: absolute;
  top: 5px;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.wy-player article {
  display: flex;
  padding: 10px 0;
  width: 100%;
  height: 500px;
  background-color: darkgrey;
  background-image: linear-gradient(to right, blanchedalmond, darkgrey);
}
.wy-player article .left {
  width: 25%;
  height: 100%;
}
.wy-player article .left ul::-webkit-scrollbar {
  width: 0 !important;
}
.wy-player article .left ul {
  height: 100%;
  overflow-y: auto;
}
.wy-player article .left ul li {
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 90%;
  height: 40px;
  margin: 0 auto;
  box-sizing: border-box;
  cursor: pointer;
}
.wy-player article .left ul li img {
  width: 20px;
  height: 20px;
}
.wy-player article .left ul li span {
  margin-left: 5px;
  color: #000;
  font-size: 12px;
}
.wy-player article .left ul li:nth-of-type(odd) {
  background-color: rgba(255, 255, 255, 0.5);
}
.wy-player article .center {
  position: relative;
  width: 60%;
  height: 100%;
}
.wy-player article .center .cd {
  width: 300px;
  height: 300px;
  margin: 80px auto;
  border-radius: 50%;
  background-image: repeating-radial-gradient(grey, black 10%);
}
.wy-player article .center .cd .poster {
  position: absolute;
  top: 150px;
  left: calc(50% - 80px);
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background-color: #fff;
}
.wy-player article .center .cd .poster img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
}
.wy-player article .center .cd::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 1.5px;
  height: 100%;
  background-image: linear-gradient(gainsboro, grey, gainsboro);
}
.wy-player article .center .cd::after {
  position: absolute;
  top: 0;
  right: 10px;
  content: "";
  width: 1.5px;
  height: 100%;
  background-image: linear-gradient(gainsboro, grey, gainsboro);
}
.wy-player article .right {
  width: 20%;
  height: 100%;
  padding-right: 10px;
  padding-bottom: 5px;
  box-sizing: border-box;
}
.wy-player article .right ul::-webkit-scrollbar {
  width: 0 !important;
}
.wy-player article .right ul {
  height: 100%;
  overflow-y: auto;
}
.wy-player article .right ul li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px;
}
.wy-player article .right ul li img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.wy-player article .right ul li span {
  margin-left: 8px;
  font-size: 12px;
  font-weight: bold;
}
.wy-player article .right ul li p {
  margin-top: 5px;
  color: #000;
  font-size: 12px;
}
.wy-player footer {
  background-color: #f1f3f4;
}
.wy-player footer audio {
  width: 100%;
}
</style>
<script>
import axios from 'axios'
import $ from 'jquery'
export default {
    data () {
        return {
            name: '',
            data: [],
            data1: []
        }
    },
    methods: {
        async search () {
            var rulte = await axios.get('https://autumnfish.cn/search/?keywords=' + this.name)
            this.data = rulte
            this.data = this.data.data.result.songs
        },
        async playsong (id) {
            var data = await axios.get('https://autumnfish.cn/song/url?id=' + id)
            data = data.data.data
            var url = data[0].url
            $('audio').attr('src', url)
            var data1 = await axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + id)
            console.log(data1.data.hotComments)
            this.data1 = data1
            this.data1 = this.data1.data.hotComments
        }
    }
}
</script>