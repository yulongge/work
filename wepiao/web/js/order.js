$(function(){
    //选座位
    $(".seatRows .rowItems .seatTo:not(.seatNo,.seatNull)").unbind("click").click(function(){
        var tempSeat = $(this);
        if(tempSeat.hasClass('seatOk')){
            tempSeat.removeClass('seatOk');
        }else{
            tempSeat.addClass('seatOk');
            var template = "<span class=\"seatItem\">4排6座<\/span>";
            $(".seatCon .seatRight .seats .seatList").find(".seatItem:last").after(template);
        }
    });

    //编辑电话号码
    $(".phonenum .num .inputCon .editBtn").unbind("click").click(function(){
        $(".phonenum .num .inputCon").addClass('editState');
        $(this).hide();
        $(".phonenum .num .inputCon .deleteBtn").css("display","inline-block");
        $(".phonenum .num .saveBtn").show();

    });
    $(".phonenum .num .inputCon .deleteBtn").unbind('click').click(function(){

    });
    $(" .phonenum .num .saveBtn").unbind("click").click(function(){
        $(".phonenum .num .inputCon .deleteBtn").css("display","none");
        $(".phonenum .num .saveBtn").hide();
        $(".phonenum .num .inputCon .editBtn").show();
        $(".phonenum .num .inputCon").removeClass('editState');
    });
});
