<template>
  <el-table :data="userlist" border style="width: 100%">
    <el-table-column prop="id" label="学号" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
    <el-table-column prop="like" label="爱好"> </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data () {
      return {
          userlist: []
      }
    },
    methods: {
        getUserlist () {
            this.$http.get('/getUsers').then(res => {
                this.userlist = res
            })
        }
    },
    mounted () {
        this.getUserlist()
    }
  }
</script>