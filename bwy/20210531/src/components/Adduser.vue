<template>
    <div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="id" prop="id">
    <el-input v-model="ruleForm.id"></el-input>
  </el-form-item>
   <el-form-item label="名字" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="年龄" prop="age">
    <el-input v-model="ruleForm.age"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="pwd">
    <el-input v-model="ruleForm.pwd"></el-input>
  </el-form-item>
   <el-form-item label="爱好" prop="like">
    <el-input v-model="ruleForm.like"></el-input>
  </el-form-item>
   <el-form-item label="图片" prop="img">
    <el-input v-model="ruleForm.img" readonly></el-input>
     <el-upload
  class="avatar-uploader"
  action=""
  :http-request="Upload">
  <i class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        ruleForm: {
          id: '',
          name: '',
          age: '',
          pwd: '',
          like: '',
          img: ''
        },
        rules: {
          immediate: [
            { required: true, message: '输入id', trigger: 'blur' }
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
              params.append('age', this.ruleForm.age)
              params.append('pwd', this.ruleForm.pwd)
              params.append('like', this.ruleForm.like)
              params.append('img', this.ruleForm.like)
            this.$http.post('/adduser', params).then(res => {
                if (res === 'ok') {
                    // this.$router.push('/userlist')
                    this.$layer.msg('成功')
                } else {
                    this.$layer.msg('失败')
                }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      Upload (params) {
          var formDate = new FormData()
          formDate.append('attrName', params.file)
          this.$http.post('/upload', formDate).then(res => {
              this.ruleForm.img = res.path
          })
      }
    }
  }
</script>