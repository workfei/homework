<template>
  <el-table
    :data="myform"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="ID"
      width="220">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="220">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="220">
    </el-table-column>
    <el-table-column
      prop="pwd"
      label="密码"
      width="220">
    </el-table-column>
    <el-table-column
      prop="like"
      label="爱好"
      width="220">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="220">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    data () {
        return {
            myform: [{
                id: 1,
                name: '星明',
                age: 20,
                pwd: '123456',
                like: '琴棋书画'
            }, {
                id: 2,
                name: '刘志林',
                age: 18,
                pwd: '123456',
                like: '琴棋书画样样不行'
            }, {
                id: 3,
                name: '黄奇特',
                age: 22,
                pwd: '123546',
                like: '琴棋书画略懂一点'
            }, {
                id: 4,
                name: '李永恒',
                age: 20,
                pwd: '123456',
                like: '琴棋书画一窍不通'
            }]
        }
    }
}
</script>