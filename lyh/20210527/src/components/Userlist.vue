<template>
  <div class='box-nr'>
    <el-table
      :data='books'
      style='width: 100%'
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop='id' label='编号' sortable width='180'>
      </el-table-column>
      <el-table-column prop='name' label='名字' sortable width='180'>
      </el-table-column>
      <el-table-column prop='age' label='年龄' sortable :books='books'>
      </el-table-column>
      <el-table-column prop='like' label='详细'></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      books: [
        {
          id: 1,
          name: '星明',
          age: 20,
          pwd: '123456',
          like: '琴棋书画'
        },
        {
          id: 2,
          name: '刘志林',
          age: 18,
          pwd: '123456',
          like: '琴棋书画样样不行'
        },
        {
          id: 3,
          name: '黄奇特',
          age: 22,
          pwd: '123546',
          like: '琴棋书画略懂一点'
        },
        {
          id: 4,
          name: '李永恒',
          age: 20,
          pwd: '123456',
          like: '琴棋书画一窍不通'
        }
      ]
    }
  },
  methods: {
    formatter (row, column) {
      return row.books
    }
  }
}
</script>

<style scoped>
.box-nr {
  width: 100%;
  height: 100%;
}
h2 {
  height: 40px;
  line-height: 40px;
  color: #eee;
  font-size: 20px;
  background-color: slategray;
}
table {
  width: 100%;
}
table tr {
  height: 38px;
  width: 100%;
}
th,
td {
  margin: 0;
  padding: 0;
  text-align: center;
}
.box-nr > div {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
