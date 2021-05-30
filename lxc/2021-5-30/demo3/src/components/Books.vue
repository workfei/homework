<template>
    <div>
        <div>图书管理</div>
        <div>
            <input type="text" v-model="name">
            <el-button @click="submit(name, id, btnMsg)">{{btnMsg}}</el-button>
        </div>
        图书总数:{{total}}
        <el-table :data="myBooks" border style="width:100%">
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
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row.id, scope.row.name)">修改</el-button>
                    <el-button size="mini" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style>
    input {
        height: 30px;
    }
</style>

<script>
export default {
    data () {
        return {
            myBooks: [],
            name: '',
            id: '',
            btnMsg: '添加'
        }
    },
    methods: {
        getMyBooks () {
            this.$http.get('/getmybooks').then(res => {
                this.myBooks = res
            })
        },
        del (id) {
            this.$http.get('/delbooks?id=' + id).then(res => {
                var data = res
                if (data === 'ok') {
                    this.getMyBooks()
                } else {}
            })
        },
        submit (name, id, btnMsg) {
            var params = new URLSearchParams()
            this.name = ''
            this.btnMsg = '添加'
            if (btnMsg === '修改') {
                params.append('id', id)
                params.append('name', name)
                this.$http.post('/editbooks', params).then(res => {
                    var data = res
                    if (data === 'ok') {
                        this.getMyBooks()
                    }
                })
            } else {
                params.append('name', name)
                this.$http.post('/addbooks', params).then(res => {
                    var data = res
                    if (data === 'ok') {
                        this.getMyBooks()
                    }
                })
            }
        },
        edit (id, name) {
            this.id = id
            this.name = name
            this.btnMsg = '修改'
        }
    },
    computed: {
        total: function () {
        return this.myBooks.length
        }
    },
    mounted () {
        this.getMyBooks()
    }
}
</script>