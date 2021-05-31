<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <h2 style="margin: 20px 0">用户修改</h2>
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
  <el-upload
  class="upload-demo"
  drag
  action=""
  multiple :http-request="UpLoad">
  <i class="el-icon-upload"></i>
</el-upload>
 <img :src="imgurl" alt="">
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<style scoped>
img {
  position: absolute;
  left: 500px;
  top: 500px;
  width: 200px;
  height: 100px;
  display: inline-block;
}
</style>

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
        imgurl: ''
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = new URLSearchParams()
            params.append('id', this.ruleForm.id)
            params.append('name', this.ruleForm.name)
            params.append('pwd', this.ruleForm.pwd)
            params.append('age', this.ruleForm.age)
            params.append('like', this.ruleForm.like)
            params.append('img', this.imgurl)
            this.$http.post('/editUser', params).then(res => {
                this.$layer.msg('修改成功')
                this.$router.push('/userlist')
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
          this.ruleForm.id = this.$route.params.id
          var params = new URLSearchParams()
            params.append('id', this.ruleForm.id)
          this.$http.post('/editUser', params).then(res => {
              this.ruleForm.name = res.name
              this.ruleForm.pwd = res.pwd
              this.ruleForm.age = res.age
              this.ruleForm.like = res.like
          })
      },
      UpLoad (params) {
        if (params.file.size > 100000) {
            this.$layer.msg('图片有点大')
            return false
        }
        var fromData = new FormData()
        fromData.append('attrName', params.file)
        this.$http.post('/upload', fromData).then(res => {
          this.imgurl = this.imgURL + res.path
        })
      }
    },
    mounted () {
      this.getuid()
    }
  }
</script>
