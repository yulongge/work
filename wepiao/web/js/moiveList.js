
$(document).ready(function(){
    
    //列表切换
    $(".wepiaoContainer .wepiao_main .wepiao_main_moivelist .movelistCon .movelist_title .tabplay").unbind("click").click(function(e){
        e.stopPropagation();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        
    });

    

    $(".movelist_cardOrList .cardOrListOp a").unbind("click").click(function(){
    	if($(this).hasClass("card")){
    		$(".wepiaoContainer .wepiao_moiveListCon .wepiao_main_moivelist").removeClass("showListCon");
    	}
    	if($(this).hasClass("list")){
    		$(".wepiaoContainer .wepiao_moiveListCon .wepiao_main_moivelist").addClass("showListCon");
    	}
    });

   
});
var totalheight = 0; 
 
function loadData()
{ 
    totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
 
    if ($(document).height() <= totalheight+100) 
    { 
        //加载数据
        $(".wepiaoContainer .wepiao_main .loadmore").show();
    } 
} 
 
$(window).scroll( function() { 
  
    loadData();
}); 

