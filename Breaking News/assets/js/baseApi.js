//不管发起$.ajax、$.get还是$.post
//都会先调用$.ajaxPrefilter这个函数
$.ajaxPrefilter(function (option){
    //拼接路径
    option.url = 'http://www.liulongbin.top:3007' + option.url
    // console.log(option.url);
})