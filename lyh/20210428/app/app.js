// 引入express模块
const express = require('express');
//路径模块
const path = require('path');
const bodyParser = require('body-parser');//解析器

//创建服务器
const app = express();
app.use(bodyParser.json());//解析json

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

//设置服务器静态资源访问目录
app.use(express.static(path.join(__dirname, 'public')));





var data = [{
    name: '星明',
    pwd: '123456'
},{
    name: '刘志林',
    pwd: '123456'
},{
    name: '李永恒',
    pwd: '123456'
}]



app.get('/login', (req,res) => {
    //req.query 是前端请求的参数
    // res.send(req.query);
    var name = req.query.name;//name代表的参数名
    var pwd = req.query.pwd;
    var obj = data.find(val => val.name == name && val.pwd == pwd);
    if (obj) {
        res.send({
            code: 200,
            msg: '请求成功',
            data: obj
        })
    } else {
        res.send({
            code: 250,
            msg: '账号或者密码错误',
        })
    }
})


//用户注册
const fs = require('fs');

function getFile() {
    fs.readFile('./data.txt', 'utf-8', (err,doc) => {
        if (err = null) {
         
            return doc;
        }
    })
    return '';
}

function setFile(str) {
    fs.writeFile('./data.txt', str, err => {
        if (err != null) {
            return 0;
        }
    })
    return 1;
}

app.get('/reg', (req,res) => {
    //获取请求的内容
    var obj = req.query;
    var userinfo = ''
    userinfo = getFile()
    console.log(userinfo);
    if(userinfo) {
        //当文档中存在数据
         var flag = setFile(userinfo + obj.name + '&' + obj.pwd + '|');
        if(flag) {
            res.send('regok') //注册成功
        } else {
            res.send('regno') //注册失败
        }
    } else {
        //文档中不存在数据,可直接注册成功
        var flag = setFile(obj.name + '&' + obj.pwd + '|');
        if(flag) {
            res.send('regok') //注册成功
        } else {
            res.send('regno') //注册失败
        }
    }
})

app.get('/reg2', (req,res) => {
    var obj = req.query;
    fs.readFile('./data.txt', 'utf-8', (err,doc) => {
        if (err == null) {
            if (doc) {
                //当文档中存在数据
                var flag = setFile(doc +  obj.name + '&' + obj.pwd + '|');
                if (flag) {
                    res.send('regok'); //注册成功
                } else {
                    res.send('regno'); //注册失败
                }
            } else {
                //当文档中不存在数据,可以直接注册
                var flag = setFile(obj.name + '&' + obj.pwd + '|');
                if (flag) {
                    res.send('regok'); //注册成功
                } else {
                    res.send('regno'); //注册失败
                }
            }
        }
    })
})


app.get('/checkName', (req,res) => {
    var obj = req.query;
    fs.readFile('./data.txt', 'utf-8', (err,doc) => {
        if (err == null) {
            if (doc) {
                var arrUser = doc.split('|');//把字符串转换成数组
                var flag = true;
                for(var i = 0; i < arrUser.length; i++) {
                    if (arrUser[i].split('&')[0] == obj.name) {
                        flag = false;
                    }
                }
                if (flag) {
                    res.send('ok'); //可以注册
                } else {
                    res.send('no'); //不可以注册
                }
            } else {
                //没有内容则表示随便哪个用户名都可以注册
                res.send('ok'); //可以注册
            }
        }
    })
})

//用户登录, 在记事本在查找数据
app.get('/login2', (req,res) => {
    //获取请求的内容
    var obj = req.query;
   fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) { //没错
            if(doc) {
                var arrUser = doc.split('|') //把字符串转换成数组
                //整个for循环用来判断此用户名是否存在
                for(var i = 0; i < arrUser.length - 1; i++) {
                    //arrUser[i] = 'test&123'   ['test','123']
                    if(arrUser[i].split('&')[0] == obj.name) {
                        if(arrUser[i].split('&')[1] == obj.pwd) { //判断密码是否正确
                            res.send({
                                code: 200,
                                msg: '登录成功',
                                data:{
                                    name: obj.name,
                                    pwd: obj.pwd
                                }
                            })
                            break;
                        } else {
                            res.send({
                                code: 201,
                                msg: '密码错误'
                            })
                            break;
                        }
                    }
                }
                
            } else {   
               //登录时查找文档没有内容，则登录失败
               //没有任何记录
               res.send({
                   code: 202,
                   msg: '新系统没有用户，赶紧注册成为我们第一个用户'
               }) 
            }
        }
    })
   
})


app.listen(3002);
console.log('监听成功');
