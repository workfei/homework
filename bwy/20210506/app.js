// 引入express 模块  
const express = require('express');
// 路径模块(内置模块)
const path = require("path")
const bodyParser =require('body-parser')   //是一个解析器

const formidable = require('formidable'); //form

//创建服务器
const app = express();
// 设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bodyParser.json()) //解析json
// post请求解析
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
    var obj = req.query;
    var userinfo = getFile()
    
    if(userinfo) {
        // 当文档中存在数据
        var flag = setFile(userinfo + obj.name + '&' + obj.pwd + '|');
        if(flag) {
            res.send('regok')   //注册成功
        } else {
            res.send('regno')    //注册失败
        }
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
     // 获取请求内容
    var obj = req.query;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) {
            if(doc) {
                var flag = setFile(doc + obj.name + '&' + obj.pwd + '|');
                if(flag) {
                    res.send('regok')   //注册成功
                } else {
                    res.send('regno')    //注册失败
                }
            } else {
                var flag = setFile(obj.name + '&' + obj.pwd + '|')
                if(flag) {
                    res.send('regok')   //注册成功
                } else {
                    res.send('regno')    //注册失败
                }
            }
        }
    })
    return ''
})
// 用户名
app.get('/checkName',(req,res) => {
    // 获取请求的内容
    var obj = req.query;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) {
            if(doc) {
                var arrUser = doc.split('|') //把字符串转化成数组
                var flag = true; //默认设置true允许注册
                for(var i = 0; i < arrUser.length - 1; i++) {
                    // arrUser[i] = 'test&123'  ['test',123]
                    if(arrUser[i].split('&')[0] == obj.name) {
                        flag = false
                    }
                }
                if(flag) {
                    res.send('ok'); //可以注册
                } else {
                    res.send('no');
                }
            }
        }
    })
})


//用户登录在记事本中查找数据
// app.get('/login2',(req,res) => {
app.post('/login2',(req,res) => {
    // 获取请求的内容
    var obj = req.query;
    var flag = true;
    fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) {
            if(doc) {
                var arrUser = doc.split('|') //把字符串转化成数组
                var flag = true; //默认设置true允许注册
                for(var i = 0; i < arrUser.length - 1; i++) {
                    // arrUser[i] = 'test&123'  ['test',123]
                    if(arrUser[i].split('&')[0] == obj.name) {
                        flag = true;  //有用户时为true
                        if(arrUser[i].split("&")[1] == obj.pwd) {
                            // 判断密码是否正确
                            res.send({
                                code:200,
                                msg: '登录成功',
                                data:{
                                    name: obj.name,
                                    pwd: obj.pwd
                                }
                            })
                        } else {
                            res.send({
                                code: 201,
                                msg: '密码错误'
                            })
                        }
                    } else {
                        flag = false;
                    }
                }
                // 有用户flag = true 没有用户:flag = false
                //没有用户就返回请求
                if(!flag) {
                    // console.log(obj);
                    res.send({
                        code:203,
                        msg: '没有此用户'
                    })
                }
                
            } else {
                // 没有任何记录  记事本为空
                // 登录是查找文档没有内容,  则登录失败
                res.send({
                    code: 202,
                    msg: '新系统没有用户 ',
                    
                })
            }
        }
    })
})

// 搜索内容
const list = [
            '哔哩哔哩官网',
            '哔哩哔哩下载',
            '哔哩哔哩漫画 app',
            '哔哩哔哩视频怎么下载到本地',
            '哈哈漫画免费阅读在线看',
            '哈哈教育',
            '哈哈大笑图片',
            '哈哈漫画首页漫画免费'
        ];
app.get('/search',(req,res) => {
    var txt = req.query.key; //传递过来的参数名为key
    var arr = list.filter(val => val.indexOf(txt) != -1);
    res.send(arr);
})

// 测试post请求
app.post('/post',(req,res) => {
    console.log(req.body);
})
// 测试postjson请求
app.post('/postjson',(req,res) => {
    console.log(req.body);
})
// 请求状态
app.get('/readystate',(req,res) => {
    res.send('ready')
})
// 表单传参
app.post('/formData', (req, res) => {
        // 创建formidable表单解析对象
        const form = new formidable.IncomingForm();
        // 解析客户端传递过来的FormData对象
        form.parse(req, (err, fields, files) => {
            res.send(fields);
        });
    });

//     // 实现文件上传的路由
app.post('/upload', (req, res) => {
        // 创建formidable表单解析对象
        const form = new formidable.IncomingForm();
        // 设置客户端上传文件的存储路径
        form.uploadDir = path.join(__dirname, 'public', 'uploads'); //图片上传后保存到哪里
        // 保留上传文件的后缀名字
        form.keepExtensions = true;
        // 解析客户端传递过来的FormData对象
        form.parse(req, (err, fields, files) => {
            // 将客户端传递过来的文件地址响应到客户端
    //         console.log(files);
            if(files.attrName.type == 'image/jpeg' || files.attrName.type == 'image/png' || files.attrName.type == 'image/jpg' || files.attrName.type == 'image/gif' || files.attrName.type == 'image/bmp') {
                res.send({
                    path: files.attrName.path.split('public')[1]  //返回图片路径
                });
            } else {
                res.send({
                    code: 320,
                    msg: '此文件类型不合法'
                })
            }
            
        });
    });

    // xml
    // app.get('/xhm',(req,res) => {
    //     // var xhm = path.join(_dirname,'public','xml');
    //     res.send(xhm);
    // })


// json传参
app.get('/json',(req,res) => {
    // res.send({
    //     msg: 'ok'
    // })
    // res.send({msg: "成功了"});

    console.log(req.query['callback']);
    var callback = req.query['callback'];
    
    // res.send('<h1>成功了</h1>');
    res.send(callback + '({code:200,msg:"成功"})');  //JSON.stringify
})

app.post('/json1',(req,res) => {
    // res.send({
    //     msg: 'ok'
    // })
    // res.send({msg: "成功了"});

    console.log(req.body['callback']);
    var callback = req.body['callback'];
    
    // res.send('<h1>成功了</h1>');
    res.send(callback + '({code:200,msg:"成功"})');  //JSON.stringify
})

// 跨域请求返回
app.post('/kua',(req,res) => {
    res.send('成功跨域');
})


//设置监听端口
app.listen(3002)
console.log('监听成功');