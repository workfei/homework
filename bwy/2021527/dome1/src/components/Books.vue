
<template>
  <div>
    id: <input type="text" v-model="id" :disabled="idflag" /> 名称:
    <input type="text" v-model="name" />
    <button @click="add">{{ btnmsg }}</button>
    <table>
      <thead>
        <th>id</th>
        <th>名称</th>
        <th>日期</th>
        <th>操作</th>
      </thead>
      <div>图书总数:{{ list.length }}</div>
      <tbody>
        <tr v-for="val in list" :key="val.id">
          <td>{{ val.id }}</td>
          <td>{{ val.name }}</td>
          <td>{{ val.date }}</td>
          <td>
            <a href="##" @click="xg(val.id)">修改</a>
            <a href="##" @click="del(val.id)">删除</a>
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
      list: [],
      id: '',
      name: '',
      idflag: false,
      btnmsg: '提交'
    }
  },
  methods: {
    del (id) {
        this.$http.get('/del?id=' + id).then((res) => {
            this.list = res
        })
    },
    add () {
      if (this.btnmsg === '提交') {
        this.$http.get('/add', {
                            params: {
                                id: this.id,
                                name: this.name
                            }
                            }).then((res) => {
            this.list = res
        })
      } else {
           this.$http.get('/xg', {
                            params: {
                                id: this.id,
                                name: this.name
                            }
           }).then((res) => {
            this.list = res
            this.id = ''
            this.name = ''
        })
      }
      this.btnmsg = '提交'
      this.idflag = false
    },
    xg (id) {
      var obj = this.list.filter((val) => val.id === id)[0]
      this.id = obj.id
      this.name = obj.name
      this.idflag = true
      this.btnmsg = '修改'
    }
  },
  mounted () {
    this.$http.get('/list').then(res => {
      this.list = res
      console.log(this)
    })
  }
}
</script>