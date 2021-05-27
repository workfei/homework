<template>
     <div class="box1">
                <div class="header">
                    <button @click="songs">搜索</button>
                    <input type="text" name="" id="search" v-model="song">
                </div>
                <div class="con">
                    <div class="left1">
                        <ul id="musicList" class="musicList">
                            <li v-for="val in data" @click="playsong(val.id)" :key="val.id">{{val.name}}<span v-show="val.mvid!=0" @click.stop="playmv(val.mvid)">mv</span></li>
                        </ul>
                    </div>
                    <div class="middle">
                        <div class="video" v-show="flag==true">
                            <video id="video" src="" autoplay controls></video>
                        </div>
                    </div>
                    <div class="right1">
                        <h1>热门评价</h1>
                        <ul class="evaluates">
                            <li v-for="val in evaluates" :key="val.id">{{val.content}}</li>
                        </ul>
                    </div>
                </div>
                <div class="audio">
                    <audio id="audio" src=""  controls autoplay></audio>
                </div>
            </div>
</template>

<style scoped>
 .box1 {
            margin-top: 200px;
            width: 800px;
            height: 470px;
            margin: 0 auto;
            border: 1px solid skyblue;
        }
        .box1 .header {
            height: 50px;
            background-color: skyblue;
        }
        .box1 .header button {
            float: right;
            margin-top: 10px;
            height: 30px;
        }
        .box1 .header input {
            border: none;
            outline: none;
            background-color: steelblue;
            height: 30px;
            border-radius: 15px;
            float: right;
            margin-top: 10px;
            padding-left: 10px;
        }
        .box1 .con {
            display: flex;
            height: 400px;
        }
        .box1 .left1{
            flex:1;
            background-color: skyblue;
        }
        .box1 .left1 li {
            line-height: 30px;
            text-indent: 2px;
        }
        .box1 .left1 li span {
            float: right;
        }
        .left1 .musicList {
            height: 400px;
            overflow-y: auto;
            list-style: none;
            padding: 0;
        }
        ::-webkit-scrollbar{width:0;}
        .box1 .middle{
            flex: 2;
        }
        .box1 .right1{
            flex: 1;
            background-color: thistle;
        }
        .box1 .audio{
            width: 100%;
            height: 20px;
        }
        .box1 audio {
            width: 100%;
            height: 20px;
        }
        .box1 .video{
            height: 400px;
            /* display: none; */
        }
        .box1 .video video{
            height: 400px;
            width: 100%;
        }
        .evaluates {
            overflow-y: auto;
            list-style: none;
            height: 100%;
        }
        .evaluates li {
            margin-bottom: 10px;
        }
        .right1 {
            overflow: hidden;
        }
</style>

<script>
import axios from 'axios'
import $ from 'jquery'
export default {
   data: function () {
                return {
                    song: '',
                    data: '',
                    flag: false,
                    id: '',
                    evaluates: ''
                }
            },
            methods: {
                async songs () {
                    var data = await axios.get('https://autumnfish.cn/search/?keywords=' + this.song)
                    data = data.data.result.songs
                    this.data = data
                    // console.log(data);
                },
                async playsong (id) {
                    this.id = id
                    var data = await axios.get('https://autumnfish.cn/song/url?id=' + id)
                    data = data.data.data
                    var url = data[0].url
                    $('audio').attr('src', url)
                    this.flag = false
                    var evaluate = await axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + id)
                    if (evaluate.data.total !== 0) {
                        this.evaluates = evaluate.data.hotComments
                        console.log(evaluate.data.hotComments)
                    } else {
                        this.evaluates = ''
                    }
                },
                async playmv (id) {
                    console.log(id)
                    var data = await axios.get('https://autumnfish.cn/mv/url/?id=' + id)
                    data = data.data.data
                    var url = data.url
                    this.flag = true
                    $('video').attr('src', url)
                }
}
}
</script>