<template>
    <div>
        <div>图书管理</div>
         <div>
          <input type="text" v-model="name">
            <el-button>{{btnMsg}}</el-button>
        </div>
        图书总数:{{total}}
        <el-table :data="mybooks" border style="width:100%">
            <el-table-column fixed prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="date" label="时间"></el-table-column>
            <el-table-column label="操作">
                <el-button size="mini">修改</el-button>
                <el-button size="mini">删除</el-button>
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
            btnMsg: '提交',
            total: 4,
            name: '',
            mybooks: [
             {
                id: 1,
                name: '三国演义',
                date: '2021-05-20'
             },
             {
                id: 2,
                name: '水浒传',
                date: '2021-05-20'
             },
             {
                id: 3,
                name: '红楼梦',
                date: '2021-05-20'
             },
             {
                id: 4,
                name: '西游记',
                date: '2021-05-20'
             }]
        }
    }
}
</script>
