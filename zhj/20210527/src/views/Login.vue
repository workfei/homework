<template>
  <div class="login">
    <h2>XX系统登录平台</h2>
    <span>用户名：</span><input type="text" /><br />
    <span>密码：</span><input type="password" /><br />
    <button @click="login">登录</button>
  </div>
</template>

<style scoped>
@import "../assets/css/common.css";
.login {
  padding-top: 50px;
  margin: 100px auto;
  width: 500px;
  text-align: center;
  height: 300px;
  background-color: #ccc;
}

.login h2 {
  color: red;
}

.login span {
  font-weight: bold;
}

.login input {
  width: 300px;
  height: 30px;
  margin-top: 30px;
  text-indent: 5px;
}

.login button {
  width: 100px;
  height: 30px;
  margin-top: 30px;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
}

.exit {
  width: 100px;
  height: 30px;
  margin-top: 50px;
  border: none;
  cursor: pointer;
}
</style>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    login () {
      this.$router.push('/main') // 编程式导航
    }
  }
}
</script>
