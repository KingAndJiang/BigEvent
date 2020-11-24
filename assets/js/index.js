$(function () {
    // 调用getUserInfo
    getUserInfo()
    $('#btnLogout').on('click', logout)
})
// 加载 用户信息的函数----
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        // headers: {

        // },
        success(res) {
            if (res.status != 0) return layui.layer.msg(res.message);
            // 渲染 用户信息头像
            console.log(res);
            renderAvatar(res.data);
        }
    })
}

//2. 渲染 用户信息 函数
function renderAvatar(userData) {
    // 2.1 先获取 用户昵称
    let userName = userData.nickname || userData.username;
    // 2.2 设置给 welcome span 标签
    $('#welcome').html(userName);
    //  2.3 渲染 头像
    if (userData.user_pic != null) {
        $('.layui-nav-img').attr('src', userData.user_pic).show();
        // 隐藏文字头像
        $('.text-avatar').hide();
    } else {
        //  没有图片头像 使用文本头像
        $('.layui-nav-img').hide();// 隐藏 图片头像
        let firstChar = userName[0].toUpperCase();
        $('.text-avatar').text(firstChar).show();
    }
}
// 退出 按钮 函数
function logout() {
    // 弹出 确认框 
    layui.layer.confirm('你确定要退出吗？', {
        icon: 3, title: '系统提示'
    }, function (index) {
        // 删除 logcalStorage 中的 token 值
        localStorage.removeItem('token');
        // 跳转到 登录页面
        location.href = "/login.html";
        layer.close(index);
    })
}