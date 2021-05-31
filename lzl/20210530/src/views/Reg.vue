<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <h2 style="margin: 20px 0">用户注册</h2>
  <el-form-item label="学号" prop="id">
    <el-input v-model.trim="ruleForm.id" readonly="readonly"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="name">
    <el-input v-model.trim="ruleForm.name" ref="uinput"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pwd">
    <el-input v-model.trim="ruleForm.pwd"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model.trim="ruleForm.age"></el-input>
  </el-form-item>
  <el-form-item label="爱好" prop="like">
    <el-input v-model.trim="ruleForm.like"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    data () {
      return {
        ruleForm: {
          id: null,
          name: '',
          pwd: null,
          age: null,
          like: ''
        },
        rules: {
            id: [
                { required: true, message: '请输入id', trigger: 'blur' }
            ],
            name: [
                { required: true, message: '请输入名字', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            pwd: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
            ],
            age: [
                { required: true, message: '请输入年龄', trigger: 'blur' }
            ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = new URLSearchParams()
            params.append('id', this.ruleForm.id)
            params.append('pwd', this.ruleForm.pwd)
            params.append('name', this.ruleForm.name)
            params.append('age', this.ruleForm.age)
            params.append('like', this.ruleForm.like)
            this.$http.post('/adduser', params).then(res => {
              if (res === 'exist') {
                this.$layer.msg('用户名已存在')
                this.$refs.uinput.select()
              } else {
                this.$layer.msg('注册成功')
                this.$router.push('/login')
              }
            })
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      getuid () {
        this.$http.post('/getuid').then(res => {
          this.ruleForm.id = res
        })
      }
    },
    mounted () {
      this.getuid()
    }
  }
</script>