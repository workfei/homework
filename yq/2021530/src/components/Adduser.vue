<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="ID" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="age" label="年龄"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
      this.$axios.get('http://localhost:3000/getUsers').then(res => {
          this.tableData = res
      })
  }
}
</script>
