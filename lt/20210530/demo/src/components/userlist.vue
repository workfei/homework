<template>
    <div>
        用户列表
        <el-table :data="data" border style="width:100%">
            <el-table-column fixed prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="like" label="爱好"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            data: ''
        }
    },
    methods: {
        getuser () {
            this.$http.get('/getUsers').then(res => {
                this.data = res
            })
        }
    },
    mounted () {
        this.getuser()
    }
}
</script>