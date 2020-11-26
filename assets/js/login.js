$(function () {
    // 去注册 按钮 点击事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 登录页面点击事件
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // layui 中获取 form 对象
    layui.form.verify({
        // 通过 form.verify=() 函数自定义 效验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6-12  且不能有空格',
        ],
        // 效验 两次密码 框中的密码 是否一致
        repwd: function (value) {
            let pwd1 = $('.reg-box [name=password]').val();
            if (pwd1 != value) return '两次密码不一致';
        }
    });


    // 注册表单 提交 事件
    $('#regForm').on('submit', submitData)

    // 登录表单提交事件
    $('#formLogin').on('submit', function (e) {
        e.preventDefault();
        let dataStr = $(this).serialize();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: dataStr,
            success(res) {
                // 登录失败
                if (res.status !== 0) return layui.layer.msg(res.message);
                // 登录成功
                layer.msg(res.message, {
                    icon: 6,
                    time: 1500, // 1.5秒关闭  (如果不配置 默认是3秒) 
                }, function () {
                    // 保存token 值到localstorage
                    localStorage.setItem('token', res.token);
                    // 跳转到 index.html
                    location.href = '/index.html';
                });

            }
        })
    })

})



// 注册 函数
function submitData(e) {
    e.preventDefault(); // 阻止表单默认提交行为
    let dataStr = $(this).serialize();
    // 发送异步请求
    $.ajax({
        url: '/api/reguser',
        method: 'post',
        data: dataStr,
        success(res) {
            // 注册失败 
            layui.layer.msg(res.message);
            if (res.status != 0) return;

            // 注册成功 把注册好的用户名 和密码 拿给登录页面
            let uname = $('.reg-box [name=username]').val().trim();
            $('.login-box [name=username]').val(uname);

            let upwd = $('.reg-box [name=password]').val().trim();
            $('.login-box [name=password]').val(upwd);

            // 清空 表单注册表 
            $('#regForm')[0].reset();
            // 自动跳转到登录页面;
            $('#link_login').click();

        }
    })
}