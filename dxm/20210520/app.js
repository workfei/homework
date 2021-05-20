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

// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'mytoken');
    next();
});

//图书管理
var books = [{
    id: 1,
    name: '三国演义',
    date: new Date()
}, {
    id: 2,
    name: '水浒传',
    date: new Date()
}, {
    id: 3,
    name: '红楼梦',
    date: new Date()
}, {
    id: 4,
    name: '西游记',
    date: new Date()
}];

app.get("/getbooks", (req, res) => {
    res.send(books);
})

app.get("/deletebooks/:id", (req, res) => {
    books = books.filter(val => val.id != req.params.id);
    res.send(books);
})

app.get("/addbooks/:id&:name", (req, res) => {
    books.push({
        id: req.params.id,
        name: req.params.name,
        date: new Date()
    })
    res.send(books);
})

app.get("/updatebooks/:id&:name", (req, res) => {
    books.some(val => {
        if (val.id == req.params.id) {
            val.name = req.params.name;
        }
    })
    res.send(books);
})

//三级联动
//省
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
//获取省不需要参数
app.get('/pro', (req, res) => {
    res.send(provide);  //返回的是一个数组
})

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
//获取市，需要省的id参数
app.get('/city', (req, res) => {
    var pid = req.query.pid;
    res.send(city[pid]);  //返回的是一个数组
})

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
//获取区，需要市的id参数
app.get('/area', (req, res) => {
    var aid = req.query.aid;
    res.send(areas[aid] || []);  //返回的是一个数组
})

//设置监听端口
app.listen(8088);
console.log('监听成功');