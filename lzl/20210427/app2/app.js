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
},{
    name: '星明',
},{
    name: '小黄',
},]
app.get('/login',(req,res) => {
    // res.send(req.query.name)
    var name = req.query.name; //参数名
    var obj = data.find(val => val.name == name)
    if (obj) {
        res.send({
            code: 200,
            msg: 'ok',
            data: obj
        })
    } else {
        res.send({
            code: 404,
            msg: 'no',
        })
    }
})

//设置监听端口
app.listen(4000)
console.log('监听成功');