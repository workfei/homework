// 引入express模块
const express = require('express');
// 路径模块
const path = require('path');
// 解析器
const bodyParser = require('body-parser');
// 创建服务器
const app = express();
// 解析json
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true
    })
)
// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'mytoken');
    next();
});
// 图书管理
var books = [{
    id: 1,
    name: '星明',
    age: 20,
    pwd: '123456',
    like:'琴棋书画'
},{
    id: 2,
    name: '刘志林',
    age: 18,
    pwd: '123456',
    like:'琴棋书画样样不行'
},{
    id: 3,
    name: '黄奇特',
    age: 22,
    pwd: '123546',
    like:'琴棋书画略懂一点'
},{
    id: 4,
    name: '李永恒',
    age: 20,
    pwd: '123456',
    like:'琴棋书画一窍不通'
}]
app.get('/books',(req,res) => {
    res.send(books);
})
app.get('/login',(req,res) => {
    var name = req.query.name;
    var pwd = req.query.pwd;
    if (name == '刘志林' && pwd == '123456') {
        res.send('ok')
    } else {
        res.send('no');
    }
})
app.listen(3001);
console.log('监听成功');