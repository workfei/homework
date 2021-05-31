<template>
    <div>
    <my-head></my-head>
    <div class="box">
        <div class="left">
            <ul>
                <li><router-link to="/userlist">用户列表</router-link></li>
                <li><router-link to="/adduser">添加用户</router-link></li>
                <li><router-link to="/fileup">文件上传</router-link></li>
            </ul>
        </div>
        <div class="right"><router-view></router-view></div>
    </div>
    <my-foot></my-foot>
  </div>
</template>
<style scoped>
@import "../assets/css/base.css";
.box {
    height: 650px;
}
.left {
    float: left;
    width: 20%;
    height: 100%;
    background-color: #999;
}
.left li {
    line-height: 40px;
    font-size: 20px;
    background-color: red;
    border-bottom: 1px solid #999;
    color: #fff;
    list-style: none;
}
.right {
    float: left;
    width: 80%;
    height: 100%;
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