$(function (){
    getUserInfo();
    /*导出layer，是不是一定要导出？？？*/
    let layer = layui.layer;
    /*退出功能*/
    $("#btnLogout").on('click', function (){
        //退出提示
        layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            //1、清空本地存储中的token
            localStorage.removeItem('token');
            //2、退回到登录页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        method:'GET',
        success:function (res){
            if(res.status !== 0){
                return layui.layer.msg("获取信息失败！");
            }
            renderAvatar(res.data);
        },
        /*无论请求成功还是失败都会调取complete函数*/
    })
}
//渲染用户头像
function renderAvatar(user){
    //1、获取用户的名称
    let name = user.nickname || user.username;
    //2、设置欢迎的文本
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
    //3、按需渲染用户的头像
    if(user.user_pic !== null){
        $(".layui-nav-img").attr('src',user.user_pic).show();
        $('.text-avater').hide();
    }else {
        $(".layui-nav-img").hide();
        /*获取名字中的第一个字符,转化为大写*/
        let first = name[0].toUpperCase();
        $('.text-avater').html(first).show();
    }
}