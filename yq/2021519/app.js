const express = require("express")
const path = require("path")//路径
const bodyParser = require("body-parser")//解析器

// 创建服务器
const app = express()
app.use(bodyParser.json())//解析json
//post
app.use(
    bodyParser.urlencoded({
        extende: true
    })
)
app.use(express.static(path.join(__dirname,"public")))

// ====三级联动===
const pro = [{
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
const citys = {
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
const area = {
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
    }],
    '302': [{
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
    '303': [{
        id: '30',
        name: '龙沙区'
    }, {
        id: '31',
        name: '铁锋区'
    }, {
        id: '32',
        name: '富拉尔基区'
    }],
    '400': [{
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
    '401': [{
        id: '30',
        name: '龙沙区'
    }, {
        id: '31',
        name: '铁锋区'
    }, {
        id: '32',
        name: '富拉尔基区'
    }],
    '402': [{
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
    '403': [{
        id: '30',
        name: '龙沙区'
    }, {
        id: '31',
        name: '铁锋区'
    }, {
        id: '32',
        name: '富拉尔基区'
    }],
    '500': [{
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
    '501': [{
        id: '30',
        name: '龙沙区'
    }, {
        id: '31',
        name: '铁锋区'
    }, {
        id: '32',
        name: '富拉尔基区'
    }],
    '502': [{
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
    '503': [{
        id: '30',
        name: '龙沙区'
    }, {
        id: '31',
        name: '铁锋区'
    }, {
        id: '32',
        name: '富拉尔基区'
    }]
}
// 获取省
app.get("/pro", (req,res) => {
    res.send(pro)
})
// 获取市,根据省的pid
app.get("/city", (req,res) => {
    var pid = req.query.pid
    res.send(citys[pid])
})
// 获取区,根据市的cid
app.get("/area", (req,res) => {
    var cid = req.query.cid
    res.send(area[cid])
})


// 设置监听端口
app.listen(3001)
console.log("监听成功");