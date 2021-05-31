<template>
  <div>
    <my-Head></my-Head>
    <div class="box">
      <div class="left">
        <ul>
          <li><router-link to="/Adduser">添加用户</router-link></li>
          <li><router-link to="/Userlist">用户列表</router-link></li>
          <li><router-link to="/filesUpload">文件上传</router-link></li>
        </ul>
      </div>
      <div class="right"><router-view></router-view></div>
    </div>
    <my-Footer></my-Footer>
  </div>
</template>

<style>
@import "../assets/css/base.css";
.box {
  height: 550px;
}
.left {
  float: left;
  width: 20%;
  height: 550px;
  background-color: #666;
}
.left li {
  list-style: none;
  height: 50px;
  background-color: pink;
  line-height: 50px;
  font-weight: 30px;
  margin-top: 10px;
}
.right {
  float: left;
  width: 80%;
  height: 550px;
  background-color: #fff;
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
