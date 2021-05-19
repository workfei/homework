//引入express模块
const express = require('express');
//路径模块(内置模块)
const path = require('path');
const bodyParser = require('body-parser'); //解析器

//创建服务器
const app = express();

// 设置允许跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(bodyParser.json()) //解析json
    // post
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

//设置服务器静态资源访问目录
app.use(express.static(path.join(__dirname, 'public'))) // app/public
    // 对应01html文件
    //get 使用的是get请求
app.get('/first', (req, res) => {
    //req：前端请求的信息 request
    //res: 后端返回的信息 response
    res.send('Hello, Ajax');
});

//测试请求
app.get('/test', (req, res) => {
        res.send({ name: '张三' })
    })
    //模拟登录接口
    // app.get('/login',(req,res) => {
    //     res.send({
    //         code: 200,
    //         msg: '登录请求成功',
    //         data: {
    //             name: '李永恒',
    //             age: 20,
    //             sex: '男'
    //         }
    //     })
    // })

// //带参数的请求
// app.get('/login2', (req,res) => {
//     //req.query是前端请求的参数
//     res.send(req.query)
// })
var data = [{
    name: '星明',
    pwd: '123546'
}, {
    name: '刘志林',
    pwd: '123546'
}, {
    name: '李永恒',
    pwd: '123546'
}]
app.get('/login', (req, res) => {
    //req.query是前端请求的参数
    // res.send(req.query.name)
    var myname = req.query.name; //name代表的是参数名
    var pwd = req.query.pwd;
    var obj = data.find(val => val.name == myname && val.pwd == pwd)
    console.log(myname, pwd);
    // console.log(obj);
    if (obj) {
        res.send({
            code: 200,
            msg: '请求成功',
            data: obj
        })
    } else {
        res.send({
            code: 250,
            msg: '用户名或密码错误',
            data: obj
        })
    }
})

//用户注册
const fs = require('fs')

function getFile() {
    fs.readFile('./data.txt', 'utf-8', (err, doc) => {
        if (err == null) {
            return doc;
        }
    })
    return '';
}

function setFile(str) {
    fs.writeFile('./data.txt', str, err => {
        if (err != null) {
            // console.log(err); //有错
            return 0;
        }
        // console.log('写入成功');
    })
    return 1
}

app.get('/reg', (req, res) => {
    //获取请求的内容
    var obj = req.query;
    var userinfo = ''
    userinfo = getFile()
    console.log(userinfo);
    if (userinfo) {
        //当文档中存在数据
        var flag = setFile(userinfo + obj.name + '&' + obj.pwd + '|');
        if (flag) {
            res.send('regok') //注册成功
        } else {
            res.send('regno') //注册失败
        }
    } else {
        //文档中不存在数据,可直接注册成功
        var flag = setFile(obj.name + '&' + obj.pwd + '|');
        if (flag) {
            res.send('regok') //注册成功
        } else {
            res.send('regno') //注册失败
        }
    }
})

app.get('/reg2', (req, res) => {
    //获取请求的内容
    var obj = req.query;
    fs.readFile('./data.txt', 'utf-8', (err, doc) => {
        if (err == null) { //没错
            if (doc) {
                var flag = setFile(doc + obj.name + '&' + obj.pwd + '|');
                if (flag) {
                    res.send('regok') //注册成功
                } else {
                    res.send('regno') //注册失败
                }
            } else {
                //文档中不存在数据,可直接注册成功
                var flag = setFile(obj.name + '&' + obj.pwd + '|');
                if (flag) {
                    res.send('regok') //注册成功
                } else {
                    res.send('regno') //注册失败
                }
            }
        }
    })

})

//检测用户名是否存在
app.get('/checkName', (req, res) => {
    //获取请求的内容
    var obj = req.query;
    fs.readFile('./data.txt', 'utf-8', (err, doc) => {
        if (err == null) { //没错
            if (doc) {
                var arrUser = doc.split('|') //把字符串转换成数组
                var flag = true; //默认设置为true允许注册
                //整个for循环用来判断此用户名是否存在
                for (var i = 0; i < arrUser.length - 1; i++) {
                    //arrUser[i] = 'test&123'   ['test','123']
                    if (arrUser[i].split('&')[0] == obj.name) {
                        flag = false
                    }
                }
                if (flag) {
                    res.send('ok') //可以注册
                } else {
                    res.send('no')
                }
            } else {
                //没有内容则表示随便哪个用户名都可以注册
                res.send('ok') // 可以注册
            }
        }
    })

})

//用户登录，在记事本中查找数据
app.post('/login2', (req, res) => {
    //获取请求的内容
    var obj = req.body;
    fs.readFile('./data.txt', 'utf-8', (err, doc) => {
        if (err == null) { //没错
            if (doc) {
                var arrUser = doc.split('|') //把字符串转换成数组
                var flag = true; //当有此用户时为true
                //整个for循环用来判断此用户名是否存在
                for (var i = 0; i < arrUser.length - 1; i++) {
                    //arrUser[i] = 'test&123'   ['test','123']
                    if (arrUser[i].split('&')[0] == obj.name) {
                        if (arrUser[i].split('&')[1] == obj.pwd) { //判断密码是否正确
                            res.send({
                                code: 200,
                                msg: '登录成功',
                                data: {
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
                        flag = false; //当没有此用户时才为false
                    }
                }
                // 有用户flag = true  没有用户：flag = false
                // 没有此用户就返回请求
                if (!flag) {
                    res.send({
                        code: 203,
                        msg: '没有此用户'
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

//tab切换
const data2 = [{
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
    res.send(data2)

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
    '哔哩哔哩漫画 app',
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
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {

        res.send(fields);
    });
});


// 实现文件上传的路由
app.post('/upload', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 设置客户端上传文件的存储路径
    form.uploadDir = path.join(__dirname, 'public', 'uploads'); //图片上传后保存到哪里
    // 保留上传文件的后缀名字
    form.keepExtensions = true;
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        // 将客户端传递过来的文件地址响应到客户端
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
    var callback = req.query['callback']
    res.send(callback + '({code:200,msg:"成功"})')
})

app.post('/kua', (req, res) => {
    res.send('请求成功');
})

//设置监听端口
app.listen(3000);
console.log('监听成功');