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

//引入formidable表单模块
const formidable = require('formidable');

//允许跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//设置监听端口
app.listen(8088);
console.log('监听成功');