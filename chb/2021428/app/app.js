// 引入express 模块  
const express = require('express');
// 路径模块(内置模块)
const path = require("path")
const bodyParser =require('body-parser')   //是一个解析器

//创建服务器
const app = express();
app.use(bodyParser.json()) //解析json
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
//设置服务器 静态资源访问目录
app.use(express.static(path.join(__dirname,'public'))) //找到现在属于的目录  app.public  没有设置只会读取本文件  public是文件夹名字
// console.log(__dirname);
// localhost:3000 默认要有个index.html
//对应01html文件
app.get('/first',(req,res) => {
    // get 使用的是get请求
    // req:前端请求的信息 request
    // res:后端返回的信息 response
    res.send("hello,Ajax");
})


// 用户请求
const fs = require('fs');
const e = require('express');
function getFile() {
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) {
            return doc
        }
    })
    return ''
}
function setFile(str) {
    fs.writeFile('./data.txt',str,err => {
        if(err != null) {
        //    console.log(err); //有错
           return 0
        }
        // 写入成功
    })
    return 1
}
app.get('/reg',(req,res) => {
    // 获取请求内容
    var userinfo = getFile()
    var obj = req.query;
 
    if(userinfo) {
        // 当文档中存在数据
    } else {
        // 文档中不存在数据,可以直接注册成功
        var flag = setFile(obj.name + '&' + obj.pwd + '|')
        if(flag) {
            res.send('regok')   //注册成功
        } else {
            res.send('regno')    //注册失败
        }
    }
})
app.get('/reg2',(req,res) => {
    var obj = req.query;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) {
            if(doc) {
                var flag = setFile(doc+obj.name+'&'+obj.pwd+'|');
                if(flag) {
                    res.send('regok')
                }else {
                    res.send('regno')
                }
            }else {
                var flag = setFile(obj.name+'&'+obj.pwd+'|');
                if(flag) {
                    res.send('regok')
                }else {
                    res.send('regno')
                }
            }
        }
    })
})
app.get('/checkName',(req,res) => {
    var obj = req.query;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) {
            if(doc) {
                var arrUser = doc.split('|')
                var flag = true;
                for(var i = 0; i < arrUser.length -1;i++ ) {
                    if(arrUser[i].split('&')[0] == obj.name) {
                        flag = false
                    }
                }
                if(flag) {
                    res.send('ok')
                }else {
                    res.send('no')
                }
            }
        }
    })
})
//用户登录在记事本中查找数据
app.get('/login2',(req,res) => {
    var obj = req.query;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) {
            if(doc) {
                var arrUser = doc.split('|')
                var flag = true;
                for(var i = 0; i < arrUser.length -1;i++ ) {
                    if(arrUser[i].split('&')[0] == obj.name) {
                        if(arrUser[i].split('&')[1] == obj.pwd) {
                            res.send({
                                code: 200,
                                msg: '登录成功',
                                data: {
                                    name: obj.name,
                                    pwd: obj.pwd
                                }
                            })
                        }else {
                            res.send({
                                code: 201,
                                msg: '密码错误'
                            })
                            break;
                        }
                    }
                }
            }else {
                res.send({
                    code: 202,
                    msg: '新系统没有用户，赶紧注册成为我们第一个用户'
                })
            }
        }
    })
})

//测试post请求
app.post('/post',(req,res) => {
    console.log(req.body);
})
//测试postjson
app.post('/postjson',(req,res) => {
    console.log(req.body);
})
//请求状态
app.get('/readystate',(req,res) => {
    res.send('ready')
})
//设置监听端口
app.listen(3000)
console.log('监听成功');
