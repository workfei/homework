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
// 设置服务器静态资源访问目录
app.use(express.static(path.join(__dirname,'public')))
// 用户注册
const fs = require('fs');
function setFile(str) {
    fs.writeFile('./data.txt',str,err => {
        if (err != null) {
            return 0;//有错
        }
    })
    return 1;
}
app.post('/reg',(req,res) => {
    // 获取请求的内容
    var obj = req.body;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if (err == null) {
            if (doc) {
                var flag = setFile(doc + obj.name + '&' + obj.pwd + '|');
                if (flag) {
                    res.send('regok');//注册成功
                } else {
                    res.send('regno');//注册失败
                }
            } else {
                var flag = setFile(obj.name + '&' + obj.pwd + '|');
                res.send('regok');//注册成功
            }
        }
    })
})
// 用户名验证
app.post('/checkName',(req,res) => {
    var obj = req.body;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if (err == null) {
            if (doc) {
                var arrUser = doc.split('|');
                var flag = true;
                for (var i = 0; i < arrUser.length - 1; i++) {
                    if (arrUser[i].split('&')[0] == obj.name) {
                        flag = false;
                    }
                } 
                if (flag) {
                    res.send('ok');
                } else {
                    res.send('no');
                }
            } else {
                res.send('ok');
            }
        }
    })
})
// 用户登录
app.post('/login',(req,res) => {
    var obj = req.body;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if (err == null) {
            if (doc) {
                var arrUser = doc.split('|');
                for (var i = 0; i < arrUser.length - 1; i++) {
                    if (arrUser[i].split('&')[0] == obj.name) {
                        if (arrUser[i].split('&')[1] == obj.pwd) {
                            res.send({
                                code:200,
                                msg:'登录成功',
                                data: {
                                    name:obj.name,
                                    pwd:obj.pwd
                                }
                            })
                            break;
                        } else {
                            res.send({
                                code:201,
                                msg:'密码错误',
                            })
                            break;
                        }
                    }
                }
            } else {
                res.send({
                    code:202,
                    msg:'新系统没有用户,请您注册'
                });
            }
        }
    })
})
app.listen(3001);
console.log('监听成功');