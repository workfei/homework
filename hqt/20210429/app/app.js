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
                    } else {
                        res.send({
                            code:202,
                            msg:'没有此用户',
                        })
                        break;
                    }
                }
            } else {
                res.send({
                    code:203,
                    msg:'新系统没有用户,请您注册'
                });
            }
        }
    })
})
// 搜索
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
app.get('/search',(req,res) => {
    var txt = req.query.key;
    if (txt != '') {
        var arr = list.filter(val => val.indexOf(txt) != -1);
        res.send(arr);
    } else {
        res.send([]);
    }
})
// tab
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
app.listen(3001);
console.log('监听成功');