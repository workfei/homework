const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// 处理静态资源
app.use(express.static('public'))
// 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'mytoken');
  next();
});
 var dddd = [{
    id: 1,
    name: '星明',
    age: 20,
    pwd: '123456',
    like:'琴棋书画'
    },{
    id: 2,
    name: '刘志林',
    age: 18,
    pwd: '123456',
    like:'琴棋书画样样不行'
    },{
    id: 3,
    name: '黄奇特',
    age: 22,
    pwd: '123546',
    like:'琴棋书画略懂一点'
    },{
    id: 4,
    name: '李永恒',
    age: 20,
    pwd: '123456',
    like:'琴棋书画一窍不通'
}]
app.get('/login',(req,res) => {
    var name = req.query.name;
    var pwd = req.query.pwd;
    if(name == '张三' && pwd == '123456') {
      res.send(dddd)
    } else {
      res.send('err')
    }
  });
app.get('/login1',(req,res) => {
    res.send(dddd)
})
var list = [{
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
app.get('/getlist',(req,res) => {
  res.send(list)
})
// 删除数据源
app.get('/del',(req,res) => {
  var id = req.query.id;
  list = list.filter(val => val.id != id)
  res.send('成功');
})
// 添加数据          

app.post('/addbooks',(req,res) => {
  var name =req.body.name;
  var id = list.length > 0 ? list[list.length-1].id : 1
  list.push({
    id:id+1,
    name:name,
  })
  res.send('成功');
})
// 修改数据
app.post('/editbooks',(req,res) => {
  var name =req.body.name;
  var id =req.body.id;
  list.some(val=> {
    if(val.id == id) {
      val.name = name;
      return true
    }
  })
  res.send('成功');
})

// 路由
app.get('/data', (req, res) => {
  res.send('Hello World!')
})
app.get('/data1', (req, res) => {
  setTimeout(function(){
    res.send('Hello TOM!')
  },1000);
})
app.get('/data2', (req, res) => {
  res.send('Hello JERRY!')
})

const province = [{
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
app.get('/pro', (req, res) => {
  res.send(province); //返回的是一个数组
})

app.get('/books/:id', (req, res) => {
  res.send('Restful形式的URL传递参数!' + req.params.id)
})
//获取市
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
app.get('/city/', (req, res) => {
  var pid = req.query.id;
  res.send(city[pid]);
})
//获取区
const area = {
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
  }],
  '302': [{
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
  '303': [{
      id: '30',
      name: '龙沙区'
  }, {
      id: '31',
      name: '铁锋区'
  }, {
      id: '32',
      name: '富拉尔基区'
  }],
  '400': [{
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
  '401': [{
      id: '30',
      name: '龙沙区'
  }, {
      id: '31',
      name: '铁锋区'
  }, {
      id: '32',
      name: '富拉尔基区'
  }],
  '402': [{
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
  '403': [{
      id: '30',
      name: '龙沙区'
  }, {
      id: '31',
      name: '铁锋区'
  }, {
      id: '32',
      name: '富拉尔基区'
  }],
  '500': [{
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
  '501': [{
      id: '30',
      name: '龙沙区'
  }, {
      id: '31',
      name: '铁锋区'
  }, {
      id: '32',
      name: '富拉尔基区'
  }],
  '502': [{
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
  '503': [{
      id: '30',
      name: '龙沙区'
  }, {
      id: '31',
      name: '铁锋区'
  }, {
      id: '32',
      name: '富拉尔基区'
  }],
  '600': [{
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
  '601': [{
      id: '30',
      name: '龙沙区'
  }, {
      id: '31',
      name: '铁锋区'
  }, {
      id: '32',
      name: '富拉尔基区'
  }],
  '602': [{
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
  '603': [{
      id: '30',
      name: '龙沙区'
  }, {
      id: '31',
      name: '铁锋区'
  }, {
      id: '32',
      name: '富拉尔基区'
  }],
}
app.get('/area', (req, res) => {
  var pid = req.query.id;
  res.send(area[pid]);
})
// 启动监听
app.listen(3000, () => {
  console.log('running...')
});