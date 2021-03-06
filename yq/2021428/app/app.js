const express = require("express")
const path = require("path")//路径模块
const bodyParser = require("body-parser")//解析器

// 创建服务器
const app = express()
app.use(bodyParser.json())//解析json
// post
app.use(
    bodyParser.urlencoded({
        extende: true
    })
)
app.use(express.static(path.join(__dirname, "public")))

// =======用户注册==========
const fs = require("fs")
//写入信息函数封装
function setFile(str) {
    fs.writeFile("./data.txt", str, err => {
        if (err != null) {
            return "have wrong"//有错时返回有错
        }
    })
    return "have no wrong"//没错返回没错
}
// 用户名检测
<<<<<<< HEAD
app.post("/checkname", (req,res) => {
=======
app.post("/checkname", (req, res) => {
>>>>>>> 142844a (杨前2021429作业)
    var obj = req.body;
    fs.readFile("./data.txt", "utf-8", (err, doc) => {
        if (err == null) {
            if (doc) {
                var exist = doc.split("|")//将数据从|分割
                var flag = true;//true允许注册
                //循环判断此用户名是否存在
                for (var i = 0; i < exist.length - 1; i++) {
                    if (exist[i].split("&")[0] == obj.name) {
                        flag = false;//表示此用户名已存在
                    }
                }
                if (flag) {
                    res.send("success")//用户名不存在
                } else {
                    res.send("unsuccess")//用户名存在
                }
            } else {
                //没有内容就表示可以随便注册用户名
                res.send("success")
            }
        }
    })
})
// 注册检测
<<<<<<< HEAD
app.post("/register", (req,res) => {
=======
app.post("/register", (req, res) => {
>>>>>>> 142844a (杨前2021429作业)
    var obj = req.body;
    fs.readFile("./data.txt", "utf-8", (err, doc) => {
        if (err == null) {
            if (doc) {
                // 文档数据存在
                var flag = setFile(doc + obj.name + "&" + obj.pwd + "|")
                if (flag) {
                    res.send("success")
                } else {
                    res.send("unsuccess")
                }
            } else {
                // 文档数据不存在
                var flag = setFile(obj.name + "&" + obj.pwd + "|")
                if (flag) {
                    res.send("success")
                } else {
                    res.send("unsuccess")
                }
            }
        }
    })
})

// 用户密码登录
<<<<<<< HEAD
app.post("/login", (req,res) => {
=======
app.post("/login", (req, res) => {
>>>>>>> 142844a (杨前2021429作业)
    var obj = req.body;
    fs.readFile("./data.txt", "utf-8", (err, doc) => {
        if (err == null) {
            if (doc) {
                //用户密码存在
                var arrInfo = doc.split("|")
<<<<<<< HEAD
                // 整个for循环用来判断此用户名是否正确
                for (var i = 0; i < arrInfo.length - 1; i++) {
                    if (arrInfo[i].split("&")[0] == obj.name) {
=======
                var flag = true;//当前内容没有此用户时
                // 整个for循环用来判断此用户名是否正确
                for (var i = 0; i < arrInfo.length - 1; i++) {
                    if (arrInfo[i].split("&")[0] == obj.name) {
                        flag = true;
>>>>>>> 142844a (杨前2021429作业)
                        if (arrInfo[i].split("&")[1] == obj.pwd) {//判断密码是否正确
                            res.send({
                                code: 200,
                                msg: "success",
                                data: {
                                    name: obj.name,
                                    pwd: obj.pwd
                                }
                            })
<<<<<<< HEAD
=======
                            break;
>>>>>>> 142844a (杨前2021429作业)
                        } else {
                            res.send({
                                code: 201,
                                msg: "unsuccess"
                            })
                            break;
                        }
<<<<<<< HEAD
                    // }  else {
                    //     //用户不存在
                    //     res.send({
                    //         code: 202,
                    //         msg: "nothing"
                    //     })
                    }
                }
=======
                    } else {
                        flag = false;
                    }
                }
                // 有用户flag=true 没有用户flag=false
                // 没有此用户就返回请求
                if (!flag) {
                    //用户不存在
                    res.send({
                        code: 203,
                        msg: "没有此用户"
                    })
                }
            } else {
                //用户不存在
                res.send({
                    code: 202,
                    msg: "nothing"
                })
>>>>>>> 142844a (杨前2021429作业)
            }
        }
    })
})


// 设置监听端口
app.listen(3001)
console.log("监听成功");

