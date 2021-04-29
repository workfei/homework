//引入express模块
const express = require('express')
//路径模块(内置模块)
const path = require('path')
const bodyParser = require('body-parser') //解析器

//创建服务器
const app = express();
app.use(bodyParser.json()) //解析json
//设置服务器静态资源访问目录
app.use(express.static(path.join(__dirname,'public'))) // app/public
// 对应01html文件
//get 使用的是get请求
app.get('/first', (req, res) => {
    //req：前端请求的信息 request
    //res: 后端返回的信息 response
	res.send('Hello, Ajax');
});

//测试请求
app.get('/test', (req,res) => {
    res.send({name: '张三'})
})
//模拟登录接口
// app.get('/login',(req,res) => {
//     res.send({
//         code: 200,
//         msg: '登录请求成功',
//         data: {
//             name: '李永恒',
//             age: 20,
//             sex: '男'
//         }
//     })
// })

// //带参数的请求
// app.get('/login2', (req,res) => {
//     //req.query是前端请求的参数
//     res.send(req.query)
// })
var data = [{
    name: '星明',
    pwd: '123546'
},{
    name: '刘志林',
    pwd: '123546'
},{
    name: '李永恒',
    pwd: '123546'
}]
app.get('/login', (req,res) => {
    //req.query是前端请求的参数
    // res.send(req.query.name)
    var myname = req.query.name; //name代表的是参数名
    var pwd = req.query.pwd;
    var obj = data.find(val => val.name == myname && val.pwd == pwd)
     console.log(myname,pwd);
    // console.log(obj);
    if(obj) {
        res.send({
            code: 200,
            msg: '请求成功',
            data: obj
        })
    } else {
        res.send({
            code: 250,
            msg: '用户名或密码错误', 
            data:obj         
        })
    }
})

        // console.log(__dirname);
//设置监听端口
app.listen(3000)
console.log('监听成功');