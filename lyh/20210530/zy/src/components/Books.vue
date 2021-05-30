<template>
  <div class='books'>
    <div class='add'>
      图书名称: <input type='text' v-model.trim='name' />
      <button @click='add'>{{ btnMsg }}</button>
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
            <a href='#' @click.prevent='edit(val.id,val.name)'>修改</a>
            &nbsp;&nbsp;&nbsp;
            <a href='#' @click.prevent='del(val.id)'>删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      name: '',
      btnMsg: '提交',
      books: [],
      booksData: [],
      text: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get('/getmybooks').then(res => {
        this.books = res
        this.booksData = res
      })
    },
    edit (id, name) {
      this.btnMsg = '修改'
      this.id = id
      this.name = name
    },
    del (id) {
      this.$http.get('/delmybooks?id=' + id).then(res => {
        if (res === 'ok') {
          this.getData()
        }
      })
    },
    add () {
      if (this.btnMsg === '提交') {
        this.$http.get('/addbooks?name=' + this.name).then(res => {
          if (res === 'ok') {
            this.getData()
          }
        })
        this.name = ''
      } else if (this.btnMsg === '修改') {
        this.$http.get('/editbooks?id=' + this.id + '&name=' + this.name).then(res => {
          if (res === 'ok') {
            this.getData()
          }
        })
        this.name = ''
        this.btnMsg = '提交'
      }
    }
  },
  computed: {
    getcounts: function () {
      return this.books.length
    }
  },
  watch: {
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
