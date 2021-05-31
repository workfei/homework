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
  <el-form-item label="头像" prop="img">
    <el-input v-model.trim="ruleForm.img" readonly="readonly"></el-input>
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto;
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
        },
        imageUrl: ''
      }
    },
    methods: {
      getuid () {
        this.ruleForm.id = this.$route.params.id
          this.$http.get('/getuserinfo?id=' + this.ruleForm.id).then(res => {
              this.ruleForm.name = res.name
              this.ruleForm.pwd = res.pwd
              this.ruleForm.age = res.age
              this.ruleForm.like = res.like
              this.ruleForm.img = res.img
              this.imageUrl = this.ruleForm.img
          })
      }
    },
    mounted () {
      this.getuid()
    }
  }
</script>
