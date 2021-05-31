<template>
  <div>
    <h2>用户管理区域</h2>
    <input type="text" v-model="search">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="details(scope.row.id)">详情</el-button>
          <el-button
            size="mini"
            @click="delUsers(scope.row.id)">删除</el-button>
          <el-button
            size="mini"
            @click="edituser(scope.row.id)">修改</el-button>
        </template>
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
      tableData: [],
      tableData2: [],
      search: ''
    }
  },
  methods: {
    getUsers () {
      this.$http.get('/getUsers').then(res => {
        this.tableData = this.tableData2 = res
      })
    },
    delUsers (id) {
      this.$http.get('/delUser?id=' + id).then(res => {
        this.getUsers()
      })
    },
    details (id) {
      this.$router.push('/detalis/' + id)
    },
    edituser (id) {
      this.$router.push('/edituser/' + id)
    }
  },
  created () {
    this.getUsers()
  },
  watch: {
    search: function () {
      if (this.search === '') {
        this.tableData = this.tableData2
      } else {
        this.tableData = this.tableData2.filter(val => val.name.indexOf(this.search) !== -1)
        if (this.tableData.length === 0) {
          this.tableData = this.tableData2
        }
      }
    }
  }
}
</script>