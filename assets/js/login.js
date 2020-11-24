$(function () {
    //1. 去注册连接
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 去登录 连接
    $('#link-login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();

    })

    //2. 为layui 添加 登录校验规则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码须6-12位 不能出现空格'
        ],
        // 效验两次密码 是否一致规则
        repwd: function (value) {
            // 1. 获取 密码框密码
            let pwd1 = $('.reg-box [name=password]').val()
            // 比较两个密码是否相同
            if (pwd1 != value) return '两次密码不相同';
        },

    });

    // 注册表单 提交事件
    $('#regForm').on('submit', submitData);
    // 监听注册表单的提交事件 (登录)
    $('#form_login').on('submit', function (e) {
        //阻止 默认提交
        e.preventDefault();
        // 获取表单数据
        let dataStr = $(this).serialize()
        // 异步请求
        console.log(dataStr);
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: dataStr,
            success(res) {
                //登录失败
                if (res.status != 0) return layui.layer.msg(res.message);
                // 登录成功
                layui.layer.msg(res.message, {
                    icon: 6,
                    time: 1500 // 1.5秒之后 关闭
                }, function () {
                    localStorage.setItem('token', res.token);
                    location.href = 'index.html';
                });
            }
        });
    })
})


// 1 注册函数 
function submitData(e) {
    e.preventDefault() // 阻止默认提交行为
    let datastr = $(this).serialize();
    console.log(datastr);
    $.ajax({
        url: '/api/reguser',
        method: 'post',
        data: datastr,
        success(res) {
            // 不论 成功否 都显示 消息
            layui.layer.msg(res.message);
            // 注册出错
            if (res.status != 0) return;
            // // 将用户名 密码自动填充到 登录表单中
            let uname = $('.reg-box [name-username]').val().trim();
            $('.login-box [name=username]').val(uname);

            let upwd = $('.reg-box [name-password]').val().trim();
            $('.login-box [name=password]').val(upwd);

            // 注册成功
            // 清空 注册表单
            $('#regForm')[0].reset();
            // 切换到登录页面
            $('#link_login').click();
        }
    })
}



