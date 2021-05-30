<template>
    <div>
        <div>
            <el-input v-model="name" placeholder="请输入内容" style="width:20%" ></el-input>
            <el-button type="primary" @click="submit(btnMsg)">{{btnMsg}}</el-button>
        </div>
        图书总数:{{total}}
        <el-table :data="books" border style="width:100%">
            <el-table-column fixed prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="date" label="时间"></el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.row.name, scope.row.id)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            books: [],
            btnMsg: '提交',
            name: '',
            id: ''
        }
    },
    methods: {
        getMybooks () {
            this.$http.get('/getlist').then(res => {
                this.books = res
            })
        },
        del (id) {
            this.$http.get('/del?id=' + id).then(res => {
                var data = res
                console.log(id)
                console.log(data)
                if (data === 'ok') {
                    this.getMybooks()
                }
            })
        },
        submit (btnMsg) {
            var params = new URLSearchParams()
            if (btnMsg === '修改') {
                params.append('id', this.id)
                console.log(this.id)
                params.append('name', this.name)
                this.$http.post('/editbooks', params).then(res => {
                    var data = res
                    if (data === 'ok') {
                        this.getMybooks()
                    }
                })
            } else {
                    params.append('name', this.name)
                    this.$http.post('/addbooks', params).then(res => {
                        var data = res
                        if (data === 'ok') {
                            this.getMybooks()
                        }
                    })
                }
            this.name = ''
            this.btnMsg = '提交'
        },
        edit (name, id) {
            this.name = name
            this.id = id
            this.btnMsg = '修改'
        }
    },
    mounted () {
        this.getMybooks()
    },
    computed: {
        total: function () {
            return this.books.length
        }
    }
}
</script>