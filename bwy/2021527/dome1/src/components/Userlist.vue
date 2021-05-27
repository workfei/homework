<template>
  <table border="1"  cellspacing="0" cellpadding="0" class="table1" width="500">
      <tr>
          <th>编号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>操作</th>
      </tr>
      <tr v-for="val in books" :key="val.id">
          <td>{{val.id}}</td>
          <td>{{val.name}}</td>
          <td>{{val.age}}</td>
          <td>详情</td>
      </tr>
  </table>
</template>

<script>
export default {
  data: function () {
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
  }

}
</script>