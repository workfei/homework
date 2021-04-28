const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))
app.listen(3001)
var data = [{
    name: '星明',
    pwd: '123456'
},{
    name: '皮特',
    pwd: '123456'
},{
    name: '杨前',
    pwd: '123456'
},{
    name: '刘涛',
    pwd: '123456'
}]
app.get('/login',(req,res) => {
    var name = req.query.name;
    var pwd = req.query.pwd;
    var name1 = data.find(val => val.name == name);
    var obj = data.find(val => val.name == name && val.pwd == pwd);
    if(obj) {
        res.send({
            msg:'yess',
            data:obj
        })
    } else {
        if(name1) {
            res.send({
                msg: 'yes',
                data: name1,
                data1:obj,
            })
        } else {
            res.send({
                msg: 'no',
                data:name1,
                data1:obj,
            })
        } 
    }
})
