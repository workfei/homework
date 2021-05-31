<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <h2 style="margin: 20px 0">用户详情</h2>
  <el-form-item label="学号" prop="id">
    <el-input v-model.trim="ruleForm.id" readonly="readonly"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="name">
    <el-input v-model.trim="ruleForm.name" readonly="readonly"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pwd">
    <el-input v-model.trim="ruleForm.pwd" readonly="readonly"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model.trim="ruleForm.age" readonly="readonly"></el-input>
  </el-form-item>
  <el-form-item label="爱好" prop="like">
    <el-input v-model.trim="ruleForm.like" readonly="readonly"></el-input>
  </el-form-item>
  <el-form-item label="头像" prop="img" v-if="ruleForm.img != ''">
    <el-input v-model.trim="ruleForm.img" readonly="readonly"></el-input>
    <img :src="getImgUrl(ruleForm.img)" class="avatar">
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getback()">返回列表</el-button>
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
  .avatar {
    width: 200px;
    height: 80px;
    margin-top: 10px;
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
          like: '',
          img: ''
        }
      }
    },
    methods: {
      getuid () {
          this.ruleForm.id = this.$route.params.id
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
      getImgUrl (url) {
        return this.imgURL + url
      },
      getback () {
        this.$router.go(-1)
      }
    },
    mounted () {
      this.getuid()
    }
  }
</script>