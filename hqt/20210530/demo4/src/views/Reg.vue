<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
                id: '',
                name: '',
                pwd: '',
                age: '',
                like: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                id: [
                    { required: true, message: '请输入id', trigger: 'blur' }
                ],
                pwd: [
                    { type: 'string', required: true, message: '请输入密码', trigger: 'blur' }
                ],
                age: [
                    { type: 'string', required: true, message: '请输入年龄', trigger: 'blur' }
                ],
                like: [
                    { type: 'string', required: true, message: '请输入爱好', trigger: 'blur' }
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
                this.$http.post('/adduser', params).then(res => {
                    if (res === 'ok') {
                        this.$router.push('/login') // 编程式导航
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>