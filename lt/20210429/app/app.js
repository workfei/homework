// 引入express模块
const bodyParser = require('body-parser');//解析器
const express = require('express');
const path = require('path');

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
    console.log(obj);
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
    console.log(obj);
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
    const areas = {
                '300': [{
                    id: '20',
                    name: '道里区',
                }, {
                    id: '21',
                    name: '南岗区'
                }, {
                    id: '22',
                    name: '平房区',
                }, {
                    id: '23',
                    name: '松北区'
                }],
                '301': [{
                    id: '30',
                    name: '龙沙区'
                }, {
                    id: '31',
                    name: '铁锋区'
                }, {
                    id: '32',
                    name: '富拉尔基区'
                }]
            };
    const areas1 = {
            '001': [{
                id: '300',
                name: '哈尔滨市'
            }, {
                id: '301',
                name: '齐齐哈尔市'
            }, {
                id: '302',
                name: '牡丹江市'
            }, {
                id: '303',
                name: '佳木斯市'
            }],
            '002': [{
                id: '400',
                name: '成都市'
            }, {
                id: '401',
                name: '绵阳市'
            }, {
                id: '402',
                name: '德阳市'
            }, {
                id: '403',
                name: '攀枝花市'
            }],
            '003': [{
                id: '500',
                name: '石家庄市'
            }, {
                id: '501',
                name: '唐山市'
            }, {
                id: '502',
                name: '秦皇岛市'
            }, {
                id: '503',
                name: '邯郸市'
            }],
            '004': [{
                id: '600',
                name: '常州市'
            }, {
                id: '601',
                name: '徐州市'
            }, {
                id: '602',
                name: '南京市'
            }, {
                id: '603',
                name: '淮安市'
            }]
        }
    const areas2 = [{
                id: '001',
                name: '黑龙江省'
            },{
                id: '002',
                name: '四川省'
            },{
                id: '003',
                name: '河北省'
            },{
                id: '004',
                name: '江苏省'
            }]
app.get('/search',(req,res) => {
    var txt = req.query.key;//传递过来的参数名为key
    var arr = list.filter(val => val.indexOf(txt) != -1);
    res.send(arr);
})
app.get('/tab',(req,res) => {
    // var num = req.query.key;
    // var arr = data[num].news
    res.send(data);
})
app.listen(3008);
console.log('监听成功');