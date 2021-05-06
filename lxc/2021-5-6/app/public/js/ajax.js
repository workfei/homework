function ajax(options) {
    var defaults = {
        type: 'get',
        url: '',
        async: true,
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function() {},
        error: function() {},
    }
    Object.assign(defaults, options);
    var xhr = new XMLHttpRequest();
    var params = '';
    for (var attr in defaults.data) {
        // 参数拼接
        params += attr + '=' + defaults.data[attr] + '&';
    }
    params = params.substr(0, params.length - 1);
    // 如果请求方式为get
    if (defaults.type == 'get') {
        // 将参数拼接在url地址的后面
        defaults.url += '?' + params;
    }
    // 配置ajax请求
    xhr.open(defaults.type, defaults.url, defaults.async);
    // 如果请求方式为post
    if (defaults.type == 'post') {
        // 设置请求头
        xhr.setRequestHeader('Content-Type', defaults.header['Content-Type']);
        // 如果想服务器端传递的参数类型为json
        if (defaults.header['Content-Type'] == 'application/json') {
            // 将json对象传换为json字符串
            xhr.send(JSON.stringify(defaults.data));
        } else {
            // 发送请求
            xhr.send(params);
        }
    } else {
        xhr.send();
    }
    // 请求加载完成
    xhr.onload = function() {
        // 获取服务器端返回数据的类型
        var contentType = xhr.getResponseHeader('content-type');
        // 获取服务器端返回的响应数据
        var responseText = xhr.responseText;
        // 如果服务器端返回的数据是json数据类型
        if (contentType.includes('application/json')) {
            // 将josn字符串传换为json对象
            responseText = JSON.parse(responseText);
        }
        // 如果请求成功
        if (xhr.status == 200) {
            // 调用成功回调函数,并且将服务器端返回的结果传递给成功回调函数
            defaults.success(responseText, xhr);
        } else {
            // 调用失败回调函数并且将xhr对象传递给回调函数
            defaults.error(responseText, xhr);
        }
    }

    // 当网络中断时
    xhr.onerror = function() {
        // 调用失败回调函数并且将xhr对象传递给回调函数
        defaults.error(xhr);
    }
}