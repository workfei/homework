<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
  <el-form-item label="头像" prop="img">
    <el-input v-model.trim="ruleForm.img" readonly="readonly"></el-input>
    <el-upload
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :http-request="UpLoad">
    <img v-if="ruleForm.img" :src="getImgUrl(ruleForm.img)" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
    <el-button @click="resetForm('ruleForm')">恢复默认值</el-button>
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
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 60px;
    display: block;
  }
  .avatar-uploader{
    text-align: left;
    margin-top: 10px;
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
          like: '',
          img: ''
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
            ],
            img: [
                { required: true, message: '请选择图片' }
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
            params.append('name', this.ruleForm.name)
            params.append('pwd', this.ruleForm.pwd)
            params.append('age', this.ruleForm.age)
            params.append('like', this.ruleForm.like)
            params.append('img', this.ruleForm.img)
            this.$http.post('/updateinfo', params).then(res => {
              if (res === 'ok') {
                this.$layer.msg('修改成功')
                this.$router.push('/userlist')
              }
            })
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.getuid()
      },
      getuid () {
          this.ruleForm.id = this.$route.params.id
          // this.hub.$on('sendid', (val) => {
          //     console.log(val)
          // })
          var params = new URLSearchParams()
            params.append('id', this.ruleForm.id)
          this.$http.post('/edituser', params).then(res => {
              this.ruleForm.name = res.name
              this.ruleForm.pwd = res.pwd
              this.ruleForm.age = res.age
              this.ruleForm.like = res.like
              this.ruleForm.img = res.img
          })
      },
      UpLoad (params) {
          if (params.file.size > 60000) {
              this.$layer.msg('图片有点大')
              return false
          }
          var fromData = new FormData()
          fromData.append('attrName', params.file)
          this.$http.post('/upload', fromData).then(res => {
            this.imageUrl = this.imgURL + res.path
            this.ruleForm.img = res.path
          })
      },
      getImgUrl (url) {
        return this.imgURL + url
      }
    },
    mounted () {
      this.getuid()
    }
  }
</script>