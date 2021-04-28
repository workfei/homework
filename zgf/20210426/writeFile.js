//导入写入文件模块
const fs = require('fs')
fs.writeFile('./test.txt', '要打起精神，马上又要干饭了', err => {
    if(err != null) {
        console.log(err); //有错
        return;
    }
    console.log('写入成功');
})