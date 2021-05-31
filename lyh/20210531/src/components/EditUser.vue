<template>
  <el-form
    :model="ruleForm"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="id" prop="id" readonly>
      <el-input v-model="ruleForm.id"></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input v-model="ruleForm.pwd"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item label="爱好" prop="like">
      <el-input v-model="ruleForm.like"></el-input>
    </el-form-item>
    <el-form-item label="图像" prop="img">
    <el-input v-model="ruleForm.img" class="img" readonly></el-input>
        <el-upload
                class="avatar-uploader"
                action=""
                :http-request="Upload">
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >修改</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
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
                    this.$http.post('/editUser', params).then(res => {
                        console.log(res)
                        if (res === 'ok') {
                            this.$router.push('/userlist')
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
                console.log(res)
                this.ruleForm.id = res[0].id
                this.ruleForm.name = res[0].name
                this.ruleForm.pwd = res[0].pwd
                this.ruleForm.age = res[0].age
                this.ruleForm.like = res[0].like
                this.ruleForm.img = res[0].img
            })
        },
        Upload (params) {
            var formData = new FormData()
            formData.append('attrName', params.file)
            this.$http.post('/upload', formData).then(res => {
                console.log(res)
                this.ruleForm.img = res.path
            })
        }
    },
    mounted () {
        this.getOneData(this.$route.params.id)
    }
}
</script>
