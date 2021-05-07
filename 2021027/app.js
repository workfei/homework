//引入express模块
const express = require('express');
//路径模块(内置模块)
const path = require('path');
//解析器
const bodyParser = require('body-parser');
//创建服务器
const app = express();
 //解析json
app.use(bodyParser.json());
//设置服务器静态资源访问目录
app.use(express.static(path.join(__dirname,'zy')))

var data = [{
    name: '曾豪杰'
}]

app.get('/login', (req,res) => {
    var myname = req.query.name;
    var obj = data.find(val => val.name == myname)
     console.log(myname);
    if(obj) {
        res.send({
            code:200,
            msg: '此用户名可用',
            data:obj
        })
    } else {
        res.send({
            code:250,
            msg: '此用户名已被使用',
            data:obj
        })
    }
})

app.listen(3033);
console.log('监听成功');