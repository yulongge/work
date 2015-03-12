$(document).ready(function(){

	//Login.showShade();
	
    
	$(".sign .input_con input").focus(function(){
		Login.inputFoucsEvent(this);
	}).blur(function(){
		Login.inputBlurEvent(this,"left");
	});;
	

	//我要注册
	$(".sign .toSign").unbind("click").click(function(){
		var url="";
		var params = {};
		params.phoneNum= $(this).parent().find(".input_phoneNum input").val();
		params.password = $(this).parent().find(".password input").val();
		params.checkCode = $(this).parent().find(".input_checkCode_sendMsg input").val();
		Login.subForm(url,params,$(this).parent(),"left");
	});
	//登录
	$(".sign_login .sign_loginBtn").unbind("click").click(function(e){
		e.stopPropagation();
		$(".sign").hide();
		Login.loginEvents("form_phone");
		//$("body").find(">div:not(.login)").addClass("blur");
	});
	$("body").click(function(){
		$(".sign").show();
		//$(".login").children().remove();
		$(".login").hide();
	});

	$(".logo_sign a").unbind("click").click(function(e){
		e.stopPropagation();
		$(".sign").show();
		//$(".login").children().remove();
		$(".login").hide();
	});

});

