<template>
  <div class="login">
    <h2>XX系统登录平台</h2>
    <span>用户名：</span><input type="text" v-model="uname" /><br />
    <span>密码：</span><input type="password" v-model="upwd" /><br />
    <button @click="login">登录</button>
    <button @click="reg">注册</button>
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
    return {
      uname: '',
      upwd: ''
    }
  },
  methods: {
    login () {
      this.$http.get('/login?name=' + this.uname + '&pwd=' + this.upwd).then((res) => {
          if (res === 'ok') {
            this.$router.push('/main')
          } else {
            this.$layer.msg('登录失败')
          }
        })
    },
    reg () {
      this.$router.push('/reg')
    }
  }
}
</script>