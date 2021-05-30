<template>
  <div>
    <div class="hd">
      <span>ID</span><input type="text" v-model="inputId" /><span>图书名称</span
      ><input type="text" v-model="inputName" /><button :disabled="btnFlag" @click="add">提交</button>
    </div>
    <div class="total">图书总数:</div>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>图书名称</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="val in books" :key="val.id">
          <td>{{ val.id }}</td>
          <td>{{ val.name }}</td>
          <td>{{ val.date }}</td>
          <td>
            <a href="javascript:;">修改</a> <a href="javascript:;" @click.prevent="del(val.id)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
#app {
  width: 500px;
  margin: 0 auto;
}

.hd {
  padding: 2px;
  background-color: goldenrod;
}

.hd span {
  padding: 2px;
  background-color: red;
  color: #fff;
  vertical-align: middle;
}

.total {
  margin: 3px 0;
}

table {
  width: 100%;
  text-align: center;
}

thead {
  background-color: skyblue;
  color: orangered;
}
</style>

<script>
export default {
  data () {
    return {
      books: [],
      inputId: '',
      inputName: '',
      btnFlag: false,
      changeFlag: false
    }
  },
  methods: {
    add () {
      if (this.inputName !== '' && this.inputId !== '') {
        this.$axios.get('http://localhost:3000/addbook?id=' + this.inputId + '&name=' + this.inputName).then(res => {
        this.books = res
        })
      } else {
        alert('输入不能为空')
      }
    },
    del (id) {
      this.$axios.get('http://localhost:3000/delbook?id=' + id).then(res => {
          this.books = res
      })
    },
    edit (id) {
      this.changeFlag = true
      var obj = this.books.find(val => val.id === id) // 找到传参id对应id
      this.inputId = id
      this.inputName = obj.name
    }
  },
  watch: {
    // inputId的改变事件
    inputId: function () {
      var flag = this.books.some(val => this.inputId === val.id)
      if (flag) {
        this.btnFlag = true
      } else {
        this.btnFlag = false
      }
    },
    // inputName的改变事件
    inputName: function () {
      var flag = this.books.some(val => this.inputName === val.name)
      if (flag) {
        this.btnFlag = true
      } else {
        this.btnFlag = false
      }
    }
  },
  created () {
    this.$axios.get('http://localhost:3000/thebook').then(res => {
      this.books = res
    })
  }
}
</script>
