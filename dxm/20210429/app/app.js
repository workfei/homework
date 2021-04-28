//引入express模块
const express = require("express");
//路径模块(内置模块)
const path = require('path');
const bodyParser = require('body-parser');  //解析器

//创建服务器
const app = express();
//post请求解析字符编码
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
//设置服务器静态资源访问目录
app.use(express.static(path.join(__dirname, 'public')));  //可省略路径的根目录

/* 用户注册 */
const fs = require('fs');
function getFile() {  //获取文档中的用户
    fs.readFile('./data.txt', 'utf-8', (err, doc) => {
        if (err == null) {  //读取成功，返回文本中的用户
            return doc;
        }
    })
    return '';
}
function setFile(str) {  //在文档写入用户
    fs.writeFile('./data.txt', str, err => {
        if (err != null) {  //写入失败，返回0
            return 0;
        }
    })
    return 1;
}
//注册接口
app.post('/login', (req, res) => {
    var obj = req.body;
    fs.readFile('./data.txt', 'utf-8', (err, doc) => {
        if (err == null) {
            if (doc) {  //当文档中存在用户数据
                var flag = setFile(doc + obj.name + '&' + obj.pwd + "|");
                if (flag) {
                    res.send('注册成功');
                } else {
                    res.send('注册失败');
                }
            } else {  //当文档中不存在用户数据,可直接注册成功
                var flag = setFile(obj.name + "&" + obj.pwd + "|");
                if (flag) {
                    res.send('注册成功');
                } else {
                    res.send('注册失败');
                }
            }
        }
    })
})
//用户名判断接口
app.post('/checkname', (req, res) => {
    var obj = req.body;
    fs.readFile('./data.txt', 'utf-8', (err, doc) => {
        if (err == null) {
            if (doc) {  //当文档中存在用户数据
                var arrUser = doc.split("|");  //分割字符串
                var flag = true;  //默认设置为true,允许注册
                //for循环判断此用户名是否存在
                for (var i = 0; i < arrUser.length - 1; i++) {
                    if (arrUser[i].split('&')[0] == obj.name) {
                        flag = false;
                    }
                }
                if (flag) {
                    res.send('此用户名可用');
                } else {
                    res.send('此用户名已被注册');
                }
            } else {  //当文档中不存在用户数据,任意用户名都可直接注册成功
                res.send('此用户名可用');
            }
        }
    })
})

//用户登录
app.post("/entry", (req, res) => {
    var obj = req.body;
    fs.readFile('./data.txt', 'utf-8', (err, doc) => {
        if (err == null) {
            if (doc) {  //当文档中存在用户数据
                var arrUser = doc.split("|");  //分割字符串
                //for循环判断此用户是否存在
                for (var i = 0; i < arrUser.length - 1; i++) {
                    if (arrUser[i].split('&')[0] == obj.name) {
                        if (arrUser[i].split('&')[1] == obj.pwd) {
                            res.send({
                                code: 200,
                                msg: "登录成功",
                                data: {
                                    name: obj.name,
                                    pwd: obj.pwd
                                }
                            });
                            break;
                        } else {
                            res.send({
                                code: 666,
                                msg: "密码错误"
                            });
                            break;
                        }
                    }
                }
            } else {
                //登录时查找文档没有任何内容，则直接登录失败
                res.send({
                    code: 888,
                    msg: "无用户注册"
                });
            }
        }
    })
})

//设置监听端口
app.listen(8088);
console.log('监听成功');