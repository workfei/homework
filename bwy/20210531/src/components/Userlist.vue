<template>
  <el-table :data="list" style="width: 100%">
    <el-table-column label="id" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
     <el-table-column label="年龄" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.age }}</span>
      </template>
    </el-table-column>
     <el-table-column label="图片" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px"> <el-image :src="scope.row.img"></el-image></span>
      </template>
    </el-table-column>
    <el-table-column label="爱好" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.like }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="xg(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button size="mini" @click="xq(scope.row)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    data: function () {
        return {
            list: []
        }
    },
    methods: {
        getlist () {
            this.$http.get('/getUsers').then(res => {
                this.list = res
            })
        },
        handleDelete (index, row) {
          console.log(index, row.id)
          this.$http.get('/delUser?id=' + row.id).then(res => {
            if (res === 'ok') {
              this.getlist()
            } else {
              this.$layer.msg('失败')
            }
          })
        },
        xg (obj) {
          this.$router.push('/xg/' + obj.id)
        },
        xq (obj) {
          this.$router.push('/details/' + obj.id)
        }
    },
    mounted () {
        this.getlist()
    }
}
</script>