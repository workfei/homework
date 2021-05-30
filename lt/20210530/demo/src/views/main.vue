<template>
    <div>
        <my-head></my-head>
        <div class="box">
            <div class="left">
                <ul>
                    <li><router-link to="/userlist">用户列表</router-link></li>
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
    .box {
        height: 550px;
    }
    .left {
        width: 20%;
        height: 550px;
        background-color: #999;
        float: left;
    }
    .right {
        width: 80%;
        height: 550px;
        float: left;
        font-size: 18px;
    }
    .left li {
        height: 50px;
        background-color: skyblue;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        margin-bottom: 5px;
    }
    .left li a {
        color: yellow;
    }
    li {
        list-style: none;
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