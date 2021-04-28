//引入express模块
const express = require("express");
//路径模块(内置模块)
const path = require('path');
const bodyParser = require('body-parser');  //解析器

//创建服务器
const app = express();
app.use(bodyParser.json());  //解析json格式(对象格式)
//设置服务器静态资源访问目录
app.use(express.static(path.join(__dirname, 'public')));

//创建虚拟信息
var data = [{
    name: '张三',
    pwd: '123456'
}, {
    name: '李四',
    pwd: '123456'
}, {
    name: '王五',
    pwd: '123456'
}, {
    name: '老六',
    pwd: '123456'
}];

//创建服务器登录目录
app.get('/login', (req, res) => {
    var name = req.query.name;
    var pwd = req.query.pwd;
    var obj = data.find(val => val.name == name && val.pwd == pwd);
    if (obj) {
        res.send({
            code: 200,
            mgs: '请求成功！',
            data: obj
        })
    } else {
        res.send({
            code: 888,
            mgs: '用户名或者密码错误！',
        })
    }
});

//创建服务器用户名验证
app.get('/checkname', (req, res) => {
    var name = req.query.name;
    var obj = data.find(val => val.name == name);
    if (obj) {
        res.send({
            code: 666,
            mgs: '用户名已经存在！',
        })
    } else {
        res.send({
            code: 200,
            mgs: '用户名可用！',
            data: obj
        })
    }
});

//设置监听端口
app.listen(8088);
console.log("监听成功！");