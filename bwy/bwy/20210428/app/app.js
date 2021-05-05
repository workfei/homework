// 引入express模块
<<<<<<< HEAD
const bodyParser = require('body-parser');//解析器
const express = require('express');
const path = require('path');
=======
<<<<<<< HEAD
const bodyParser = require('body-parser');//解析器
const express = require('express');
const path = require('path');
=======
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');//解析器
>>>>>>> 25deb86 (作业)
>>>>>>> 3390436 (上次)

// 创建服务器
const app = express();
app.use(bodyParser.json());//使用解析器
app.use(
    bodyParser.urlencoded({extended:true})
)
app.use(express.static(path.join(__dirname,'public')));

const fs = require('fs');
function getfile () {
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) {
            return doc;
        }
    })
    return ''
}
function setFile (str) {
    fs.writeFile('./data.txt',str,err => {
        if(err == null) {
            // console.log(err);//有错
            return 0;
        }
    })
    return 1
}
app.post('/reg2',(req,res) => {
    // 获取请求的内容
    var obj = req.body;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) {//没有错误
            if (doc) {
                var flag = setFile(doc + obj.name + '&' + obj.pwd+'|')
                if (flag) {
                    res.send('ok');//注册成功
                } else {
                    res.send('no')//注册失败
                }
            } else {
                var flag = setFile(obj.name + '&' + obj.pwd+'|')
                if (flag) {
                    res.send('ok');//注册成功
                } else {
                    res.send('no')//注册失败
                }
            }
        }
    })
    // return '';
    // userinfo = getfile();
   
})
// 检验用户名是否存在
app.post('/post',(req,res) => {
    var obj = req.body;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) {//没有错误
            if (doc) {
                var arrUser = doc.split('|');//把字符串转换成数组
                var flag = true;
                // 整个for 循环用来判断此用户名是否存在
                for (var i =0; i < arrUser.length-1; i++) {
                    //aarrUser = 'tis&45';
                    if(arrUser[i].split('&')[0] == obj.name) {
                        flag = false;
                    }
                }
                if (flag) {
                    res.send('ok')
                } else{
                    res.send('no');
                }
            }
        }
    })
})
app.post('/login2',(req,res) => {
    var obj = req.body;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) {
            if (doc) {
                var arrUser = doc.split('|');
                for (var i =0; i < arrUser.length-1; i++) {
                    if(arrUser[i].split('&')[0] == obj.name) {
                        if (arrUser[i].split('&')[1] == obj.pwd) {
                            res.send({
                                code:200,
                                msg:'登陆成功',
                                data:{
                                    name: obj.name,
                                    pwd:obj.pwd
                                }
                            })
                            break;
                        } else {
                            res.send({
                                code:204,
                                msg:'密码错误'
                            })
                            break;
                        }
                    }
                }
                res.send({
                    code:204,
                    msg:'用户名或密码错误'
                })
                
            } else {
                res.send({
                    code:202,
                    msg:'nothing'
                })
            }
        }
    })
});

app.listen(3000);
console.log('监听成功');