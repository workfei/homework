<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="id" prop="id">
      <el-input v-model="ruleForm.id"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input v-model="ruleForm.pwd"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item label="爱好" prop="like">
      <el-input v-model="ruleForm.like"></el-input>
    </el-form-item>
    <el-form-item label="头像" prop="img">
      <el-input v-model="ruleForm.img" readonly></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    <el-upload
      class="upload-demo"
      drag
      action=""
      multiple
      :http-request="UpLoad"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过60000kb
      </div>
    </el-upload>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        id: '',
        name: '',
        pwd: '',
        age: '',
        like: '',
        img: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        id: [{ required: true, message: '请输入id', trigger: 'blur' }],
        pwd: [
          {
            type: 'string',
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        age: [
          {
            required: true,
            message: '请输入年龄',
            trigger: 'blur'
          }
        ],
        like: [
          {
            type: 'string',
            required: true,
            message: '请输入爱好',
            trigger: 'blur'
          }
        ],
        img: [
          {
            type: 'string',
            required: true,
            message: '请输入头像',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = new URLSearchParams()
          params.append('name', this.ruleForm.name)
          params.append('id', this.ruleForm.id)
          params.append('pwd', this.ruleForm.pwd)
          params.append('age', this.ruleForm.age)
          params.append('like', this.ruleForm.like)
          params.append('img', this.ruleForm.img)
          this.$http.post('/editUser', params).then((res) => {
            console.log(res)
            if (res === 'ok') {
              this.$router.push('/userlist') // 编程式导航
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
    UpLoad (params) {
      if (params.file.size > 60000) {
        this.$layer.msg('图片有点大')
        return false
      }
      var formData = new FormData()
      formData.append('attrName', params.file)
      this.$http.post('/upload', formData).then((res) => {
        this.ruleForm.img = this.imgURL + res.path
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    var id = this.$route.params.id
    this.$http.get('/getLikes?uid=' + id).then(res => {
      this.ruleForm.id = res.id
      this.ruleForm.name = res.name
      this.ruleForm.pwd = res.pwd
      this.ruleForm.age = res.age
      this.ruleForm.like = res.like
      this.ruleForm.img = res.img
    })
  }
}
</script>