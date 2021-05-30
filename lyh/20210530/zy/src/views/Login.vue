<template>
  <div class='login'>
    <h2>XX系统登录平台</h2>
    <span>用户名：</span><input type='text' v-model='uname' /><br />
    <span>密码：</span><input type='password' v-model='pwd' /><br />
    <button @click='login'>登录</button>
    <button @click='reg'>注册</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uname: '',
      pwd: ''
    }
  },
  methods: {
    login () {
      this.$http.get('/login?name=' + this.uname + '&pwd=' + this.pwd).then(res => {
        if (res === 'ok') {
          this.$router.push('/main')// 编程式导航
        } else {
          console.log(this.$layer)
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

<style scoped>
@import '../assets/css/reset.css';
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
  font-size: 25px;
}
.login span {
  font-weight: bold;
}
.login input {
  width: 300px;
  height: 30px;
  margin-top: 30px;
  text-indent: 5px;
  border: 1px solid #666;
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
