const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


var data = [{
    name: '李永恒',
    pwd: '123456'
},{
    name: '陈海波',
    pwd: '123456'
}]

app.get('/login', (req,res) => {
    var name = req.query.name;
    var pwd = req.query.pwd;
    var obj = data.find(val => val.name == name && val.pwd == pwd);
    if(obj) {
        res.send({
            code: 200,
            msg: 'ok',
            data: obj
        })
    } else {
        res.send({
            code: 250,
            msg: 'no',

        })
    }
})

app.listen(3001);
console.log('监听成功');