// $(function () {
//     var form = layui.form;
//     var layer = layui.layer;
//     form.verify({
//         pwd: [
//             /^[\S]{6,12}$/
//             , '密码必须6到12位，且不能出现空格'
//         ],
//         newPwd: function (val) {
//             if (val === $('[name=oldpwd]').val()) {
//                 return '新旧密码不能一样'
//             }
//         },
//         truepwd: function (val) {
//             if (val !== $('[name=newpwd]').val()) {
//                 return '两次密码不一致'
//             }
//         }
//     })
//     $('.layui-form').on('submit', function (e) {
//         console.log(11);
//         e.preventDefault()
//         $.ajax({
//             type: 'POST',
//             url: '/my/updatepwd',
//             dataType: "jsonp",
//             data: $(this).serialize(),
//             success: function (res) {
//                 if (res.status !== 0) {
//                     console.log(res);
//                     return layer.msg('更新密码失败！')
//                 }
//                 layer.msg('更新密码成功！')
//                 // 重置表单
//                 $('.layui-form')[0].reset()
//             }
//         })
//     })
// })
$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        newPwd: function (val) {
            if (val === $('[name=oldpwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        truepwd: function (val) {
            if (val !== $('[name=newpwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改密码失败！')
                }
                layer.msg('修改密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})