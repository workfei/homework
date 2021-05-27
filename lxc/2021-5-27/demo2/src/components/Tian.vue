<template>
    <div class="box2">
        <div class="title">天知道</div>
        <div class="search">
            <input type="text" name="" id="" v-model.trim="city" class="sch" @keydown.enter="getSearch">
            <input type="button" value="搜索" class="btn" @click="getSearch">
        </div>
        <div class="hotcity">
            <span @click="getcity=['北京']">北京</span>
            <span @click="getcity=['上海']">上海</span>
            <span @click="getcity=['广州']">广州</span>
            <span @click="getcity=['深圳']">深圳</span>
        </div>
        <ul class="list">
            <li v-for="item in cityList" :key="item.id">
                <h3>{{item.type}}</h3>
                <p>{{item.high}}~{{item.low}}</p>
                <span>{{item.date}}</span>
            </li>
        </ul>
        <div class="ganmao">
            <p>{{ganmao}}</p>
        </div>
    </div>
</template>

<style>
    .title {
        font-size: 30px;
        color: skyblue;
    }
    .box2 {
        margin-top: 50px;
    }
    .search {
        display: flex;
        width: 370px;
        margin: 0 auto;
    }
    input {
        margin-top: 20px;
        border-radius: 0;
        outline: none;
    }
    .search .sch {
        width: 300px;
        height: 30px;
        text-indent: 5px;
        border: 2px solid skyblue;
    }
    .search .btn {
        width: 50px;
        height: 34px;
        background-color: skyblue;
        color: #fff;
        border: none;
        cursor: pointer;
    }
    .hotcity {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        width: 330px;
        margin: 0 auto 40px;
    }
    .hotcity span {
        color: #999;
        cursor: pointer;
    }
    .list {
        display: flex;
        width: 1000px;
        margin: 0 auto;
    }
    .list li {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 25%;
        height: 150px;
        color: orange;
        border-right: 1px solid #ccc;
    }
    .list li h3 {
        color: orange;
    }
    .list li p {
        color: orange;
    }
    .list li span {
        color: #999;
    }
    .ganmao p {
        margin-top: 40px;
        font-weight: bold;
        text-align: center;
        color: red;
    }
</style>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            city: '邵阳',
            cityList: [],
            ganmao: ''
        }
    },
    methods: {
        getSearch () {
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city).then(res => {
                this.cityList = res.data.data.forecast
                this.ganmao = res.data.data.ganmao
            })
        },
        getcity () {
            this.city = ''
            this.getSearch()
        }
    },
    mounted () {
        this.getSearch()
    }
}
</script>
