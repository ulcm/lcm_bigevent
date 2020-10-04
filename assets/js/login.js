(function () {
    $('#btn-reg').on('click', function () {
        $('.login').hide();
        $('.reg').show();
    })
    $('#btn-login').on('click', function () {
        $('.login').show();
        $('.reg').hide();
    })


    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义一个叫passwd的 密码验证
        passwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //验证两次密码是否相同
        trpasswd: function (val) {
            //获取两个文本框的内容进行比较
            var pd = $('.reg [name=password]').val()
            if (pd !== val) {
                return '两次密码不一致'
            }
        }
    })

    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var iptval = {
            username: $('#form_reg [name=usname]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',
            iptval, function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');
                $('#btn-login').click();
            })
    })
    $('#form_login').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: '/api/login',
            type: 'POST',
            //快速获取表单中的数据
            data: {
                username: $('#form_login [name=usname]').val(),
                password: $('#form_login [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})()
