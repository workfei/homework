<template>
    <div>
        <my-Head></my-Head>
        <div class="box">
          <div class="left">
            <ul>
              <li><router-link to="/adduser">添加用户</router-link></li>
              <li><router-link to="/userlist">用户列表</router-link></li>
              <li><router-link to="/fileup">文件上传</router-link></li>
            </ul>
          </div>
          <div class="right"><router-view></router-view></div>
        </div>
        <my-foot></my-foot>
    </div>
</template>

<style>
@import '../assets/css/common.css';
  .box {
    height: 550px;
  }
  .left {
    float: left;
    width: 20%;
    height: 550px;
    background-color: #999;
  }
  .right {
    float: left;
    width: 80%;
    height: 550px;
    background-color: #fff;
  }
  .left li {
    height: 50px;
    line-height: 50px;
    list-style: none;
    color: #fff;
    background-color: skyblue;
    margin-bottom: 5px;
  }
</style>

<script>
import myHead from './Header'
import myFoot from './Footer'
export default {
  data () {
    return {}
  },
  components: {
    myHead: myHead,
    myFoot: myFoot
  }
}
</script>
