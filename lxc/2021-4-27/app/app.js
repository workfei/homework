const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/first', (req, res) => {
    res.send('Hello,Ajax');
});

app.get('/test', (req, res) => {
    res.send('我是测试信息');
});
var data = [{
    name: '星明',
    pwd: '123456'
}, {
    name: '刘志林',
    pwd: '123456'
}, {
    name: '李永恒',
    pwd: '123456'
}]

app.get('/login', (req, res) => {
    var name = req.query.name;
    var pwd = req.query.pwd;
    var obj = data.find(val => val.name == name && val.pwd == pwd);
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
        })
    }
})

app.listen(3000);
console.log('监听成功');