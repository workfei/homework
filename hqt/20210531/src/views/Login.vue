<template>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="uname">
    <el-input type="text" v-model="ruleForm.uname" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="upwd">
    <el-input type="password" v-model="ruleForm.upwd" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button @click="reg()">注册</el-button>
  </el-form-item>
</el-form>
</template>
<style scoped>
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
      var validateuname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      return {
        ruleForm: {
          uname: '',
          upwd: ''
        },
        rules: {
          uname: [
            { validator: validateuname, trigger: 'blur' }
          ],
          upwd: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.get('login?name=' + this.ruleForm.uname + '&pwd=' + this.ruleForm.upwd).then(res => {
                if (res === 'ok') {
                    this.$router.push('/main') // 编程式导航
                } else {
                    console.log(res)
                }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      reg () {
          this.$router.push('/reg')
      }
    }
  }
</script>