<template>
  <div>
    <my-Head></my-Head>
    <div class="box">
      <div class="left">
        <ul>
          <li><router-link to="/adduser">添加用户</router-link></li>
          <li><router-link to="/userlist">用户列表</router-link></li>
          <li><router-link to="/tzd">天知道</router-link></li>
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

<style scoped>
@import "../assets/css/reset.css";
.box {
  display: flex;
  justify-content: space-between;
  height: 550px;
}
.left {
  width: 20%;
  height: 550px;
  background-color: #aaa;
}
.left li {
  list-style: none;
  background-color: #a0a0a0;
  width: 100%;
  height: 45px;
  line-height: 45px;
  border-top: 1px solid #fff;
  text-align: center;
  font-size: 15px;
}
.left li a {
  color: #fff;
}
.left li a:hover {
    color: skyblue;
}
.right {
  width: 80%;
  height: 550px;
  background-color: #fff;
}
</style>

<script>
import myHeader from './Header'
import myFooter from './Footer'
export default {
  data () {
    return {}
  },
  components: {
    myHead: myHeader,
    myFooter: myFooter
  }
}
</script>
