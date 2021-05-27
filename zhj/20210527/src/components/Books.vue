<template>
  <div>
    <el-table
      :data="data"
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
        prop="date"
        label="时间">
      </el-table-column>
    </el-table>
  </div>
</template>
<style>
.add {
  width: 500px;
  margin: 0 auto;
  background-color: skyblue;
}
.count {
  width: 500px;
  margin: 0 auto;
}
</style>
<script>
export default {
  data () {
    return {
      data: [
        {
          id: 1,
          name: '三国演义',
          date: '2021-05-17'
        },
        {
          id: 2,
          name: '水浒传',
          date: '2021-05-17'
        },
        {
          id: 3,
          name: '红楼梦',
          date: '2021-05-17'
        },
        {
          id: 4,
          name: '西游记',
          date: '2021-05-17'
        }
      ]
    }
  }
}
</script>