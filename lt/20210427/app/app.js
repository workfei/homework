// 引入express模块
const bodyParser = require('body-parser');//解析器
const express = require('express');
const path = require('path');

// 创建服务器
const app = express();
app.use(bodyParser.json());//使用解析器
app.use(express.static(path.join(__dirname,'public')));

var data = [{
    name:'刘涛',
},{
    name:'杨前',
},{
    name:'憨憨',
},{
    name:'智障',
},];
app.get('/login',(req,res) => {
    // req.query是前端请求的参数
    // res.send(req.query.name);
    var name = req.query.name;//传参名,name 代表的是参数名
    var pwd = req.query.pwd;//密码
    var obj = data.find(val => val.name == name);
    console.log(obj);
    if(obj) {
        res.send({
            code:250,
            msg:'请求成功',
            data: obj
        })
        
    } else {
        res.send({
            code:200, 
            msg:'用户名或密码错误'
        })
    }
})
app.listen(3000);
console.log('监听成功');