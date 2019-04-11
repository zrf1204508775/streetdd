$(function(){
	var aLi=$(".banner ul li");
	var aBtn=$(".banner ol li");
	
	var len = aBtn.length;
    var index = 0;  //图片序号
    var adTimer;
	
   $(".banner ol li").mouseover(function() {
        index = $(".banner ol li").index(this);  //获取鼠标悬浮 li 的index
        showImg(index);
    }).eq(0).mouseover();
	
    //滑入停止动画，滑出开始动画.
    $('.banner').hover(function() {
        clearInterval(adTimer);
    }, function() {
        adTimer = setInterval(function() {
            showImg(index)
            index++;
            if (index == len) {       //最后一张图片之后，转到第一张
                index = 0;
            }
        }, 3000);
    }).trigger("mouseleave");
	
    function showImg(index) {
		$(".banner ul li").removeClass("active")
		$(".banner ul li").eq(index).addClass('active')
		
        $(".banner ol li").removeClass("cur")
        $(".banner ol li").eq(index).addClass("cur");
    }
});