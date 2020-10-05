$(function () {
    getuser();
    var layer = layui.layer;

})
$('#btnout').on('click', function () {
    layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' },
        function (index) {
            localStorage.removeItem('token');
            location.href = '/login.html';

            layer.close(index);
        })
})
function getuser() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            usexuan(res.data);
        },
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {

        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function usexuan(use) {
    console.log(use);
    var name = use.nickname || use.username
    $('.wel').html('欢迎&nbsp;&nbsp;' + name)
    if (use.user_pic !== null) {
        $('.layui-nav-img').attr('src', use.user_pic).show();
        $('.text-img').hide();
    } else {
        $('.layui-nav-img').hide();
        var one = name[0].toUpperCase();
        $('.text-img').html(one).show()
    }
}