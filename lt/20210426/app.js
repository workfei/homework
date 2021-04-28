const http = require('http');
const app =http.createServer();
var data = [{
    name:'刘涛'
}]
app.on('request',(req,res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8'
    });
    res.end(data[0].name)
})
app.listen(8088);//监听电脑的8088端口