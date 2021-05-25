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

//=================图书管理系统==============
//用户登录
var bkdata = [{
  id: 1,
  name: '星明',
  age: 20,
  pwd: '123456',
  like: '琴棋书画'
}, {
  id: 2,
  name: '刘志林',
  age: 18,
  pwd: '123456',
  like: '琴棋书画样样不行'
}, {
  id: 3,
  name: '黄奇特',
  age: 22,
  pwd: '123546',
  like: '琴棋书画略懂一点'
}, {
  id: 4,
  name: '李永恒',
  age: 20,
  pwd: '123456',
  like: '琴棋书画一窍不通'
}]

app.get("/login", (req, res) => {
  var name = req.query.name;
  var pwd = req.query.pwd;

  bkdata.forEach(val => {
    if (val.name == name && val.pwd == pwd) {
      res.send("ok");
    } else {
      res.send("err");
    }
  })
})

app.get("/getUsers", (req, res) => {
  res.send(bkdata);
})

app.get("/getLikes", (req, res) => {
  var details = [];
  bkdata.forEach(val => {
    if (val.id == req.query.uid) {
      details = val;
      res.send(details);
    }
  })
})

app.get('/getuserinfo', (req,res) => {
  var id = req.query.id
  var obj = bkdata.find(val => val.id == id)
  res.send(obj)
})

// 启动监听
app.listen(3000, () => {
  console.log('running...')
})