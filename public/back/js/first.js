/**
 * Created by zxf on 2018/4/7.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      datatype:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function( info ){
        console.log(info);
        $(".lt_content tbody").html(template("first_tmp",info))

      //   分页插件初始化
        $("#paginator").bootstrapPaginator({
        //  指定版本 总页数 当期也 三个参数
          bootstrapMajorVersion : 3,
          totalPages : Math.ceil( info.total/info.size),
          currentPage : currentPage,
          // 当点击页按钮时 赋值刷新当前页 重新渲染
          onPageClicked: function(a,b,c,page){
              currentPage = page;
              render();
          }


        })
      }
    })
  }



//   2.点击添加按钮 显示模态框
  $("#addBtn").on("click",function(){
    $("#firstModal").modal("show");
  })
  //  1. 进行表单验证

  //  2. 再进行ajax请求验证

  //  3. 在ajax回调函数内部写添加的事件
  //初始化表单校验$form.bootstrapValidator({ feedbackIcons:{}, fields:{} })
  $("#form").bootstrapValidator({
    //字体图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      // 验证规则
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级菜单分类名称"
          }
        }
      }
    }
  })

// 2. 再进行ajax请求验证 给表单注册一个验证成功的事件
  $("#form").on("success.form.bv",function( e ){
    // 使用form 关联的 button 的 [ type = "submit" ] 也不会提交 阻制可有可无!!
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      datatype:"json",
      data:$("#form").serialize(),
      success:function( info ){
        //console.log( info ); {success: true}
        if( info.success){
        //  刷新页面 重新渲染 关闭模态框
          currentPage = 1;
            render();
            $("#firstModal").modal("hide");
      //    重置表单的内容
          $("#form").data("bootstrapValidator").resetForm(true);
      }
      }
    })
  })
  //var id = window.localStorage.getItem("categoryid")
  //console.log(id);
});