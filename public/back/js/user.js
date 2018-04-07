/**
 * Created by Administrator on 2018/4/7.
 */


$(function(){


  var currentPage = 1;

  var pageSize = 5;

  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
          page:currentPage,
          pageSize:pageSize
      },
      success:function( info ){
        console.log( info );
        $(".lt_content tbody").html(template("table_tmp",info));
        // 因为需要请求回来的 数据 所以 初始化在 ajax请求的回调函数内部
        //   分页插件的使用

          $('#paginator').bootstrapPaginator({
          //   指定版本
            bootstrapMajorVersion: 3,
          //  当前页码 和 总页数
          currentPage:info.page,
          totalPages: Math.ceil( info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page,
              render();
          }
        })
      }
    })

  }

//   给按钮添加点击事件(通过事件委托) 弹出模态框
$(".lt_content tbody").on("click",".btn",function(){
  //console.log(123); ok
  // $("xxModal").madal();插件自带操作模态框的方法
  $("#userModal").modal("show");

//  给确定按钮添加点击事件
  // 1. 修改状态栏的状态
  // 2. 修改切换btn
  // 3. 模态框消失

//   获取用户id 根据id 进行修改
  var id = $(this).parent().data("id");
  console.log(id);
  // 当前是1 代表状态显示正常 按钮显示禁用 当前是0 代表状态禁用 按钮显示启用
  // 所以点击去相反的 有这个类当前就是0 取为1
  var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
  console.log(isDelete);
//  再点击事件内部绑定点击事件 会让事件多次重复绑定 影响性能
//  解决方法: 1. 定义全局变量id 这样代码可以写出去 2. 注册事件之前off("事件名称")解绑事件
  $("#userBtn").off("click").on("click",function(){
    // 1. 修改状态栏的状态

    $.ajax({
        type:"post",
        url:"/user/updateUser",
        datatype:"json",
        data:{
          id:id,
          isDelete:isDelete
        },
      success:function( info ){
        //console.log( info ); ==> {success: true}
        if( info.success ){
        //    关闭模态框 重新渲染
          $("#userModal").modal("hide");
          render();
        }
      }
    })
  })
})


});