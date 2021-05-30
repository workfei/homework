<template>
    <div>
        <div>用户列表</div>
        <el-table
        :data="userList"
        style="width: 100%">
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
              prop="age"
              label="年龄">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            userList: [
            {
                id: 1,
                name: '星明',
                age: 20,
                pwd: '123456',
                like: '琴棋书画'
            },
            {
                id: 2,
                name: '刘志林',
                age: 18,
                pwd: '123456',
                like: '琴棋书画样样不行'
            },
            {
                id: 3,
                name: '黄奇特',
                age: 22,
                pwd: '123546',
                like: '琴棋书画略懂一点'
            },
            {
                id: 4,
                name: '李永恒',
                age: 20,
                pwd: '123456',
                like: '琴棋书画一窍不通'
            }]
        }
    }
}
</script>
