//不管发起$.ajax、$.get还是$.post
//都会先调用$.ajaxPrefilter这个函数
$.ajaxPrefilter(function (option){
    //拼接路径
    option.url = 'http://www.liulongbin.top:3007' + option.url
    //统一为有权限的接口配置header对象
    if(option.url.indexOf('/my/')!== -1){
        option.headers = {
            Authorization:localStorage.getItem('token')||''
        }
    }

    option.complete = function (res){
        // console.log(res);
        //res中有responseJSON: {status: 1, message: '身份认证失败！'}
        if(res.responseJSON.status ===1 && res.responseJSON.
            message === '身份认证失败！'){
            /*1、清空token*/
            localStorage.removeItem('token');
            /*2、跳转到登录页面*/
            location.href = '/login.html'
        }
    }

})