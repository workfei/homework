<template>
    <div class="box">
        <img src="tzd.png" alt="">
        <input type="text" v-model="city"><button @click="search">搜索</button>
        <ul class="title">
            <li>北京</li>
            <li>上海</li>
            <li>广州</li>
            <li>深圳</li>
        </ul>
        <h1>{{data.city}}</h1>
        <ul class="tq">
            <li v-for="val in data.forecast" :key="val.id">
                <h2>{{val.data}}</h2>
                <p>{{val.fengxiang}}</p>
                <p>{{val.high}}</p>
                <p>{{val.low}}</p>
                <p>{{val.type}}</p>
            </li>
        </ul>
    </div>
</template>
<style scoped>
 .box {
            width: 380px;
            margin: auto;
            text-align: center;
            margin-top: 20px;
            height: 100px;
        }
        .box input {
            width: 300px;
            height: 50px;
            border: 1px solid pink;
            outline: none;
            box-sizing: border-box;
            text-indent: 1em;
        }
        .box button {
            background-color: skyblue;
            height: 50px;
            width: 80px;
            color: white;
            outline: none;
            border: none;
        }
        .box .title {
            margin-top: 10px;
        }
        .box .title li{
            float: left;
            list-style: none;
            margin-right: 10px;
            color: gray;
        }
        .box .tq {
            width: 800px;
            margin-left: -50%;
            display: flex;
            margin-top: 50px;
        }
        .box .tq li {
            flex: 1;
            float: left;
            list-style: none;
            text-align: center;
        }
        .box .tq li h2 {
            color: orange;
        }
        .box h1 {
            text-align: center;
            margin-top: 50px;
        }
</style>
<script>
import axios from 'axios'
export default {
     data: function () {
                return {
                    city: '邵阳',
                    data: ''
                }
            },
methods: {
            async search () {
                var data = await axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city)
                data = data.data.data
                if (data === undefined) {
                    alert('错误')
                } else {
                    this.data = data
                }
            }
           },
           mounted () {
               this.search()
           }
}
</script>