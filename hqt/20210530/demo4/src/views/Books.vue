<template>
  <div>
    <input type="text" v-model="name">
    <button @click="addbooks">提交</button>
    <table width="400">
      <tr v-for="item in bookslist" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.date}}</td>
      </tr>
    </table>
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
      name: '',
      bookslist: []
    }
  },
  methods: {
    addbooks () {
      if (this.name !== '') {
        var params = new URLSearchParams()
        params.append('name', this.name)
        this.$http.post('/addbooks?name=' + this.name).then(res => {
          this.name = ''
          console.log(res)
        })
      }
    },
    books () {
      this.$http.get('/books').then(res => {
        this.bookslist = res
      })
    }
  },
  mounted () {
    this.books()
  },
  watch: {
    name: function () {
      if (this.name === '') {
        this.books()
      }
    }
  }
}
</script>