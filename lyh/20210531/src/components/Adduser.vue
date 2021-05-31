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
                    params.append('img', this.ruleForm.img)
                    this.$http.post('/adduser', params).then(res => {
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
        Upload (params) {
            var formData = new FormData()
            formData.append('attrName', params.file)
            this.$http.post('/upload', formData).then(res => {
                console.log(res)
                this.ruleForm.img = res.path
            })
        }
    }
}
</script>

<style>
    .img {
        width: 70% !important;
        display:inline-block
    }
    .avatar-uploader {
        display:inline-block
    }
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
    height: 50px;
    display: block;
  }
</style>
