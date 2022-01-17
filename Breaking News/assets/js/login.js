$(function (){
    /*切换到注册页面*/
    $("#link_reg").on("click", function (){
        $(".login-box").hide();
        $(".reg-box").show();
    })
    /*切换到登录页面*/
    $("#link_login").on("click", function (){
        $(".login-box").show();
        $(".reg-box").hide();
    })
    /*从layui中获取form对象*/
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        /*自定义一个PWD的规则*/
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd:function (value){
            /*判断两次密码是否一致*/
            let pwd =  $('.reg-box [name=password]').val();
            if(pwd !== value){
                return "两次密码不一致"
            }
        }
    })
    /*监听注册表单的提交事件*/
    $("#form_reg").on("submit", function (e){
        /*阻止默认事件的触发*/
        e.preventDefault();
        /*发起post请求*/
        let data = {username:$("#form_reg [name=username]").val(), password:$("#form_reg [name=password]").val()}
        $.ajax({
            url:'/api/reguser',
            method: 'POST',
            data:$(this).serialize(),
            success:function (res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');
                $("#link_login").click();
            }
        })
        /*$.post('http://www.liulongbin.top:3007/api/reguser', data
            ,
            function (res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');
                $("#link_login").click();
            })*/
    })
    /*监听登录表单的提交事假*/
    $('#form_login').on("submit", function (e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            /*快速获取表单中的数据*/
            data:$(this).serialize(),
            success:function (res){
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                console.log(res.token);
                //将登录成功得到的token保存到localStorage
                localStorage.setItem('token', res.token);
                //跳转到主页
                location.href = "/index.html"
            }
        })
    })

})