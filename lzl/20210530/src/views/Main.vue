<template>
  <div>
    <my-header></my-header>
    <div class="box">
      <div class="left">
        <ul>
          <li>
            <router-link to="/userlist">用户列表</router-link>
          </li>
          <li>
            <router-link to="/books">图书管理</router-link>
          </li>
          <li>
            <router-link to="/exit">退出系统</router-link>
          </li>
        </ul>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<style scoped>
.box {
  height: 550px;
}
.left {
  float: left;
  width: 20%;
  height: 550px;
  background-color: #545c64;
}
.left li {
  height: 50px;
  line-height: 50px;
  background-color: #a0a0a0;
  border-bottom: 1.5px solid #fff;
}
.left li a {
  color: #fff;
  font-weight: bold;
}
.left li a:hover {
  color: red;
}
.right {
  float: left;
  width: 80%;
  height: 550px;
}
</style>

<script>
import myHeader from './Header'
import myFooter from './Footer'
export default {
  components: {
    myHeader: myHeader,
    myFooter: myFooter
  }
}
</script>