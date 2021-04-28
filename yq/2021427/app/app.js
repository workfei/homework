const express = require("express")//引入express模块

const path = require("path")
const bodyParser = require("body-parser")

// 创建服务器
const app = express();
app.use(bodyParser.json())//解析json
app.use(express.static(path.join(__dirname,"public")))

//登录者数据
var data = [{
    name: "星明",
    pwd: "123456"
},{
    name: "刘志林",
    pwd: "123456"
},{
    name: "奇特",
    pwd: "123456"
},{
    name: "曾豪杰",
    pwd: "123456"
},{
    name: "是我",
    pwd: "123456"
}]
app.get("/login", (req,res) => {
    var name = req.query.name;
    var pwd = req.query.pwd;
    var obj = data.find(val => val.name == name && val.pwd == pwd)
    if (obj) {
        res.send({
            code: 200,
            msg: "请求成功",
            data: obj
        })
    } else {
        res.send({
<<<<<<< HEAD
            code: 404,
=======
<<<<<<< HEAD
            code: 333,
=======
            code: 404,
>>>>>>> 1fd9cb3b5b332cdda78226ad2db1e1ff252166d5
>>>>>>> 3ccded7 (2021428杨前作业)
            msg: "用户名或密码错误"
        })
    }
})

// 设置监听端口
app.listen(3000)
console.log("监听成功");