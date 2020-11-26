$(function () {
    initCropper();
    // 为上传按钮  添加绑定事件
    $('#btnUlopd').on('click', function () {
        $('#file').click();
    })

    //  文件 选择 框 绑定 change 事件 获取 选中 文件信息
    $('#file').on('change', fileChange);


    //  为确认 按钮 绑定 点击事件
    $('#btnOk').on('click', upload);

})

// 1.1 获取裁剪区域的 DOM 元素
let $image = null;
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1 初始化 裁剪插件
function initCropper() {
    // 1.2 获取裁剪区 dom 元素
    $image = $('#image')
    // 1.3 创建裁剪区域
    $image.cropper(options)
}


//1. 拿到用户选择的文件
// 选中文件 -------------
function fileChange(e) {
    // 1.获取选中文件信息数组
    let fileList = e.target.files;
    if (fileList.length == 0) return layui.layer.msg('请选择文件');
    var file = e.target.files[0]

    //2. 根据选择的文件，创建一个对应的 URL 地址：
    var newImgURL = URL.createObjectURL(file)

    // 3. 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
    console.log('-------------------------');
    console.log(fileList);
}

function upload() {
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    console.log(dataURL);
    //  提交数据 到服务器接口
    $.ajax({
        url: '/my/update/avatar',
        method: 'post',
        data: {
            avatar: dataURL,
        },
        success(res) {
            // 如果失败 则退出 函数
            if (res.status !== 0) return;
            // 如果成功 则调用 父页面的方法 重新 渲染 用户信息
            window.top.getUserInfo();
        }
    })
}