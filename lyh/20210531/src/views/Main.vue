<template>
  <div>
    <my-Head></my-Head>
    <div class="box">
      <div class="left">
        <ul>
          <li><router-link to="/adduser">添加用户</router-link></li>
          <li><router-link to="/userlist">用户列表</router-link></li>
        </ul>
      </div>
      <div class="right"><router-view /></div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

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

<style>
@import '../assets/css/common.css';
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
    }
    .left li {
        list-style: none;
        height: 50px;
        background-color: skyblue;
        line-height: 50px;
        text-align: center;
        color: yellow;
        margin-bottom: 2px;
    }
</style>
