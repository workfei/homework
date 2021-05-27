<template>
    <div class="wy-player">
        <header>
            <div class="title2">
                <h3>网易云音乐</h3>
            </div>
            <div class="search">
                <input type="text " value="" v-model.trim="wyuname" @keydown.enter="getwymus">
            </div>
        </header>
        <article>
            <div class="left2">
                <ul>
                    <li v-for="item in wyList" @click="getwyms(item.id)" :key="item.id">
                        <span>{{item.album.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="right2">
                <h4>热门留言</h4>
                <ul>
                    <li v-for="item in wyments" :key="item.id">
                        <p>{{item.content}}</p>
                    </li>
                </ul>
            </div>
        </article>
        <footer>
            <audio :src="wyurl" controls autoplay></audio>
        </footer>
    </div>
</template>

<style>
    .wy-player {
        width: 1200px;
        margin: 0 auto;
    }
    .wy-player header {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        width: 100%;
        height: 60px;
        background-color: steelblue;
        box-sizing: border-box;
    }
    .wy-player header .search {
        position: absolute;
        top: 0;
        right: 0;
    }
    .wy-player header .search input {
        width: 250px;
        height: 30px;
        line-height: 30px;
        color: #999;
        text-indent: 10px;
        border: 0;
        border-radius: 20px;
    }
    .wy-player article {
        display: flex;
        padding: 10px 0;
        width: 100%;
        height: 416px;
        background-color: darkgrey;
        background-image: linear-gradient(to right, blanchedalmond, darkgrey);
    }
    .wy-player article .left2 {
        width: 25%;
        height: 100%;
    }
    .wy-player article .left2 ul {
        height: 100%;
        overflow-y: auto;
    }
    .wy-player article .right2 {
        width: 65%;
        height: 100%;
        padding-right: 10px;
        padding-bottom: 5px;
        box-sizing: border-box;
    }
    .wy-player article .right2 h4 {
        float: right;
    }
    .wy-player footer audio {
        width: 100%;
    }
</style>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            wyuname: '刘德华',
            wyList: [],
            wyments: [],
            wyurl: '',
            wyid: ''
        }
    },
    methods: {
        getwymus () {
            axios.get('https://autumnfish.cn/search?keywords=' + this.wyuname).then(res => {
                this.wyList = res.data.wyList
            })
        },
        getwyms (id) {
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + id).then(res => {
                this.wyments = res.data.wyments
            })
            axios.get('https://autumnfish.cn/song/url?id=' + id).then(res => {
                this.wyurl = res.data.data[0].res
                this.wyid = id
            })
        }
    },
    mounted () {
        this.getwymus()
        this.getwyms(this.id)
    }
}
</script>
