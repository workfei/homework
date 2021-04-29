const express = require("express")
const path = require("path")//路径模块
const bodyParser = require("body-parser")//解析器

// 创建服务器
const app = express()
app.use(bodyParser.json())//解析json
// post
app.use(
    bodyParser.urlencoded({
        extende: true
    })
)
app.use(express.static(path.join(__dirname,"public")))

// ====新闻模块===
const news = [{
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
app.get("/newstitle", (req,res) => {
    // news.forEach(val => arr.push(val.type));
    res.send(news)
})

// ===搜索模块===
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
app.get("/search", (req,res) => {
    var txt = req.query.key
    var arr = list.filter(val => val.indexOf(txt) != -1)
    res.send(arr)
})

// =======用户注册==========
const fs = require("fs")
//写入信息函数封装
function setFile(str) {
    fs.writeFile("./data.txt", str, err => {
        if (err != null) {
            return "have wrong"//有错时返回有错
        }
    })
    return "have no wrong"//没错返回没错
}
// ===用户名检测模块===
app.post("/checkname", (req, res) => {
    var obj = req.body;
    fs.readFile("./data.txt", "utf-8", (err, doc) => {
        if (err == null) {
            if (doc) {
                var exist = doc.split("|")//将数据从|分割
                var flag = true;//true允许注册
                //循环判断此用户名是否存在
                for (var i = 0; i < exist.length - 1; i++) {
                    if (exist[i].split("&")[0] == obj.name) {
                        flag = false;//表示此用户名已存在
                    }
                }
                if (flag) {
                    res.send("success")//用户名不存在
                } else {
                    res.send("unsuccess")//用户名存在
                }
            } else {
                //没有内容就表示可以随便注册用户名
                res.send("success")
            }
        }
    })
})
// ===注册检测模块===
app.post("/register", (req, res) => {
    var obj = req.body;
    fs.readFile("./data.txt", "utf-8", (err, doc) => {
        if (err == null) {
            if (doc) {
                // 文档数据存在
                var flag = setFile(doc + obj.name + "&" + obj.pwd + "|")
                if (flag) {
                    res.send("success")
                } else {
                    res.send("unsuccess")
                }
            } else {
                // 文档数据不存在
                var flag = setFile(obj.name + "&" + obj.pwd + "|")
                if (flag) {
                    res.send("success")
                } else {
                    res.send("unsuccess")
                }
            }
        }
    })
})

// ===用户密码登录模块===
app.post("/login", (req, res) => {
    var obj = req.body;
    fs.readFile("./data.txt", "utf-8", (err, doc) => {
        if (err == null) {
            if (doc) {
                //用户密码存在
                var arrInfo = doc.split("|")
                var flag = true;//当前内容没有此用户时
                // 整个for循环用来判断此用户名是否正确
                for (var i = 0; i < arrInfo.length - 1; i++) {
                    if (arrInfo[i].split("&")[0] == obj.name) {
                        flag = true;
                        if (arrInfo[i].split("&")[1] == obj.pwd) {//判断密码是否正确
                            res.send({
                                code: 200,
                                msg: "success",
                                data: {
                                    name: obj.name,
                                    pwd: obj.pwd
                                }
                            })
                            break;
                        } else {
                            res.send({
                                code: 201,
                                msg: "unsuccess"
                            })
                            break;
                        }
                    } else {
                        flag = false;
                    }
                }
                // 有用户flag=true 没有用户flag=false
                // 没有此用户就返回请求
                if (!flag) {
                    //用户不存在
                    res.send({
                        code: 203,
                        msg: "没有此用户"
                    })
                }
            } else {
                //用户不存在
                res.send({
                    code: 202,
                    msg: "nothing"
                })
            }
        }
    })
})

// 设置监听端口
app.listen(3001)
console.log("监听成功");