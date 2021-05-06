// 引入express模块
const express = require('express');
// 路径模块
const path = require('path');
// 解析器
const bodyParser = require('body-parser');
// 创建服务器
const app = express();
const formidable = require('formidable');
// 解析json
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true
    })
)
// 设置服务器静态资源访问目录
app.use(express.static(path.join(__dirname,'public')));
// 实现文件上传的路由
app.post('/upload', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 设置客户端上传文件的存储路径
    form.uploadDir = path.join(__dirname, 'public', 'uploads'); //图片上传后保存到哪里
    // 保留上传文件的后缀名字
    form.keepExtensions = true;
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        // 将客户端传递过来的文件地址响应到客户端
        console.log(files);
        if(files.attrName.type == 'image/jpeg' || files.attrName.type == 'image/png' || files.attrName.type == 'image/jpg' || files.attrName.type == 'image/gif' || files.attrName.type == 'image/bmp') {
            res.send({
                path: files.attrName.path.split('public')[1]
            });
        } else {
            res.send({
                code: 320,
                msg: '此文件类型不合法'
            })
        }    
    });
});
app.listen(3000);
console.log('监听成功');