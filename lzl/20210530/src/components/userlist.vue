<template>
  <el-table :data="userlist" border style="width: 100%">
    <el-table-column prop="id" label="学号" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
    <el-table-column prop="like" label="爱好"> </el-table-column>
    <el-table-column prop="cz" label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
           <el-button
          size="mini"
          @click="handleDelete(scope.$index, scope.row)">详情</el-button>
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
        }
    },
    mounted () {
        this.getUserlist()
    }
  }
</script>