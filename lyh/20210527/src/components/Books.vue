<template>
  <div class='books'>
    <div class='add'>
      图书名称: <input type='text' v-model.trim='name' />
      <button @click='add' :disabled='btnflag'>{{ btnMsg }}</button>
    </div>
    <p>图书总数: {{ getcounts }}</p>
    <input type='text' v-model.trim='text' placeholder='请输入搜索的内容' />
    <br />
    <br />
    <table border='1' align='center'>
      <thead>
        <tr>
          <th>ID</th>
          <th>图书名称</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='val in booksData' :key='val.id'>
          <td>{{ val.id }}</td>
          <td>{{ val.name }}</td>
          <td>{{ val.date}}</td>
          <td>
            <a href='#' @click.prevent='edit(val.id)'>修改</a>
            &nbsp;&nbsp;&nbsp;
            <a href='#' @click.prevent='del(val.id)'>删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// this.$http.filter('myTime', function (val) {
//   val = new Date(val)
//   var y = val.getFullYear()
//   var M = val.getMonth() + 1
//   M = M < 10 ? '0' + M : M
//   var d = val.getDate()
//   d = d < 10 ? '0' + d : d
//   return y + '-' + M + '-' + d
// })
export default {
  data () {
    return {
      name: '',
      btnMsg: '提交',
      btnflag: false,
      books: [],
      booksData: [],
      text: '',
      iflag: false
    }
  },
  mounted () {
    var data = [
      {
        id: 1,
        name: '国演义',
        date: 2525609975000
      },
      {
        id: 2,
        name: '水浒传',
        date: 2525609975000
      },
      {
        id: 3,
        name: '红楼梦',
        date: 2525609975000
      },
      {
        id: 4,
        name: '西游记',
        date: 2525609975000
      }
    ]
    this.books = data
    this.booksData = data
  },
  methods: {
    add () {
      if (!this.iflag) {
        if (this.name !== '') {
          this.booksData.push({
            id: this.booksData.length + 1,
            name: this.name,
            date: '2021-05-27'
          })
          this.id = this.name = ''
        }
      } else {
        this.books.some((val) => {
          if (val.id === this.id) {
            val.name = this.name
          }
        })
        this.btnflag = true
        this.iflag = false
        this.btnMsg = '提交'
        this.id = this.name = ''
      }
    },
    del (id) {
      this.booksData = this.booksData.filter((val) => val.id !== id)
    },
    edit (id) {
      var obj = this.booksData.find((val) => val.id === id)
      this.id = obj.id
      this.name = obj.name
      this.btnMsg = '修改'
      this.iflag = true
    }
  },
  computed: {
    getcounts: function () {
      return this.books.length
    }
  },
  watch: {
    name: function () {
      var flag = this.booksData.some(val => val.name === this.name)
      if (flag) {
        this.btnflag = true
      } else {
        this.btnflag = false
      }
    },
    text: function () {
      this.booksData = this.books.filter(val => this.text === val.name)
      if (this.text === '') this.booksData = this.books
    }
  }
}
</script>

<style scoped>
input {
  border: 1px solid #000;
}
th,td {
  padding: 10px 50px;
}
.books {
  text-align: center;
}
div {
  text-align: center;
}
table {
  width: 100%;
}
</style>
