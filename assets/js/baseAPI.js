// 为页面所有基地址 jq的 ajax 对象 发送请求之前 对参数 对象做处理
$.ajaxPrefilter(function (ajaxOpt) {
    ajaxOpt.url = 'http://ajax.frontend.itheima.net' + ajaxOpt.url;
})