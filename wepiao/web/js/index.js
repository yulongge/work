function imgboxPlay(){
    		//图片集合
    		this.list = $(".imgbox").children();
    		this.indexs = [];
    		this.length = this.list.length;
    		//图片显示时间
    		this.timer = 10000;
    		var index = 0 ,self = this,pre = 0,handId,isPlay = false,isBtnClick = false;

    		//图片轮播
    		this.Play = function(){
    			isPlay = true;
    			index ++ ;
    			if(index == self.length){
    				index = 0;
    			}
    			//alert(index+"===="+pre+"====="+index);
    			self.list.eq(pre).fadeOut(5000,"linear",function(){});
                var info = self.list.eq(index).fadeIn(5000,"linear",function(){
                        isPlay = false;
                        if(isBtnClick){
                            handId = setInterval(self.Play,self.timer);
                            isBtnClick = false;
                        }

                });

                pre = index;
                
    		}
    		this.rPlay = function(){
    			isPlay = true;
    			index -- ;
    			if(index == -1){
    				index = self.length-1;
    			}
    			self.list.eq(pre).fadeOut(5000,"linear",function(){});
                var info = self.list.eq(index).fadeIn(5000,"linear",function(){
                        isPlay = false;
                        if(isBtnClick){
                            handId = setInterval(self.Play,self.timer);
                            isBtnClick = false;
                        }
                });
                pre = index;
    		}
    		//左右点击切换
    		this.BtnClick = function(){
    			var btns = $(".img_btn");
    			btns.each(function(i,v){
    				$(v).click(function(){
    					if(isPlay){return;}
		    			isBtnClick = true;
		    			clearInterval(handId);
		    			if($(v).hasClass("img_left_btn")){
		    				self.rPlay();
		    			}
		    			if($(v).hasClass("img_right_btn")){
		    				self.Play();
		    			}
    				});
    			});
    			
    		}

    		this.Start = function(){
    			handId = setInterval(self.Play,self.timer);
    			this.BtnClick();
    		}
    		this.Stop = function(){
    			clearInterval(handId);
    		}


}
$(document).ready(function(){
    //启动图片滚动
    var imgboxPlayer = new imgboxPlay();
    imgboxPlayer.Start();
	//(new imgboxPlay()).Start();
    $(".wepiaoContainer .wepiao_nav .imgbox").mouseenter(function(){
        imgboxPlayer.Stop();
    }).mouseleave(function(){
        imgboxPlayer.Start();
    });

    //获取屏幕分辨率
    var screenWidth = window.screen.width;
    if(screenWidth<1200){
        $(".wepiaoContainer").addClass("minWepiaoContainer");
    }else{
        $(".wepiaoContainer").removeClass("minWepiaoContainer");
    }

    //导航菜单
    $(".wepiaoContainer .header .menu .menuCon a").unbind("click").click(function(e){
        e.stopPropagation();
        $(this).parent().siblings().find("a").removeClass("active");
        $(this).addClass("active");
    });

    var timer = 0;
    $(".wepiaoContainer .header .menu .menuCon a").mouseenter(function(event) {
        var _this = this;
       

        clearTimeout(timer);
        timer = setTimeout(function(){
            var left = $(_this).parent().position().left;
            if($(_this).hasClass('active')){
                $(_this).css("color","#fff")
            }
            $(".wepiaoContainer .header .menu .menuCon .menuActive .item2").animate({
                height: 0},
                100, function() {
                        $(".wepiaoContainer .header .menu .menuCon .menuActive").animate({
                        left: left},200, function() {
                            $(".wepiaoContainer .header .menu .menuCon .menuActive .item2").animate({
                                height: 32},100, function() {
                                    if(!$(_this).hasClass('active')){
                                            $(".wepiaoContainer .header .menu .menuCon .active").css("color","#2ed2c1");   
                                    }
                            });
                    });
            });
        },300);
        
        
    }).mouseleave(function(event) {
       clearTimeout(timer);
    });;
    //列表切换
    $(".wepiaoContainer .wepiao_main .wepiao_main_moivelist .movelistCon .movelist_title .tabplay").unbind("click").click(function(e){
        e.stopPropagation();
        return;
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(".nowPlayList").hide();
        $(".futurePlayList").hide();
        if($(this).hasClass("nowPlay")){
            $(".nowPlayList").show();
        }
        if($(this).hasClass("futurePlay")){
            $(".futurePlayList").show();
        }
    });

    //显示区域选择
    $(".wepiaoContainer .header .menu .region .showRegion").unbind("click").click(function(e){
        e.stopPropagation();
        var _this = this;
        var regionChooseWindow = $(".regionChooseWindow");
        if(regionChooseWindow.is(":visible")){
            regionChooseWindow.hide();
        }else{
            regionChooseWindow.show();
            //点击城市
            regionChooseWindow.find(".tabBanner .main a").unbind("click").click(function(){
                var regionName = $(this).text();
                $(_this).find("span").eq(0).text(regionName);
                regionChooseWindow.hide();

            });
            //关闭窗口
            regionChooseWindow.find(".closeWin").unbind("click").click(function(){
                regionChooseWindow.hide();
            });
            //字母切换
            regionChooseWindow.find(".banner .tabBanner").unbind("click").click(function(){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                $(this).siblings().find(".main").hide();
                $(this).find(".main").show();
                //请求数据
               /* $.ajax({
                    type:"POST",
                    url:"",
                    data:"",
                    success:function(data){},
                    error:function(){}

                });*/
            });
        }
        
    });

    

    //影片鼠标经过事件
    $(".wepiao_main .wepiao_main_moivelist:not(.showListCon) .movelistCon:not(.hotCinemaCon) .movelist_items .movelist_item").unbind("mouseenter").mouseenter(function(){
        
        if($(this).parents().hasClass('showListCon'))return false;
        var buyRightNow ="<div class=\"buyRightNow\"><a href=\"#\">立即购票<\/a><\/div>";
        $(this).append(buyRightNow);
    }).unbind("mouseleave").mouseleave(function(){
        if($(this).parents().hasClass('showListCon'))return false;
        $(this).find(".buyRightNow").remove();
    });

    //影片信息选购
    var currentMovieId = "";
    var currentCinemaId = "";
    var dateWinId = "";
    $(".wepiao_nav .regionCon .regionChoose .inputCon").unbind("click").click(function(e){
        e.stopPropagation();
    	var inputConAll = $(".wepiao_nav .regionCon .regionChoose .inputCon");
    	var currentInputCon = $(this);
    	var currentWin = null;
        var movieInput = $(".movieInput input");
        var cinemaInput = $(".cinemaInput input");
        var dateInput = $(".dateInput input");

        

        if(currentInputCon.hasClass("movieInput")){//如果是选择影片
            currentWin = currentInputCon.find(".movieChoseWin");
        	currentWin.find(".main").find(".movieItem").unbind("click").click(function(e){
        		e.stopPropagation();
        		var movieName = $(this).find(".instruction").find(".name").text();
                currentCinemaId = $(this).attr("movieCinemaWinId");
                
        		currentInputCon.find("input").val(movieName);
        		currentWin.hide();
                if(movieInput.val()==movieInput[0].defaultValue || cinemaInput.val()==cinemaInput[0].defaultValue){
                    dateInput.parent().addClass("disable");
                }else{
                    dateInput.parent().removeClass("disable");
                }

        	});
        }
        if(currentInputCon.hasClass("cinemaInput")){//如果是选择影院
            currentInputCon.find(".movieChoseWin").each(function(i,v){
                if($(v).attr("movieCinemaWinId") == currentCinemaId){
                    currentWin = $(v);
                    return;
                }
            });
            if(currentWin==null||currentWin==undefined){
                currentWin = currentInputCon.find(".movieChoseWin").eq(0);
            }
            currentWin.siblings(".movieChoseWin").hide();
        	currentWin.find(".main").find(".cinemaArea").find("a").unbind("click").click(function(e){
        		e.stopPropagation();
        		var movieName = $(this).text();
        		currentInputCon.find("input").val(movieName);
                dateWinId = $(this).attr("dateWinId");
        		currentWin.hide();
                if(movieInput.val()==movieInput[0].defaultValue || cinemaInput.val()==cinemaInput[0].defaultValue){
                    dateInput.parent().addClass("disable");
                }else{
                    dateInput.parent().removeClass("disable");
                }
        	});
            
        }
        if(currentInputCon.hasClass("dateInput")){//如果是选择时间
            currentInputCon.find(".movieChoseWin").each(function(i,v){
                if($(v).attr("dateWinId") == dateWinId){
                    currentWin = $(v);
                }
            });
            if(currentWin==null||currentWin==undefined){
                currentWin = currentInputCon.find(".movieChoseWin").eq(0);
            }
        	
        	if(movieInput.val()==movieInput[0].defaultValue || cinemaInput.val()==cinemaInput[0].defaultValue)
        	return false;
        	$(".regionChoose .buyBtn").hide();
        	currentWin.find(".main").find(".buyBtnConDiv").find("a").unbind("click").click(function(e){
        		e.stopPropagation();
        	})
        }

        inputConAll.removeClass("inputConWin");
        $(".movieChoseWin").hide()
        currentInputCon.addClass("inputConWin");
        currentWin.show();
        if(currentInputCon.hasClass("cinemaInput")){//如果是选择影院
            currentWin.find(".main .cinemaArea").height(currentWin.find(".main").height());
        }
        //imgboxPlayer.Stop();

        currentWin.find(".close").unbind("click").click(function(e){//关闭窗口
	        e.stopPropagation();
	        $(this).parents(".inputCon").removeClass("inputConWin")
	        $(this).parents(".movieChoseWin").hide()
	        $(".regionChoose .buyBtn").show();
	        //imgboxPlayer.Start();
	    });
    });

   

    $(".dateWin .title .dateItem").unbind("click").click(function(e){
        e.stopPropagation();
        $(this).siblings().removeClass("active");
        $(this).siblings().find(".main").hide();
        $(this).addClass("active")
        $(this).find(".main").show();
    });
    var dateItemCon = $(".dateWin .title .dateItemCon")[0];
    $(".dateWin .title .dateItemBtn").unbind("click").click(function(e){
        e.stopPropagation();
        if($(this).hasClass("btnLeftCon")){
            if(dateItemCon.scrollLeft>=0)
            dateItemCon.scrollLeft-=165;
        }else{
            if(dateItemCon.scrollLeft<=(1000-567)){
                dateItemCon.scrollLeft+=165;
            }
        }   
    });



    $(".dateWin .main .item").mouseenter(function(){
        $(this).addClass("active");
    }).mouseleave(function(){
        $(this).removeClass("active");
    });

    $(".cinemaWin .main .regionArea .regionName").unbind("click").click(function(e){
        e.stopPropagation();
        $(this).parent().siblings().find(".regionName").removeClass("active");
        $(this).parent().siblings().find(".cinemaArea").hide();
        $(this).addClass("active");
        $(this).next().show();
    });

    //导航栏选择地区城市
    //$(".menu .showRegion")
    $("body").click(function(){
        $(".movieChoseWin").hide();
        $(".wepiao_nav .regionCon .regionChoose .inputCon").removeClass("inputConWin");
        $(".regionChoose .buyBtn").show();
    });

    $(".wepiaoContainer .header .menu .seachCon input").focus(function(){
        if($(this).val()==this.defaultValue){
            $(this).val("");
        }
        
    }).blur(function(){
        if($(this).val()==""){
            $(this).val(this.defaultValue);
        }else{

        }
    });
});

