<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <h2 style="margin: 20px 0">用户注册</h2>
  <el-form-item label="ID" prop="id">
    <el-input v-model.trim="ruleForm.id"></el-input>
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
  <el-form-item label="头像" prop="img">
    <el-input v-model.trim="ruleForm.img" readonly="readonly"></el-input>
    <el-upload
  class="avatar-uploader"
  action=""
  :show-file-list="false"
  :http-request="UpLoad">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
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
          img: '',
          like: ''
        },
        imageUrl: '',
        rules: {}
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
            params.append('img', this.imageUrl)
            this.$http.post('/adduser', params).then(res => {
              if (res === 'exist') {
                this.$layer.msg('用户名已存在')
                this.$refs.uinput.select()
              } else {
                this.$layer.msg('添加成功')
                this.$router.push('/userlist')
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
      UpLoad (params) {
          if (params.file.size > 100000) {
              this.$layer.msg('图片有点大')
              return false
          }
          var fromData = new FormData()
          fromData.append('attrName', params.file)
          this.$http.post('/upload', fromData).then(res => {
            this.imageUrl = this.imgURL + res.path
            this.ruleForm.img = res.path
          })
      }
    }
  }
</script>
