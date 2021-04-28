// console.log(__dirname); //得到的是当前文件的目录
const path = require('path'); //导入path模块
const mypath = path.join(__dirname,'js','a.txt') //路径的拼接
console.log(mypath);
const fs = require('fs')
fs.writeFile(mypath,'快12点了', err => {
    console.log(err);
    console.log('成功');
})