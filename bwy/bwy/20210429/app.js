// 引入express 模块  
const express = require('express');
// 路径模块(内置模块)
const path = require("path")
const bodyParser =require('body-parser')   //是一个解析器

//创建服务器
const app = express();
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
app.post('/reg',(req,res) => {
    var obj = req.body;
    var userinfo = getFile();
    // console.log(userinfo);
    if(userinfo) {
        var flag = setFile(userinfo + obj.name + '&' + obj.pwd + '|');
        if(flag) {
            res.send('regok')  
        } else {
            res.send('regno')    
        }
    } else {
        var flag = setFile(obj.name + '&' + obj.pwd + '|')
        if(flag) {
            res.send('regok')   
        } else {
            res.send('regno')   
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


const data = [{
    id: 1,
    type: '娱乐',
    news: [
        '上综艺都要用替身？大明星这么忙？',
        '赚了钱还来恶心人，不取关留着过年吗？',
        '生日快乐！80岁宫崎骏《崖上的波妞》手写中文信曝光',
        '上综艺都要用替身？大明星这么忙？',
        '赚了钱还来恶心人，不取关留着过年吗？',
        '生日快乐！80岁宫崎骏《崖上的波妞》手写中文信曝光'
    ]
}, {
    id: 2,
    type: '体育',
    news: [
        '记者：罗霍将3年合约签约博卡青年队',
        '李娜退出中国国籍？还有领事证明？驻釜山总领事馆发表声明',
        '单场62分破纪录 是库里对“体系球员”最好的回答',
        '老里：哈里斯当选对大家都是好消息 我非常喜欢“三球”',
        '0-1！大冷门！利物浦轰然倒下，3轮丢7分，曼联秒变赢家',
        '全联盟第一！周琦顶替阿联成新一哥 1数据已冠绝全CBA？'
    ]
}, {
    id: 3,
    type: '财经',
    news: [
        '樊纲：我们要争取最好的结果，避免最坏的结果',
        '玩命工作像重回高三，受够大厂法则，这些年轻人选择逃离',
        '你的房租降了吗？全国40个重点城市中32个去年租金下降',
        '凌晨两三点接到领导电话是常事，PUA式加班逼着95后裸辞',
        '中银基金：2021年股市结构性机会可期 债券性价比或更高',
        '中信证券：白酒板块仍有上行空间，建议继续紧抱龙头股'
    ]
}]
app.get('/tab',(req,res) => {
    res.send(data);
})

// 测试post请求
app.post('/post',(req,res) => {
    console.log(req.body);  ///body 获得传输内容
})
// 测试postjson请求
app.post('/postjson',(req,res) => {
    console.log(req.body);
})
// 请求状态
app.get('/readystate',(req,res) => {
    res.send('ready')
})
//设置监听端口
<<<<<<< HEAD
app.listen(3001)
=======
<<<<<<< HEAD
app.listen(3001)
=======
app.listen(3002)
>>>>>>> 25deb86 (作业)
>>>>>>> 3390436 (上次)
console.log('监听成功');