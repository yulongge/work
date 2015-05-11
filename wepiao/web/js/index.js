/*function imgboxPlay(){
    		//图片集合
    		this.list = $(".imgbox").children();
    		this.indexs = [];
    		this.length = this.list.length;
    		//图片显示时间
    		this.timer = 10000;
    		var index = 0 ,self = this,pre = 0,handId,isPlay = false,isBtnClick = false,isPagerClick = false;

    		//图片轮播
    		this.Play = function(){
    			isPlay = true;
    			index ++ ;
    			if(index == self.length){
    				index = 0;
    			}
    			//alert(index+"===="+pre+"====="+index);
                //alert(index);
    			self.list.eq(pre).fadeOut(3000,"linear",function(){
                    $(".pagerCon .pager").removeClass('active')
                    $(".pagerCon .pager").eq(index).addClass('active');
                });
                self.list.eq(index).fadeIn(3000,"linear",function(){
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
    			self.list.eq(pre).fadeOut(5000,"linear",function(){
                     $(".pagerCon .pager").removeClass('active')
                     $(".pagerCon .pager").eq(index).addClass('active');
                });
                var info = self.list.eq(index).fadeIn(5000,"linear",function(){
                        isPlay = false;
                        if(isBtnClick){
                            handId = setInterval(self.Play,self.timer);
                            isBtnClick = false;
                        }
                        
                });
                pre = index;
                $(".pagerCon .pager").removeClass('active')
                $(".pagerCon .pager").eq(index).addClass('active');
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
            //图片序号点击
            this.PagerClick = function () {
                if (isPlay) { return; }
                isPagerClick = true;
                clearInterval(handId);
                var oPager = $(this), i = parseInt(oPager.index());
                if (i != pre) {
                    index = i - 1; 
                    //alert(index);
                    self.Play();
                }
            };

    		this.Start = function(){
                
    			handId = setInterval(self.Play,self.timer);
    			this.BtnClick();
                var o = $(".pagerCon .pager"), _i;

                for (var i = o.length - 1, n = 0; i >= 0; i--, n++) {
                    //this.indexs[n] = o.eq(i).click(self.PagerClick);
                    o.eq(i).unbind("click").click(self.PagerClick);
                }
    		}
    		this.Stop = function(){
    			clearInterval(handId);
    		}


}*/
function imgboxPlay() {
            this.list = $(".imgbox").children();
            this.indexs = [];
            this.length = this.list.length;
            //图片显示时间
            this.timer = 10000;
            this.showTitle = $(".title");

            var index = 0, self = this, pre = 0, handid, isPlay = false, isPagerClick = false;

            this.Start = function () {
                this.Init();
                //计时器，用于定时轮播图片
                handid = setInterval(self.Play, this.timer);
                this.BtnClick();
            };
            //初始化
            this.Init = function () {
                var o = $(".pagerCon .pager"), _i;

                for (var i = o.length - 1, n = 0; i >= 0; i--, n++) {
                    this.indexs[n] = o.eq(i).unbind("click").click(self.PagerClick);
                }
            };
            this.Play = function () {
                isPlay = true;
                index++;
                if (index == self.length) {
                    index = 0;
                }
                //先淡出，在回调函数中执行下一张淡入
                self.list.eq(pre).fadeOut(5000, "linear", function () {});

                var info = self.list.eq(index).fadeIn(5000, "linear", function () {
                        isPlay = false;
                        if (isPagerClick) { 
                            handid = setInterval(self.Play, self.timer); 
                            isPagerClick = false;
                        }
                    });
                 //图片序号背景更换
                 $(".pagerCon .pager").removeClass('active')
                 $(".pagerCon .pager").eq(index).addClass('active');

                  pre = index;
                   
            };
            //图片序号点击
            this.PagerClick = function (tempIndex) {
                if (isPlay) { return; }
                isPagerClick = true;

                clearInterval(handid);

                var oPager = $(this);
                var i = parseInt(oPager.index());
                if(typeof tempIndex == "object"){
                    i = parseInt(oPager.index());
                }else{
                    i=tempIndex;
                }


                if (i != pre) {
                    index = i - 1;
                    self.Play();
                }
            };
            //左右点击切换
            this.BtnClick = function(){
                var btns = $(".img_btn");
                var o = $(".pagerCon .pager");
                
                
                btns.each(function(i,v){
                    $(v).click(function(){                       
                        if($(v).hasClass("img_left_btn")){
                           
                            var tempIndex = $(".pagerCon .active").index();
                            self.PagerClick(tempIndex-1);
                        }
                        if($(v).hasClass("img_right_btn")){
                            var tempIndex = $(".pagerCon .active").index();
                            self.PagerClick(tempIndex+1);
                        }
                    });
                });
                
            }
        };
$(document).ready(function(){
    //启动图片滚动
    var imgboxPlayer = new imgboxPlay();
    imgboxPlayer.Start();
	//(new imgboxPlay()).Start();
   /* $(".wepiaoContainer .wepiao_nav .imgbox").mouseenter(function(){
        imgboxPlayer.Stop();
    }).mouseleave(function(){
        imgboxPlayer.Start();
    });*/

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

/*影院详情*/
$(function(){
    $(".cinema_main .detail_ins .moreDetail").unbind("click").click(function(){//更多详情收缩
        var shs= $(".cinema_main .cinemalShS");
        if(shs.is(":visible")){
            shs.slideUp(500);
            $(this).find("span").eq(0).text("更多详情");
            $(this).find(".icon").removeClass('iconS');
        }else{
            shs.slideDown(500);
            $(this).find("span").eq(0).text("收起");
            $(this).find(".icon").addClass('iconS');
        }
    });

    var cinemaItemCon = $(".cinema_main .detail_ins .filmlist .listBigCon");
    var itemWidth = 300;
    var marginWidth = 20;
    var perWidth = itemWidth + marginWidth;
    var length = cinemaItemCon.find(".item").length;
    var speed = 300;
    $(".cinema_main .filmlist .opBtn").unbind("click").click(function(e){//更多详情的图片轮播
        e.stopPropagation();
        if($(this).hasClass("leftBtn")){
            if(cinemaItemCon.scrollLeft()>=0){
                var left = cinemaItemCon.scrollLeft() - perWidth;
                cinemaItemCon.animate({scrollLeft:left}, speed)
            }
        }else{
            if(cinemaItemCon.scrollLeft()<(perWidth*(length-3))){
                var left = cinemaItemCon.scrollLeft() + perWidth;
                cinemaItemCon.animate({scrollLeft:left}, speed)
            }
        }  
    });


    //电影选择轮播

    var filmItemCon = $(".cinema_main >.filmlist .listBigCon");
    var filmitemWidth = 208;
    var filmmargin = 20;
    var filmPerW = filmitemWidth + filmmargin;
    var filmLen = filmItemCon.find(".item").length;
    var filmSpeed = 300;
    $(".cinema_main >.filmlist .opBtn").unbind("click").click(function(e){//更多详情的图片轮播
        e.stopPropagation();
        if($(this).hasClass("leftBtn")){
            if(filmItemCon.scrollLeft()>=0){
                var left = filmItemCon.scrollLeft() - filmPerW;
                filmItemCon.animate({scrollLeft:left}, filmSpeed)
            }
        }else{
            if(filmItemCon.scrollLeft()<(filmPerW*(filmLen-4))){
                var left = filmItemCon.scrollLeft() + filmPerW;
                filmItemCon.animate({scrollLeft:left}, filmSpeed)
            }
        }  
    });

    $(".cinema_main >.filmlist .item").eq(0).find('.itemMsg').show();
    $(".cinema_main >.filmlist .item").unbind('click').click(function(){//电影被点击
        var _this = this;
        $(_this).siblings().find("img").removeClass('active');
        $(_this).siblings().find(".pointIcon").remove();
        $(_this).siblings().find(".itemMsg").hide();

        $(_this).find("img").addClass('active');

        var arrowTep="<span class=\"pointIcon\"><\/span>";
        $(_this).find(".pointIcon").remove();
        $(_this).find("img").after(arrowTep);
        $(_this).find(".itemMsg").show();
    });

});

/*影片详情*/

$(function(){
    
    //剧照轮播

    var jzCon = $(".filmAdvance .filmlist .listBigCon");
    var jzWidth = 240;
    var jzmargin = 6;
    var jzPerW = jzWidth + jzmargin;
    var jzLen = jzCon.find(".item").length;
    var jzSpeed = 300;
    $(".filmAdvance .filmlist .opBtn").unbind("click").click(function(e){//更多详情的图片轮播
        e.stopPropagation();
        if($(this).hasClass("leftBtn")){
            if(jzCon.scrollLeft()>=0){
                var left = jzCon.scrollLeft() - jzPerW;
                jzCon.animate({scrollLeft:left}, jzSpeed)
            }
        }else{
            if(jzCon.scrollLeft()<(jzPerW*(jzLen-4))){
                var left = jzCon.scrollLeft() + jzPerW;
                jzCon.animate({scrollLeft:left}, jzSpeed)
            }
        }  
    });

    //剧照点击事件

    $(".filmAdvance .filmlist .listBigCon .item").unbind('click').click(function(){
        var url = $(this).find("img").attr("src");
        $(".filmAdvance .main .filmPlay").css("background","url("+url+") center no-repeat");
    });

    $(".film_main .filmSeat .fs_cinema .moreCinema").unbind('click').click(function(){//更多影院
        var con = $(".film_main .filmSeat .fs_cinema .cont");
        if(con.height()==60){
            con.animate({height:"100%"}, 500)
        }else{
            con.animate({height:60}, 500)
        }
    });

    $(".film_main .filmComment .commentBtn").unbind('click').click(function(){
        $(".commentWin").show();
        $(".bg_shade").show();
    });

    $(".commentWin .com_foot .inputCon .comBtn").click(function(){
         $(".commentWin").hide();
        $(".bg_shade").hide();
    });

});



