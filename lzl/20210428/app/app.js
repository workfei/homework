//引入express模块
const express = require('express')
//路径模块(内置模块)
const path = require('path')
const bodyParser = require('body-parser')

//创建服务器
const app = express()
app.use(bodyParser.json()) //解析json

//设置服务器静态资源访问目录
app.use(express.static(path.join(__dirname, 'public'))) //app/public
app.use(
    bodyParser.urlencoded({
        extended:true
    })
)
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

//用户注册
const fs = require('fs')


function setFile(str) {
    fs.writeFile('./data.txt', str, err => {
        if (err != null) {
            // console.log('');//有错
            return 0
        }
    })
    return 1
}
app.get('/reg', (req, res) => {
    var obj = req.query
    fs.readFile('./data.txt', 'utf-8', (err, doc) => {
        if (err == null) {
            if (doc) {
                var flag = setFile(doc + obj.name + '&' + obj.pwd + '|')
                if (flag) {
                    res.send('ok')    //注册成功        
                } else {
                    res.send('no')    //注册失败
                }
            } else {
                var flag = setFile(obj.name + '&' + obj.pwd)
                if (flag) {
                    res.send('ok')    //注册成功        
                } else {
                    res.send('no')    //注册失败
                }
            }
        }
    })
})


//检测用户名是否存在
app.get('/checkName', (req, res) => {
    var obj = req.query
    fs.readFile('./data.txt', 'utf-8', (err, doc) => {
        if (err == null) {
            if (doc) {
                var arrUser = doc.split('|')
                var flag = true //默认允许注册
                for (var i = 0; i < arrUser.length - 1; i++) {
                    if (arrUser[i].split('&')[0] == obj.name) {
                        flag = false
                    }
                }
                if (flag) {
                    res.send('ok')
                } else {
                    res.send('no')
                }
            } else {
                //没有内容则可以直接注册
                res.send('ok')
            }
        }
    })
})

//用户登录,在记事本中查找数据
app.get('/one', (req, res) => {
    var obj = req.query
    console.log(1);
    fs.readFile('./data.txt', 'utf-8', (err, doc) => {
        if (err == null) {
            if (doc) {
                var arrUser = doc.split('|')
                for (var i = 0; i < arrUser.length - 1; i++) {
                    if (arrUser[i].split('&')[0] == obj.name) {
                        if (arrUser[i].split('&')[1] == obj.pwd) {
                            res.send({
                                code: 200,
                                msg: 'yes',
                                data: {
                                    name: obj.name,
                                    pwd: obj.pwd
                                }
                            })
                            break;
                        } else {
                            res.send({
                                code: 201,
                                msg: 'passwordkerr',
                            })
                            break;
                        }
                    }
                }

            } else {
                //没有内容则登录失败
                //没有任何记录
                res.send({
                    code: 202,
                    msg: 'no',
                })
            }
        }
    })
})

//测试post请求 

app.post('/post',(req,res) => {
    console.log(req.body);
})
//测试postjson请求
app.post('/postjson',(req,res) => {
    console.log(req.body);
})

//请求状态
app.get('/readystate',(req,res) => {
    res.send('ready')
})

//设置监听端口
app.listen(4001)
console.log('监听成功');