<template>
  <section>
    <h4>图书列表</h4>
    <router-link to="/addbooks"><button>添加图书</button></router-link>
    <table>
      <thead>
        <tr>
          <td>图书编号</td>
          <td>图书名称</td>
          <td>上架时间</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="val in booklist" :key="val.id">
          <td>
            <span>{{val.id}}</span>
          </td>
          <td>
            <span>{{val.name}}</span>
          </td>
          <td>
            <span>{{val.date}}</span>
          </td>
          <td>
            <a href="#" @click.prevent="deleteBook(val.id)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
    <router-view></router-view>
  </section>
</template>

<style>
section {
  width: 100%;
  text-align: center;
  background-color: #fff;
}

section h4 {
  margin: 30px 0 10px;
}

section button{
    width: 100px;
    height: 20px;
    color: #fff;
    margin-bottom: 10px;
    background-color: orange;
    border: 0;
    cursor: pointer;
}

table {
  padding: 0 10px 0;
  width: 100%;
  box-sizing: border-box;
}

thead tr td {
  height: 35px;
  background-color: #ddd;
}

tbody tr td {
  height: 35px;
  border: 1px solid #ccc;
}
</style>

<script>
export default {
    data () {
        return {
            booklist: []
        }
    },
    methods: {
        getBooklist () {
            this.$http.get('/getbooks').then(res => {
                this.booklist = res
            })
        },
        deleteBook (id) {
            var params = new URLSearchParams()
            params.append('bid', id)
            this.$http.post('/deletebooks', params).then(res => {
                if (res === 'ok') {
                    this.getBooklist()
                }
            })
        }
    },
    mounted () {
        this.getBooklist()
    }
}
</script>