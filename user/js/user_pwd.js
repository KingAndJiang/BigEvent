$(function () {
    // 添加表单验证
    layui.form.verify({
        // 密码 规则
        pwd: [/^\S{6,12}$/, '密码必须在 6-12位之间'],
        //1.2 新旧密码不能 一样规则
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能一样哦'
            }
        },
        //1.3 确认密码 必须和前面的一样
        confirmpwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致哦'
            }
        }
    });
    //  为表单 添加 提交事件
    $('.layui-form').on('submit', changePwd)




})

function changePwd(e) {
    e.preventDefault();
    //a 提交数据 到接口 完成更新密码
    $.ajax({
        url: '/my/updatepwd',
        method: 'post',
        data: $(this).serialize(),
        success(res) {
            // 如果不成功 则 退出函数
            if (res.status != 0) return layui.layer.msg(res.message);
            //  如果成功  则 清空 token 并跳转到 login
            layui.layer.msg(res.message, {
                icon: 1,
                time: 1500,
            }, function () {
                localStorage.removeItem('token');
                window.top.location = '/login.html';
            })
        }
    })
}

