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

//新闻tab切换数据渲染
const data = {
    1: {
        tid: "1",
        tname: "体育新闻"
    },
    2: {
        tid: "2",
        tname: "娱乐新闻"
    },
    3: {
        tid: "3",
        tname: "军事新闻"
    }
}
const data2 = [{
    tid: 1,
    news: [
        '上综艺都要用替身？大明星这么忙？',
        '赚了钱还来恶心人，不取关留着过年吗？',
        '生日快乐！80岁宫崎骏《崖上的波妞》手写中文信曝光',
        '上综艺都要用替身？大明星这么忙？',
        '赚了钱还来恶心人，不取关留着过年吗？',
        '生日快乐！80岁宫崎骏《崖上的波妞》手写中文信曝光'
    ]
}, {
    tid: 2,
    news: [
        '记者：罗霍将3年合约签约博卡青年队',
        '李娜退出中国国籍？还有领事证明？驻釜山总领事馆发表声明',
        '单场62分破纪录 是库里对“体系球员”最好的回答',
        '老里：哈里斯当选对大家都是好消息 我非常喜欢“三球”',
        '0-1！大冷门！利物浦轰然倒下，3轮丢7分，曼联秒变赢家',
        '全联盟第一！周琦顶替阿联成新一哥 1数据已冠绝全CBA？'
    ]
}, {
    tid: 3,
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

app.get('/tab2', (req,res) => {
    var id = req.query.key;
    var arr = data2[id].news;
    res.send(arr);
})

//获取省
const province = [
    {
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
    }
]
app.get('/pro' ,(req,res) => {
    res.send(province);//返回的是一个数组
})
//获取市
const city = {
    '001': [
        {
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
        }
    ],
    '002': [
        {
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
        }
    ],
    '003': [
        {
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
        }
    ],
    '004': [
        {
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
        }
    ]
}
app.get('/city' ,(req,res) => {
    var pid = req.query.pid;
    res.send(city[pid]);
})
//获取区
const area = {
    '300': [
        {
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
        }
    ],
    '301': [
        {
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
           id: '32',
           name: '富拉尔基区'
        }
    ],
    '302': [
        {
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
        }
    ],
    '303': [
        {
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
           id: '32',
           name: '富拉尔基区'
        }
    ],
    '400': [
        {
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
        }
    ],
    '401': [
        {
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
           id: '32',
           name: '富拉尔基区'
        }
    ],
    '402': [
        {
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
        }
    ],
    '403': [
        {
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
           id: '32',
           name: '富拉尔基区'
        }
    ],
    '500': [
        {
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
        }
    ],
    '501': [
        {
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
           id: '32',
           name: '富拉尔基区'
        }
    ],
    '502': [
        {
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
        }
    ],
    '503': [
        {
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
           id: '32',
           name: '富拉尔基区'
        }
    ],
    '600': [
        {
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
        }
    ],
    '601': [
        {
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
           id: '32',
           name: '富拉尔基区'
        }
    ],
    '602': [
        {
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
        }
    ],
    '603': [
        {
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
           id: '32',
           name: '富拉尔基区'
        }
    ],
}
app.get('/area' ,(req,res) => {
    var pid = req.query.pid;
    res.send(area[pid]);
})

app.listen(3001);
console.log('监听成功');