//引入express模块
const express = require('express')
//路径模块(内置模块)
const path = require('path')
const bodyParser = require('body-parser')

//创建服务器
const app = express()
app.use(bodyParser.json()) //解析json

//设置服务器静态资源访问目录
app.use(express.static(path.join(__dirname,'public'))) //app/public

var data = [{
    name: '小米',
    pwd: '123456'
},{
    name: '星明',
    pwd: '123456'
},{
    name: '小黄',
    pwd: '123456'
},]
app.get('/login',(req,res) => {
    // res.send(req.query.name)
    var name = req.query.name; //参数名
    var pwd = req.query.pwd; 
    var obj = data.find(val => val.name == name && val.pwd == pwd)
    if (obj) {
        res.send({
            code: 200,
            msg: '请求成功',
            data: obj
        })
    } else {
        res.send({
            code: 404,
            msg: '用户名或密码错误',
        })
    }
})

//设置监听端口
app.listen(5000)
console.log('监听成功');