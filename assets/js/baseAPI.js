// 为页面所有基地址 jq的 ajax 对象 发送请求之前 对参数 对象做处理
$.ajaxPrefilter(function (ajaxOpt) {
    ajaxOpt.url = 'http://ajax.frontend.itheima.net' + ajaxOpt.url;
    // 统一为 有权限的接口 设置 headers 请求头部
    if (ajaxOpt.url.indexOf('/my/') > -1) {
        ajaxOpt.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

    // 为所有的 阿加西 请求 统一 配置 complete 事件函数
    ajaxOpt.complete = function (res) {
        console.log();
        // 判断 返回的数据 是否 在告诉 我们 没有登录
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            // 没有登录  则 
            // 显示 需要重新登录的消息
            layer.msg(res.responseJSON.message), {
                icon: 1,
                time: 1500 // 2秒关闭
            }, function () {
                // 清空 token
                localStorage.removeItem('token');
                // 跳转到 login.html
                location.href = "/login.html";
            }
        }
    }
});