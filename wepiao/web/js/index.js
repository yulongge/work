function imgboxPlay(){
    		//图片集合
    		this.list = $(".imgbox").children(":first").children();
    		this.indexs = [];
    		this.length = this.list.length;
    		//图片显示时间
    		this.timer = 5000;
    		var index = 0 ,self = this,pre = 0,handId,isPlay = false,isBtnClick = false;

    		//图片轮播
    		this.Play = function(){
    			isPlay = true;
    			index ++ ;
    			if(index == self.length){
    				index = 0;
    			}
    			//alert(index+"===="+pre+"====="+index);
    			self.list.eq(pre).fadeOut(500,"linear",function(){
    				var info = self.list.eq(index).fadeIn(800,"linear",function(){
    					isPlay = false;
    					if(isBtnClick){
    						handId = setInterval(self.Play,self.timer);
    						isBtnClick = false;
    					}

    				});

    				pre = index;

    			});
    		}
    		this.rPlay = function(){
    			isPlay = true;
    			index -- ;
    			if(index == -1){
    				index = 3;
    			}
    			self.list.eq(pre).fadeOut(500,"linear",function(){
    				var info = self.list.eq(index).fadeIn(800,"linear",function(){
    					isPlay = false;
    					if(isBtnClick){
    						handId = setInterval(self.Play,self.timer);
    						isBtnClick = false;
    					}
    				});
    				pre = index;

    			});
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

    //获取屏幕分辨率
    var screenWidth = window.screen.width;
    if(screenWidth<1200){
        $(".wepiaoContainer").addClass("minWepiaoContainer");
    }else{
        $(".wepiaoContainer").removeClass("minWepiaoContainer");
    }

    //导航菜单
    $(".wepiaoContainer .header .menu .menuCon a").unbind("click").click(function(){
        $(this).parent().siblings().find("a").removeClass("active");
        $(this).addClass("active");
    });

    //列表切换
    $(".wepiaoContainer .wepiao_main .wepiao_main_moivelist .movelistCon .movelist_title .tabplay").unbind("click").click(function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });

    //显示区域选择
    $(".wepiaoContainer .header .menu .region .showRegion").unbind("click").click(function(){
        var _this = this;
        var regionChooseWindow = $(".regionChooseWindow");
        if(regionChooseWindow.is(":visible")){
            regionChooseWindow.hide();
        }else{
            regionChooseWindow.show();
            //点击城市
            regionChooseWindow.find("a").unbind("click").click(function(){
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
    $(".wepiao_main .wepiao_main_moivelist .movelistCon:not(.hotCinemaCon) .movelist_items .movelist_item").mouseenter(function(){
        var buyRightNow ="<div class=\"buyRightNow\"><a href=\"#\"><\/a><\/div>";
        $(this).append(buyRightNow);
    }).mouseleave(function(){
        $(this).find(".buyRightNow").remove();
    });

    //影片信息选购
    $(".wepiao_nav .regionCon .regionChoose .inputCon").unbind("click").click(function(){
    	var inputConAll = $(".wepiao_nav .regionCon .regionChoose .inputCon");
    	var currentInputCon = $(this);
    	var currentWin = currentInputCon.find(".movieChoseWin");
        var movieInput = $(".movieInput input");
        var cinemaInput = $(".cinemaInput input");
        var dateInput = $(".dateInput input");

        

        if(currentInputCon.hasClass("movieInput")){//如果是选择影片
        	currentWin.find(".main").find(".movieItem").unbind("click").click(function(e){
        		e.stopPropagation();
        		var movieName = $(this).find(".instruction").find(".name").text();
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
        	currentWin.find(".main").find(".cinemaArea").find("a").unbind("click").click(function(e){
        		e.stopPropagation();
        		var movieName = $(this).text();
        		currentInputCon.find("input").val(movieName);
        		currentWin.hide();
                if(movieInput.val()==movieInput[0].defaultValue || cinemaInput.val()==cinemaInput[0].defaultValue){
                    dateInput.parent().addClass("disable");
                }else{
                    dateInput.parent().removeClass("disable");
                }
        	})
        }
        if(currentInputCon.hasClass("dateInput")){//如果是选择时间
        	
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
        imgboxPlayer.Stop();

        currentWin.find(".close").unbind("click").click(function(e){//关闭窗口
	        e.stopPropagation();
	        $(this).parents(".inputCon").removeClass("inputConWin")
	        $(this).parents(".movieChoseWin").hide()
	        $(".regionChoose .buyBtn").show();
	        imgboxPlayer.Start();
	    });
    });

   

    $(".dateWin .title .dateItem").unbind("click").click(function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active")
    });

    $(".dateWin .main .item").mouseenter(function(){
        $(this).addClass("active");
    }).mouseleave(function(){
        $(this).removeClass("active");
    });

    $(".cinemaWin .main .regionArea a").unbind("click").click(function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active")
    });

    //导航栏选择地区城市
    //$(".menu .showRegion")
});

