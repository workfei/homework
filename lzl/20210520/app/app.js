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
app.use(express.static(path.join(__dirname,'public')));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// tab
// 三级联动
const province = [{
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
const city = {
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
const area = {
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
app.get('/pro', (req,res) => {
    res.send(province);
})
//获取市： 根据省的pid
app.get('/city', (req,res) => {
    var pid = req.query.pid;
    res.send(city[pid]);
})
app.get('/area',(req,res) => {
    var cid = req.query.cid;
    var arr = area[cid];
    if (arr) {
        res.send(arr);
    }
})

let data = [{
    id: 1,
    name: '三国演义',
    date: '2021-05-17'
    },{
    id: 2,
    name: '水浒传',
    date: '2021-05-17'
    },{
    id: 3,
    name: '红楼梦',
    date: '2021-05-17'
    },{
    id: 4,
    name: '西游记',
    date: '2021-05-17'
}]
app.get('/data111', (req,res) => {
    res.send(data)
})

app.get('/del', (req,res) => {
    var id = req.query.id
    data =data.filter(val => val.id != id)
    res.send('ok')
})

app.post('/addbooks', (req,res) => {
    var name = req.body.name
    var id = data.length > 0 ? data[data.length -1].id : 1
    data.push({
        id:++id,
        name:name,
        date: new Date().getTime()
    })
    console.log(name);
    res.send('ok')
})

app.post('/send', (req,res) => {
    var name = req.body.name
    var id = req.body.id
    data.some(val => {
        if (val.id == id) {
            val.name = name
            return true
        }
        
    })
    console.log(name);
    res.send('ok')
})

app.listen(4000);
console.log('监听成功');