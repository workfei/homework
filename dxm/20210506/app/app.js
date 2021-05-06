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
app.post('/formData', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        res.send(fields);
    });
});

// 实现文件上传的路由
app.post('/upload', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 设置客户端上传文件的存储路径
    form.uploadDir = path.join(__dirname, 'public', 'uploads'); //图片上传后保存到哪里
    // 保留上传文件的后缀名字
    form.keepExtensions = true;
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        // 将客户端传递过来的文件地址响应到客户端
        if (files.attrName.type == 'image/jpeg' || files.attrName.type == 'image/png' || files.attrName.type == 'image/jpg' || files.attrName.type == 'image/gif' || files.attrName.type == 'image/bmp') {
            res.send({
                path: files.attrName.path.split('public')[1]
            });
        } else {
            res.send({
                code: 201,
                msg: '此文件类型不合法'
            })
        }

    });
});

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