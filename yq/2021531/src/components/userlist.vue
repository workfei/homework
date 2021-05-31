<template>
  <el-table :data="userlist" border style="width: 100%">
    <el-table-column prop="id" label="学号" width="80"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="img" label="头像" width="200"> </el-table-column>
    <el-table-column prop="age" label="年龄" width="100"> </el-table-column>
    <el-table-column prop="like" label="爱好"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" @click="detail(scope.row.id)">详情</el-button>
        <el-button
          size="mini" @click="edit(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
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
        },
        del (id) {
          this.$http.get('/delUser?id=' + id).then(res => {
            this.getUserlist()
          })
        },
        detail (id) {
          this.$router.push('/detailuser/' + id)
        },
        edit (id) {
          this.$router.push('/edit/' + id)
        }
    },
    mounted () {
        this.getUserlist()
    }
  }
</script>