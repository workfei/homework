//读取文件 引入读取文件模块
const fs = require('fs')
fs.readFile('./test.txt','utf-8',(err,doc) => {
    console.log(err);
    console.log(doc);
})