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
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
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
                like: ''
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
            var params = new URLSearchParams()
            params.append('id', this.ruleForm.id)
            params.append('name', this.ruleForm.name)
            params.append('age', this.ruleForm.age)
            params.append('pwd', this.ruleForm.pwd)
            params.append('like', this.ruleForm.like)
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
              console.log(res)
              this.ruleForm.id = res[0].id
              this.ruleForm.name = res[0].name
              this.ruleForm.pwd = res[0].pwd
              this.ruleForm.age = res[0].age
              this.ruleForm.like = res[0].like
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