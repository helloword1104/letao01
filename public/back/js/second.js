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
      url:'/category/querySecondCategoryPaging',
      datatype:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function( info ){
        console.log(info);
        $(".lt_content tbody").html( template("second_tmp",info));
      //  进行分页初始化
        $("#paginator").bootstrapPaginator({
        //  指定 版本 当前页 总页数
          bootstrapMajorVersion :3,
          // 当前页是返回值的page属性值
          currentPage:info.page,
          // totalPages 注意不能少s
          totalPages:Math.ceil( info.total/info.size),
          // 插件提供的函数 点击页面 传参page 为当前页 并且重新渲染页面
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }

        })
      }
    })
  }

//  2.添加二级分类的模态框
//  分析:1.点击添加分类按钮 显示模态框
  $("#addBtn").on("click",function(){
    $("#addModal").modal("show");
  //  请求ajax 渲染一级菜单下拉框
    $.ajax({
      type:'get',
      url:"/category/queryTopCategoryPaging",
      datatype:"json",
      data:{
        page:1,
        pageSize:100
      },
      success:function( info ){
        //console.log(info);
        $(".dropdown-menu").html(template("drap_tmp",info))
      }
    })

  })


//  3.通过委托事件给a注册点击事件
//   分析 :点击每一个a 需要获取id 但是又不能自己提交数据给后台  需要借助
  //隐藏域的input标签  所以就要将获取的id 赋值给隐藏域的input中的name属性
  $(".dropdown-menu").on("click","a",function(){
  //   这是让点击的当前的值变成显示在框中值
    $("#dropdownText").text($(this).text());
  //  获取id  交给隐藏域
    var id = $(this).data("id");
    console.log(id);
    $('[name="categoryId"]').val( id );
    // 将校验状态设置为成功状态
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");

  })

// 4.0 上传图片
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      // 获取 图片地址
      var picAddr = data.result.picAddr;
      //将图片地址给img显示
      $("#imgBox img").attr("src",picAddr);
      // 将地址给input隐藏域 上传
      $('[name="brandLogo"]').val( picAddr );
      // 设置整个表单校验为成功状态
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
    }
  });
  // 5. 配置表单校验
  $('#form').bootstrapValidator({

    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 校验的字段
    fields: {
      // 品牌名称
      categoryName: {
        //校验规则
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      // 一级分类的id
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      // 图片的地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });


//  6. 校验成功之后...通过ajax请求 上传数据
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    console.log($("#form").serialize());
    $.ajax({
      type:'post',
      url: "/category/addSecondCategory",
      datatype:"json",
      data: $("#form").serialize(),
      success:function( info ){
        //console.log(info);  {success: true}
        if ( info.success ){
        //  1.关闭模态框
          $("#addModal").modal("hide")
        //   重置文本和字体图标
          $("#form").data("bootstrapValidator").resetForm( true );
          // 重新渲染第一页
          currentPage = 1;
          render();
        //  重置一级菜单文本 和img 图片的none.jpg
          $("#dropdownText").text("请选择一级分类");
          $("#imgBox img").attr("src","images/none.png")
        }
      }
    })
  })

});