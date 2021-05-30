<template>
  <div>
    <my-Head></my-Head>
    <div class="box">
        <div class="left">
            <ul>
                <li><router-link to="/adduser">用户列表</router-link></li>
                <li><router-link to="/books">图书管理</router-link></li>
            </ul>
        </div>
        <div class="right"><router-view></router-view></div>
    </div>
    <my-Foot></my-Foot>
  </div>
</template>
<style>
.box {
    height: 660px;
}
.left {
    float: left;
    width: 20%;
    height: 100%;
    background-color: #999;
}
.left li {
    line-height: 50px;
    font-size: 16px;
    margin-bottom: 10px;
    background-color: skyblue;
    border-bottom: 1px solid #999;
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
// import Tian from '../components/Tian'
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
