// 引入express模块
const express = require('express');
// 路径模块(内置模块)
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))
var data = [{
    name: '星明',
    pwd:'123456'
},{
    name: '刘志林',
    pwd:'123456'
},{
    name: '永恒',
    pwd:'123456'
}]
app.get('/login',(req,res) => {
    var name = req.query.name;
    var pwd = req.query.pwd;
    var obj = data.find(val => val.name == name && val.pwd == pwd);
    if (obj) {
        res.send({
            code:200,
            msg:'请求成功',
            data:obj
        })
    } else {
        res.send({
            code:200,
            msg:'请求失败',
        })
    }
})
app.get('/login1',(req,res) => {
    var name = req.query.name;
    var obj = data.find(val => val.name == name);
    if (obj) {
        res.send({
            text:'此用户名已被使用'
        })
    } else {
        res.send({
            text:'此用户名可用'
        })
    }
})
// 设置监听端口
app.listen(3001);
console.log('监听成功');