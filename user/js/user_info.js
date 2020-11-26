$(function () {
    //为layui 添加 校验规则
    layui.form.verify({
        nickname: ['/^\S{6,12}$/', '昵称必须在6-12个字符']
    })
    // 1.加载用户 基本信息
    initUserInfo()

    // 2.-重置按钮
    $('#btnReset').on('click', function () {
        initUserInfo();
    })

    // 表单 提交事件
    $('.layui-form').on('submit', submitData)
})

// 加载用户基本信息
function initUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success(res) {
            // 错误判断
            if (res.status != 0) return layui.layer.msg(res.message);
            // 将数据 装入 同名的 表单元素 中
            layui.form.val('userForm', res.data);
        }
    })
}

// 表单提交数据
function submitData(e) {
    e.preventDefault();
    $.ajax({
        url: '/my/userinfo',
        method: 'post',
        data: $(this).serialize(),
        success(res) {
            // 不管成功与否都显示 消息
            layui.layer.msg(res.message);
            // 如果出错   停止函数执行
            if (res.status != 0) return;

            // 如果 没有出错 通过window.parent 或者 window.top  调用父页面的放啊
            window.parent.getUserInfo()
        }
    })
}