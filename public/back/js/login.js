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
          }
        }
      }

    }
  })
});