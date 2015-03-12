$(document).ready(function(){
	//Login.showShade();
	$(".login_btn").unbind("click").click(function(){
		Login.showShade();
		Login.loginEvents("form_phone");
		$("body").find(">div:not(.login)").addClass("blur");		
	});

	
	
});

