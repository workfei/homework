<template>
<div>
  <div class="search">
     <span>用户搜索：</span><input type="search" @keydown.enter="handleSearch()" v-model.trim="searchname">
  </div>
  <el-table :data="userlist" border style="width: 100%">
    <el-table-column prop="id" label="学号" width="80"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
    <el-table-column prop="img" label="头像路径" width="250"> </el-table-column>
    <el-table-column prop="age" label="年龄" width="100"> </el-table-column>
    <el-table-column prop="like" label="爱好"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" @click="handleDetail(scope.row.id)">详情</el-button>
        <el-button
          size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<style>
.search {
  margin: 10px 0;
}
.search span {
  font-weight: bold;
  vertical-align: middle;
}
.search input {
  width: 200px;
}
</style>

<script>
  export default {
    data () {
      return {
          userlist: [],
          searchname: ''
      }
    },
    methods: {
        getUserlist () {
            this.$http.get('/getUsers').then(res => {
                this.userlist = res
            })
        },
        handleSearch () {
          var params = new URLSearchParams()
          params.append('uname', this.searchname)
          this.$http.post('/searchuser', params).then(res => {
              this.userlist = res
          })
        },
        handleDetail (id) {
          this.$router.push('/detailuser/' + id)
        },
        handleEdit (id) {
          this.$router.push('/edituser/' + id)
          // this.hub.$emit('sendid', id)
        },
        handleDelete (id) {
          var params = new URLSearchParams()
          params.append('uid', id)
          this.$http.post('/deleteuser', params).then(res => {
              if (res === 'ok') {
                  this.getUserlist()
              }
          })
        }
    },
    mounted () {
        this.getUserlist()
    }
  }
</script>