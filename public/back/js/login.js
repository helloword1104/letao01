/**
 * Created by Administrator on 2018/4/6.
 */

$(function(){
  // 1. 进行表单校验
  //    校验要求: (1) 用户名不能为空
  //             (2) 密码不能为空, 且必须是 6-12 位

  // 进行表单验证的方法
  $("#form").bootstrapValidator({
    //图标的代码
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //验证表单信息的代码
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须为2~6位"
          },
          callback:{
            message:"用户名不存在"
          }

        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须为6~12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }

    }
  })

//   表单提交不能刷新页面 通过ajax请求 提交表单
  $("#form").on("success.form.bv",function( e ){
    //组织事件默认行为 组织表单提交
    e.preventDefault();
  //  通过ajax进行请求提交
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      datatype:"json",
      // 表单序列化  jquery自带的自动拼接表单数据的方法!
      data:$("#form").serialize(),
      success:function( info ){
        if( info.success ){
          //alert( "登录成功" )
        //  当用户名正确就挑取到index首页
          location.href = "index.html";
        }
        if( info.error === 1000 ) {
          //alert( "用户名错误" )
        //  表单验证插件提供了一个updateStatus更新字段状态
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
        }
        if( info.error === 1001 ){
          //alert( "密码错误" )
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID",
          "callback")
        }
        console.log($("[type=reset]"));



      }

    })
  })

   //点击重置按钮 让表单的文本和字体图标都重置  默认重置文本
  $("[ type = 'reset' ]").on("click",function(){
    //  利用$("#form").data("bootstrapValidator")实例的重置表单方法.resetForm();
    //  在bootstrapValidator中 可以加true 也可以不加
    console.log(123);
    $("#form").data("bootstrapValidator").resetForm();

  })

});