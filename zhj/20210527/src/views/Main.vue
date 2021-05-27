<template>
    <div>
        <my-Head></my-Head>
        <div class="box">
            <div class="left">
                <ul>
                    <li><router-link to="/adduser">添加用户</router-link></li>
                    <li><router-link to="/userlist">用户列表</router-link></li>
                    <li><router-link to="/tian">天知道</router-link></li>
                    <li><router-link to="/wyy">网易云音乐</router-link></li>
                    <li><router-link to="/books">图书管理</router-link></li>
                </ul>
            </div>
            <div class="right">
                <router-view />
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<style>
@import '../assets/css/common.css';
    .box{
        height: 550px;
    }
    .left{
        float: left;
        width: 20%;
        height: 550px;
        background-color: #999;
    }
    .right{
        float: right;
        width: 80%;
        height: 550px;
    }
    .left li{
        height: 50px;
        list-style: none;
        background-color: skyblue;
        text-align: center;
        line-height: 50px;
        margin-bottom: 5px;
    }
    .left li a{
        color: yellow;
        font-size: 15px;
    }
</style>

<script>
import myHead from './Header'
import myFooter from './Footer'
export default {
    data () {
        return {}
    },
    components: {
        myHead: myHead,
        myFooter: myFooter
    }
}
</script>
