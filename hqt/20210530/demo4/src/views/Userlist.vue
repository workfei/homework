<template>
  <div>
    <h2>用户管理区域</h2>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>
      <el-table-column
        prop="like"
        label="爱好">
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
h2 {
    font-size: 30px;
}
</style>
<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getUsers () {
      this.$http.get('/getUsers').then(res => {
        this.tableData = res
      })
    }
  },
  created () {
    this.getUsers()
  }
}
</script>