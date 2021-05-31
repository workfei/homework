<template>
    <div>
        <input type="text" name="" id="" v-model="search">
        <el-table
        :data="searchList"
        style="width: 100%">
        <el-table-column
            prop="id"
            label="ID">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄">
        </el-table-column>
        <el-table-column
            prop="like"
            label="爱好">
        </el-table-column>
        <el-table-column label="操作" >
        <template slot-scope="scope" id="cz">
            <el-button
            size="mini" @click="edit(scope.row.id)">编辑</el-button>
            <el-button
            size="mini"
            type="danger" @click="del(scope.row.id)">删除</el-button>
            <el-button
            size="mini" @click="details(scope.row.id)">详情</el-button>
        </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            UserData: [],
            search: '',
            searchList: []
        }
    },
    methods: {
        getData () {
            this.$http.get('/getUsers').then(res => {
                this.UserData = res
                this.searchList = this.UserData
            })
        },
        del (id) {
            this.$http.get('/delUser?id=' + id)
            this.getData()
        },
        edit (id) {
            this.$router.push('/edituser/' + id)
        },
        details (id) {
            this.$router.push('/details/' + id)
        }
    },
    mounted () {
        this.getData()
    },
    watch: {
        search () {
            if (this.search) {
                this.searchList = this.UserData.filter(val => val.name.indexOf(this.search) !== -1)
            } else {
                this.searchList = this.UserData
            }
        }
    }
}
</script>
