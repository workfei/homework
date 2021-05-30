<template>
  <section>
    <h4>添加图书</h4>
    <div class="addbook">
      图书名称：<input type="text" v-model.trim="bname" ref="binput">
      <button @click="sumbitBook">提交</button>
    </div>
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

.addbook {
    margin-top: 30px;
}

.addbook button{
    width: 50px;
    height: 20px;
    color: #fff;
    margin-left: 10px;
    margin-bottom: 10px;
    background-color: #000;
    border: 0;
    cursor: pointer;
}
</style>

<script>
export default {
    data () {
        return {
            bname: ''
        }
    },
    methods: {
        sumbitBook () {
            var params = new URLSearchParams()
            params.append('bname', this.bname)
            this.$http.post('/addbooks', params).then(res => {
                if (res === 'off') {
                    this.$layer.msg('请输入内容')
                    this.$refs.binput.focus()
                } else if (res === 'exist') {
                    this.$layer.msg('图书已存在')
                    this.$refs.binput.select()
                } else {
                    this.$layer.msg('添加成功')
                    this.$router.push('/books')
                }
            })
        }
    }
}
</script>