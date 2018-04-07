/**
 * Created by Administrator on 2018/4/6.
 */



// 配置禁用小圆环
NProgress.configure({ showSpinner: false });


// 给每一个ajax请求开始 开启进度条
$(document).ajaxStart(function () {
   NProgress.start();
})

// 给每一个ajax请求结束 开启进度条
$(document).ajaxStop(function () {
  setTimeout(function(){
    NProgress.done();
  },500)
});

//
////开启进度条
//NProgress.start();
////关闭进度条
//setTimeout(function(){
//  NProgress.done();
//},1000)


//   ajax请求  拦截到登陆页面的功能
//  console.log(location.href.indexOf("login.html"));
if( location.href.indexOf("login.html")== -1 ){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    datatype:"json",
    success:function( info ){
      console.log(info);
      if(info.error === 400 ){
        location.href="login.html"
      }
    }
  })
}

// 页面内容模块的js代码
$(function(){
//   1. 二级菜单的显示和隐藏

$(".category").on("click",function(){
  // 阻止动画的序列排队 出现bug
  $(".child").stop().slideToggle(500);

})
  //console.log($('.nav li'));
  $('.nav li:even ').on("click",function(){
    //console.log($(this));
    // 让当前点击元素的兄弟的后代a 移除类
    $(this).siblings().children().removeClass("current");
    // 让当前点击的后代添加类
    $(this).children().toggleClass("current");
})

  //console.log($('.nav li:even'));
  $('.child').children().on("click",function(){
    //console.log(123);
    $(this).siblings().removeClass("current");
    $(this).toggleClass("current");
  });

  //点击左侧菜单按钮 让左侧的导航显示和隐藏
$(".main_menu").on("click",function(){
  //console.log(123);
  $(".lt_aside").toggleClass("hidemenu") ;
  $(".main_header").toggleClass("hidemenu") ;
  $(".container-fluid").toggleClass("hidemenu") ;
})


//   点击右侧的推出按钮 弹出模态框 并且需要动态请求ajax 推出按钮的功能
  $(".main_logout").on("click",function(){
    $('#logoutModal').modal("show");
  });


//  由于取消按钮和× 都有一个属性data-dismiss="modal" 可以自动退出

//  给退出注册事件 点击请求ajax
  $("#logoutBtn").on("click",function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      datetype:"json",
      success:function( info ){
        console.log(info);
        if( info.success ){
          location.href = "login.html";
        }
      }
    })
  })



});
