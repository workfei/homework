const express = require("express")
const path = require("path")//路径模块
const bodyParser = require("body-parser")//解析器
const formidable = require('formidable');

// 创建服务器
const app = express()
app.use(bodyParser.json())//解析json
// post
app.use(
    bodyParser.urlencoded({
        extende: true
    })
)
app.use(express.static(path.join(__dirname, "public")))

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
// 用户名检测
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
// 注册检测
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

// 用户密码登录
app.post("/login", (req, res) => {
    var obj = req.body;
    fs.readFile("./data.txt", "utf-8", (err, doc) => {
        if (err == null) {
            if (doc) {
                //用户密码存在
                var arrInfo = doc.split("|")
                var flag = true
                // 整个for循环用来判断此用户名是否正确
                for (var i = 0; i < arrInfo.length - 1; i++) {
                    if (arrInfo[i].split("&")[0] == obj.name) {
                        flag = true
                        if (arrInfo[i].split("&")[1] == obj.pwd) {//判断密码是否正确
                            res.send({
                                code: 200,
                                msg: "success",
                                data: {
                                    name: obj.name,
                                    pwd: obj.pwd
                                }
                            })
                        } else {
                            res.send({
                                code: 201,
                                msg: "unsuccess"
                            })
                            break;
                        }
                        // }  else {
                        //     //用户不存在
                        //     res.send({
                        //         code: 202,
                        //         msg: "nothing"
                        //     })
                    } else {
                        flag = false
                    }
                }
                if (!flag) {
                    res.send({
                        code: 201,
                        msg: "没有此用户"
                    })
                }
                else {

                }
            }
        }
    })
})

//tab切换
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
app.get('/tab', (req, res) => {
    // var txt = req.query.tab; 
    // var arr = data[txt].news
    // var ye = req.query.tab2
    // var te = data[ye].type
    res.send(data)

})
app.get('/tab2', (req, res) => {
    var id = req.query.id //获取传递的id
    var arr = data.find(val => val.id == id).news
    res.send(arr)

})
//搜索内容
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
    var txt = req.query.key; //传递过来的参数名为key
    var arr = list.filter(val => val.indexOf(txt) != -1)
    res.send(arr)
})

//三级联动
const provide = [{
    id: '001',
    name: '黑龙江省'
}, {
    id: '002',
    name: '四川省'
}, {
    id: '003',
    name: '河北省'
}, {
    id: '004',
    name: '江苏省'
}]

//市
const city = {
    '001': [{
        id: '300',
        name: '哈尔滨市'
    }, {
        id: '301',
        name: '齐齐哈尔市'
    }, {
        id: '302',
        name: '牡丹江市'
    }, {
        id: '303',
        name: '佳木斯市'
    }],
    '002': [{
        id: '400',
        name: '成都市'
    }, {
        id: '401',
        name: '绵阳市'
    }, {
        id: '402',
        name: '德阳市'
    }, {
        id: '403',
        name: '攀枝花市'
    }],
    '003': [{
        id: '500',
        name: '石家庄市'
    }, {
        id: '501',
        name: '唐山市'
    }, {
        id: '502',
        name: '秦皇岛市'
    }, {
        id: '503',
        name: '邯郸市'
    }],
    '004': [{
        id: '600',
        name: '常州市'
    }, {
        id: '601',
        name: '徐州市'
    }, {
        id: '602',
        name: '南京市'
    }, {
        id: '603',
        name: '淮安市'
    }]
}

//区 
const areas = {
    '300': [{
        id: '20',
        name: '道里区',
    }, {
        id: '21',
        name: '南岗区'
    }, {
        id: '22',
        name: '平房区',
    }, {
        id: '23',
        name: '松北区'
    }],
    '301': [{
        id: '30',
        name: '龙沙区'
    }, {
        id: '31',
        name: '铁锋区'
    }, {
        id: '32',
        name: '富拉尔基区'
    }]
};
app.get('/pro', (req, res) => {
    res.send(provide)
})
app.get('/city', (req, res) => {
    var pid = req.query.pid
    res.send(city[pid])
})
app.get('/areas', (req, res) => {
    var pid = req.query.pid
    res.send(areas[pid])
})

app.post('/formData', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {

        res.send(fields);
    });
});


// 实现文件上传的路由
app.post('/upload', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 设置客户端上传文件的存储路径
    form.uploadDir = path.join(__dirname, 'public', 'uploads'); //图片上传后保存到哪里
    // 保留上传文件的后缀名字
    form.keepExtensions = true;
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        // 将客户端传递过来的文件地址响应到客户端
        console.log(files);
        if (files.attrName.type == 'image/jpeg' || files.attrName.type == 'image/png' || files.attrName.type == 'image/jpg' || files.attrName.type == 'image/gif' || files.attrName.type == 'image/bmp') {
            res.send({
                path: files.attrName.path.split('public')[1]
            });
        } else {
            res.send({
                code: 320,
                msg: '此文件类型不合法'
            })
        }

    });
});

app.post('/json', (req, res) => {
    // res.send({msg:"成功了"})
    // res.send('<h1>成功了</h1>')
    var callback = req.query['callback']
    res.send(callback + '({code:200,msg:"成功"})')
})

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post('/kua', (req, res) => {
    res.send('大龟甲师的感觉萨克')
})

// 设置监听端口
app.listen(5000)
console.log("监听成功");

