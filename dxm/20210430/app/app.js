//引入express模块
const express = require("express");
//路径模块(内置模块)
const path = require('path');
const bodyParser = require('body-parser');  //解析器

//创建服务器
const app = express();
//post请求url地址解析
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
                var flag = true;
                //for循环判断此用户是否存在
                for (var i = 0; i < arrUser.length - 1; i++) {
                    if (arrUser[i].split('&')[0] == obj.name) {
                        flag = true;  //当有内容有此用户时
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
                    } else {
                        flag = false;  //当有内容没有此用户时
                    }
                }
                if (!flag) {
                    res.send({
                        code: 777,
                        msg: "没有此用户"
                    });
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

/* 搜索内容 */
const list = [
    '哔哩哔哩官网',
    '哔哩哔哩下载',
    '哔哩哔哩漫画 app',
    '哔哩哔哩视频怎么下载到本地',
    '哈哈漫画免费阅读在线看',
    '哈哈教育',
    '哈哈大笑图片',
    '哈哈漫画首页漫画免费'
];
app.get('/search', (req, res) => {
    var txt = req.query.key;  //设置传递过来的参数名为key
    var arr = list.filter(val => val.indexOf(txt) != -1);  //找到包含关键字的数据存储在arr数组中
    res.send(arr);  //请求发送arr数组
})

/* tab选项卡切换 */
const newcon = [{
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
app.get("/change", (req, res) => {
    var news = req.query.news.split(",");
    var arr = [];
    news.forEach((val, index) => {
        if (val == newcon[index].type) {
            arr.push(newcon[index].news);
        }
    })
    res.send(arr);
})

//设置监听端口
app.listen(8088);
console.log('监听成功');