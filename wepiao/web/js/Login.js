/*
    一些公用的变量值设置和常用函数
*/
var Login = {

    /**
        遮罩层
    */
    showShade:function(){
        var _this = this;
        var shadeTemplate = "<div class=\"bg_shade\"><\/div>";
        $("body").append(shadeTemplate);
        $(shadeTemplate).show();
        $("body").addClass("bodyCon");
        $(".bg_shade").click(function(){
            _this.hideShade();

        });
    },
    hideShade:function(){
        $(".bg_shade").remove();
        $(".login").hide();
        $("body").find(">div:not(.login)").removeClass("blur");
    },

     /*
        文本框获取焦点事件
    */
    inputFoucsEvent:function(element){
        var defaultVal = element.defaultValue;
        var $element = $(element);
        if($element.parent().hasClass("password")){
            //$element.attr("type","password");
            $element[0].type = 'password';
        }
        if($element.val() == defaultVal){
            $element.val("");
            
        }else{
            if($element.hasClass("error")){
                $element.removeClass("error");
                $element.val("");
               
                return;
            }
            $element.select();
        }
    },
     /*
        文本框失去焦点事件
    */
    inputBlurEvent:function(element,pos){
        var defaultVal = element.defaultValue;
        var $element = $(element);
        
        if($element.val() == ""||$element.val()==null){
            $element.val(defaultVal);
            //$element.attr("type","text");
            $element[0].type = 'text';
            return;
        }
        if($element.parent().hasClass("input_phoneNum")){
            //:not(.input_weipiaoPws)
            if(!$element.hasClass("send")){
                if(this.checkPhoneNub($element,pos)){
                    var parentObj = $element.parent().parent();
                    parentObj.find(".input_checkCode").hide();
                    parentObj.find(".input_checkCode_sendMsg").show();
                    var showTime = parentObj.find(".input_checkCode_sendMsg").find(".show_time");
                    

                    if(!$element.parent().hasClass("input_weipiaoPws")){
                        if(!$element.hasClass("send")){
                            showTime.text(60);
                            showTime.next().text("秒后重新发送");
                            this.countDown(showTime,$element);
                            this.sendPhoneNum($element);
                            
                        }
                    }                       
                    
                }
            }                       
            
        }
        if($element.parent().hasClass("password")){
            
            if(!this.checkPassword($element,pos)){
                $(this).focus();
            }
        }
        
    },
     /*
        用手机号登录
    */
    usePhoneToLogin:function(){
        
    },
    prevLoginForm:null,//前一个login表单
    leftErrorTipTemplate:"<div class=\"errorTip\">\<div class=\"errorIcon\"><\/div><div class=\"errorTipwords\"><span><\/span><\/div><\/div>",
    leftOkTipTemplate:"<div class=\"errorTip\">\<div class=\"okIcon\"><\/div></div>",
     /*
        倒计时
    */
    countDown:function($element,$inputNum){//倒计时
        var _this = this;
        var startTime = 60;
        $inputNum.addClass("send");
        var timer = setInterval(function(){
            if(startTime > 0){
                startTime = startTime - 1; 
                $element.text(startTime);             
            }else{
                clearInterval(timer);
                //_this.countDown($element);
                $element.text("");
                $element.next().html("<a href=\"javascript:void(0);\" class=\"checkCodeHref\">获取验证码</a>");
                $inputNum.removeClass("send");
                $element.next().click(function(){
                    $element.text(60);
                    _this.countDown($element,$inputNum);
                    $(this).text("秒后重新发送");
                    _this.sendPhoneNum($element);
                });
            }
        },1000);
    },
     /*
        重置表单
    */
    resetForm:function($form){//重置表单
        $form.find(".input_con input").each(function(i,v){
            $(v).val(v.defaultValue);
        });
        $form.find(".input_con").show();
        $form.find(".input_checkCode_sendMsg").hide();
    },
     /*
        提交表单，请求后台
    */
    subForm:function(url,params,formObj,pos){//提交表单
        
        if(this.checkForm(formObj,pos)){
            console.log("提交表单");
            $.ajax({
                type:"POST",
                url:url,
                data:params,
                success:function(data){//data={ret:"0",msg:""}
                    
                    if(formObj.hasClass("form_weipiao")){
                        if(data.ret == 0){
                            //window.location.href="";
                        }
                        if(data.ret == 1){
                            formObj.find(".input_phoneNum").find("input").value(data.msg).addClass("error");
                        }
                        if(data.ret == 2){
                            $(".form_msg span").text(data.msg);
                        }
                        
                    }
                    else if(formObj.hasClass("form_phone")){
                        if(data.ret == 0){
                            //window.location.href="";
                        }
                        if(data.ret == 2){
                            formObj.find(".input_checkCode_sendMsg").find("input").value(data.msg).addClass("error");
                        }
                        if(data.ret == 1){
                            $(".form_msg span").text(data.msg);
                        }
                    }
                    else if(formObj.hasClass("form_sign")){

                    }
                    else if(formObj.hasClass("form_signBig")){

                    }
                    else if(formObj.hasClass("form_getPsw")){

                    }

                },
                error:function(){
                    console.log("error");
                }
            }); 
        }
       
    },
     /*
        验证表单
    */
    checkForm:function(formObj,pos){
        var _this = this;
        var $formObj = $(formObj);
        var flag = true;
        $formObj.find(".input_con:visible input").each(function(i,v){
            //$(".errorTip").remove();
            if($(v).hasClass("error")){
                flag = false;
                return false;
            }
            if($(v).val() == ""||$(v).val() == v.defaultValue || $(v).val()==null){
                
                if(pos==undefined){
                    $(v).val("不能为空").addClass("error");

                }else{
                    if(pos == "left"){
                        $(v).after(_this.leftErrorTipTemplate);
                        $(".errorTip .errorTipwords span").text("不能为空！");
                    }
                }
                flag =  false;
                return false
            }else{
                /*if($(v).parent().hasClass("password")){
                    flag =  _this.checkPassword($(v),pos); 
                    if(!flag)return false;  
                }
                return;*/
                if($(v).parent().hasClass("input_phoneNum")){
                    flag =  _this.checkPhoneNub($(v),pos);
                    if(!flag)return false;  
                }else if($(v).parent().hasClass("password")){
                    flag =  _this.checkPassword($(v),pos);
                    if(!flag)return false;  
                    
                }else{}

            }


        });
        if(flag){$(".errorTip").remove();}
        return flag;
    },
     /*
        验证手机号是否正确
    */
    checkPhoneNub:function($obj,pos){
        var mobile = $obj.val();             
        if(mobile.length==0){
            if(pos==undefined){
                $obj.val("请输入手机号码！").addClass("error");
            }else{
                if(pos == "left"){
                    $obj.next().remove();
                    $obj.after(this.leftErrorTipTemplate);
                    $(".errorTip .errorTipwords span").text("请输入手机号码");
                }
            }
           
           return false;
        }    
        if(mobile.length!=11){   
            if(pos==undefined){
                $obj.val("请输入有效的手机号码！").addClass("error");
            }else{
                if(pos == "left"){
                    $obj.next().remove();
                    $obj.after(this.leftErrorTipTemplate);
                    $(".errorTip .errorTipwords span").text("请输入正确的手机号");
                }
            }
            return false;
        }
        var myreg = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
        if(!myreg.test(mobile)){          
            if(pos==undefined){
                $obj.val("请输入有效的手机号码！").addClass("error");
            }else{
                if(pos == "left"){
                    $obj.next().remove();
                    $obj.after(this.leftErrorTipTemplate);
                    $(".errorTip .errorTipwords span").text("请输入正确的手机号码");
                }
            }
            return false;
        }
        
        //$(".errorTip").remove();
        $obj.next().remove();
        $obj.after(this.leftOkTipTemplate);
        return true;
    
    },
     /*
        密码验证
    */
    checkPassword:function($obj,pos){
        console.log("检测密码");
        var mobile = $obj.val(); 
        //$obj.attr("type","text"); 
        $obj[0].type = 'text';           
        if(mobile.length==0){
            if(pos==undefined){
                $obj.val("请输入密码").addClass("error");
            }else{
                if(pos == "left"){
                    $obj.next().remove();
                    $obj.after(this.leftErrorTipTemplate);
                    //$obj.attr("type","password");
                    $obj[0].type = 'password';
                    $(".errorTip .errorTipwords span").text("请输入密码！");
                }
            }
           
           return false;
        }    
        if(mobile.length<6||mobile.length>20){   
            if(pos==undefined){
                $obj.val("请输入6-20位密码！").addClass("error");
            }else{
                if(pos == "left"){
                    $obj.next().remove();
                    $obj.after(this.leftErrorTipTemplate);
                    //$obj.attr("type","password");
                    $obj[0].type = 'password';
                    $(".errorTip .errorTipwords span").text("请输入6-20位密码");
                }
            }
            return false;
        }
        if($obj.parent().hasClass("confirmPsw")){
            if($obj.val() != $obj.parent().prev().find("input").val()){
               if(pos==undefined){
                    $obj.val("密码两次输入不一致").addClass("error");
                }else{
                    if(pos == "left"){
                        $obj.next().remove();
                        $obj.after(this.leftErrorTipTemplate);
                        //$obj.attr("type","password");
                        $obj[0].type = 'password';
                        $(".errorTip .errorTipwords span").text("密码两次输入不一致");
                    }
                }
                return false;

            }
        }
       
        $obj.next().remove();
        //$obj.attr("type","password");
        $obj.after(this.leftOkTipTemplate); 
        $obj[0].type = 'password';
        return true;
    },
    /*
        发送手机号码请求验证码
    */
    sendPhoneNum:function($element){
        var phoneNum = $element.val();
        var $obj = $element;
        if($obj.parent().parent().hasClass("form_signBig")||$obj.parent().parent().hasClass("form_sign")){
            console.log("请求手机号是否已注册");
            $.ajax({
                type:"POST",
                url:"",
                data:phoneNum,
                async:false,
                success:function(data){
                    if(data.ret == 0){
                        //window.location.href="";
                    }
                    if(data.ret == 101 || data.ret == 102){
                        if(pos==undefined){
                            $obj.val("手机号已注册").addClass("error");
                        }else{
                            if(pos == "left"){
                                $obj.after(this.leftErrorTipTemplate);
                                $(".errorTip .errorTipwords span").text("手机号已注册");
                            }
                        }
                        return false;
                    }
                   
                },
                error:function(){
                    console.log("error");
                    return false;
                }
            });
        }
        console.log("发送验证码");
        $.ajax({
                type:"POST",
                url:"",
                data:phoneNum,
                success:function(data){
                    if(data.ret == 0){
                        //window.location.href="";
                    }
                    if(data.ret == 101 || data.ret == 102){
                        $element.val(data.msg).addClass("error");
                    }
                   
                },
                error:function(){
                    console.log("error");
                }
        });
    },
    loginEvents:function(formClass){
        var _this = this;
            $(".login").show();           
            $(".login .login_form").hide();
            $("."+formClass).show();
            //登录窗口获取和失去焦点事件
            $(".login").click(function(e){
                e.stopPropagation();
            });
            $(".login .input_con input").focus(function(){
                _this.inputFoucsEvent(this);
            }).blur(function(){
                _this.inputBlurEvent(this);
            });
            $(".login .input_con .inputTip").click(function(){
                $(this).next().focus();
            });
            //用手机号登录事件
            $(".login .phone_login").click(function(){
                _this.resetForm($(".login_form"));
                $(".login_form").hide();
                $(".form_phone").show();
            });
            //用微票账号登录事件
            $(".login .weipiao_login").click(function(){
                _this.resetForm($(".login_form"));
                $(".login_form").hide();
                $(".form_weipiao").show();
            });

            //注册
            $(".login_logo .logo_sign a").click(function(){
                if($(this).parents(".signLoginCon").length>0){

                    return;
                }
                _this.resetForm($(".login_form"));

                var text = $(this).text();
                if(text=="取消"){
                    $(this).text("注册");
                    $(".login_form").hide();
                    _this.prevLoginForm.show();
                }else{
                    _this.prevLoginForm = $(".login_form:visible");
                    $(this).text("取消");
                    $(".login_form").hide();
                    $(".form_sign").show();
                }
                
            });

            //找回密码
            $(".help_option .forget_psw").click(function(){
               
            });

            //提交

            //微票登录提交
            $(".login .weipiao_sub").unbind("click").click(function(){
                var url="";
                var params = {};
                params.username = $(this).parent().find(".username input").val();
                params.password = $(this).parent().find(".password input").val();
                _this.subForm(url,params,$(this).parent());
            });

            //手机号登录提交
            $(".login .phone_sub").unbind("click").click(function(){
                var url="";
                var params = {};
                params.phoneNum= $(this).parent().find(".input_phoneNum input").val();
                params.checkCode = $(this).parent().find(".input_checkCode_sendMsg input").val();
                _this.subForm(url,params,$(this).parent());
            });

            //手机号注册提交
            $(".login .phoneSign_sub").unbind("click").click(function(){
                var url="";
                var params = {};
                params.phoneNum= $(this).parent().find(".input_phoneNum input").val();
                params.password = $(this).parent().find(".password input").val();
                params.checkCode = $(this).parent().find(".input_checkCode_sendMsg input").val();
                _this.subForm(url,params,$(this).parent());
            });

            //找回密码提交
            $(".login .forgetPsw_sub").unbind("click").click(function(){
                var url="";
                var params = {};
                params.phoneNum= $(this).parent().find(".input_phoneNum input").val();
                params.newpassword = $(this).parent().find(".newpassword input").val();
                params.confirmPsw = $(this).parent().find(".confirmPsw input").val();
                params.checkCode = $(this).parent().find(".input_checkCode_sendMsg input").val();
                _this.subForm(url,params,$(this).parent());
            });
           
    }




};
