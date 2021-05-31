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
                id: [
                    { required: true, message: '请输入id', triggle: blur }
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
                    this.$http.post('/adduser', params).then(res => {
                        console.log(res)
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
            if (params.file.size > 8000) {
                this.$layer.msg('图片太大了')
                return false
            }
            var formData = new FormData()
            formData.append('attrName', params.file)
            this.$http.post('/upload', formData).then(res => {
                console.log(res)
                this.ruleForm.img = this.imgURL + res.path
            })
        }
    }
}
</script>