<template>
    <div>
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="id" prop="id">
            <el-input v-model="ruleForm.id" readonly></el-input>
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
        <el-form-item label="头像" prop="img" width="300px">
            <el-input v-model="ruleForm.imgurl"></el-input>
            <el-upload
            class="avatar-uploader"
            action="string"
            :show-file-list="false"
            :http-request="UpLoad">
            <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
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
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height:50px;
    display: block;
  }
</style>
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
                imgurl: ''
            },
            rules: {
                id: [
                    { required: true, message: '请输入正确id', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            var params = new URLSearchParams()
            params.append('id', this.ruleForm.id)
            params.append('name', this.ruleForm.name)
            params.append('age', this.ruleForm.age)
            params.append('pwd', this.ruleForm.pwd)
            params.append('like', this.ruleForm.like)
            params.append('img', this.ruleForm.imgurl)
            console.log(this.ruleForm.imgurl)
            this.$http.post('/editUser', params).then(res => {
                if (res === 'ok') {
                    this.$router.push('/userlist')
                } else {
                    this.$layer.msg('添加用户失败')
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
      getOneData (id) {
          this.$http.get('/oneUser?id=' + id).then(res => {
              this.ruleForm.id = res[0].id
              this.ruleForm.name = res[0].name
              this.ruleForm.pwd = res[0].pwd
              this.ruleForm.age = res[0].age
              this.ruleForm.like = res[0].like
              this.ruleForm.imgurl = res[0].img
          })
      },
      UpLoad (params) {
            // if (params.file.size > 6000) {
            //     this.$layer.msg('图片有点大')
            //     return false
            // }
            var formData = new FormData()
            formData.append('attrName', params.file)
            this.$http.post('/upload', formData).then(res => {
                this.ruleForm.imgurl = res.path
            })
        }
    },
    mounted () {
        console.log(this.$router.history.current.params.id)
        this.getOneData(this.$router.history.current.params.id)
        this.hub.$on('editid', res => {
            console.log(res)
        })
    }
}
</script>