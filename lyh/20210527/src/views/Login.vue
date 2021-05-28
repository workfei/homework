<template>
  <div class="login">
    <h2>XX系统登录平台</h2>
    <span>用户名：</span><input type="text" v-model="uname" /><br />
    <span>密码：</span><input type="password" v-model="pwd" /><br />
    <button @click="login">登录</button>
  </div>
</template>
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

<script>
export default {
  data () {
    return {
      data: [{
        id: 1,
        name: '星明',
        age: 20,
        pwd: '123456',
        like: '琴棋书画'
      }, {
        id: 2,
        name: '刘志林',
        age: 18,
        pwd: '123456',
        like: '琴棋书画样样不行'
      }, {
        id: 3,
        name: '黄奇特',
        age: 22,
        pwd: '123546',
        like: '琴棋书画略懂一点'
      }, {
        id: 4,
        name: '李永恒',
        age: 20,
        pwd: '123456',
        like: '琴棋书画一窍不通'
      }],
      uname: '',
      pwd: ''
    }
  },
  methods: {
    login () {
      this.data.some(val => {
        if (val.name === this.uname) {
          if (val.pwd === this.pwd) {
            this.$router.push('/main') // 编程式导航
            return true
          }
        }
      })
    }
  }
}
</script>
