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

app.post('/reg2', (req,res) => {
    var obj = req.body;
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
app.post('/login2', (req,res) => {
    //获取请求的内容
    var obj = req.body;
   fs.readFile('./data.txt','utf-8',(err,doc) => {
        if(err == null) { //没错
            if(doc) {
                var arrUser = doc.split('|') //把字符串转换成数组
                var flag = true;//当有内容没有此用户名是否存在
                //整个for循环用来判断此用户名是否存在
                for(var i = 0; i < arrUser.length - 1; i++) {
                    //arrUser[i] = 'test&123'   ['test','123']
                    if(arrUser[i].split('&')[0] == obj.name) {
                        flag = true;
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
                    } else {
                        flag = false;//当没有此用户名才为false
                    }
                }
                //有用户flag= true    没有用户flag= false
                //没有此用户就返回请求
                if (!flag) {
                    res.send({
                        code: 203,
                        msg: '没有此用户名'
                    })
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

//新闻tab切换数据渲染
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

//切换数据渲染
app.get('/tab', (req,res) => {
    res.send(data);
})

const list = [
    '哔哩哔哩官网',
    '哔哩哔哩下载',
    '哔哩哔哩漫画 app',
    '哔哩哔哩视频怎么下载到本地',
    '哈哈漫画免费阅读在线看',
    '哈哈教育',
    '哈哈大笑图片',
    '哈哈漫画首页漫画免费'
];

app.get('/search', (req,res) => {
    var txt = req.query.key; //传递过来的参数名为key
    var arr = list.filter(val => val.indexOf(txt) != -1);
    res.send(arr);
})

app.listen(3002);
console.log('监听成功');
