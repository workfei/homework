<template>
  <div>
    <header>六班管理系统</header>
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
    <footer>版权信息: 6班</footer>
  </div>
</template>

<style scoped>
@import "../assets/css/reset.css";
header {
  height: 70px;
  background-color: #999;
  line-height: 70px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
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
footer {
  height: 40px;
  background-color: #999;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  color: #fff;
}
</style>