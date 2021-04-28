let userName = '海波'
let version = 1.0
const sayHi = name => `你好${name}`
exports.version = version; //是把a.js中 version变量导出
// exports.sayHi = sayHi; //把sayHi方法也导出
module.exports = {
    name: '海波',
    age: 16,
    sayHi: sayHi
}
//exports方法不能和module.exports方法同时使用(以module.exports为准)