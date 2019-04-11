$(function(){
	var oBt=document.getElementById("btn");
	var aBtn=oBt.getElementsByTagName("li");
	var oUl=document.getElementById("O2O_cont");
	var aLi=oUl.getElementsByTagName("li");
	
	var oCot=document.getElementById("cot");
	var aDiv=oCot.getElementsByTagName("div");
	var oClass=document.getElementById("classification");
	var aPt=oClass.getElementsByTagName("li");
	var aLayer=oClass.getElementsByTagName("div");
	var oCont=document.getElementById("cont");
	var aCont=oCont.getElementsByTagName("div");


	for(i=0; i<aBtn.length; i++){
		var index=aBtn[i].index =i;
		aBtn[i].onclick=function(){
			for(i=0; i<aBtn.length; i++){
				aBtn[i].className="";
				aLi[i].style.display="none";
				oClass.style.display="none";
			}
			this.className="bor";
			aLi[this.index].style.display="block";
			if(this.index==2){
				oClass.style.display="block";
			};
		};
	}
	
	for(i=0; i<aPt.length; i++){
		aPt[i].index=i;
		aPt[i].onmouseover=function(){
			for(i=0; i<aPt.length; i++){
				aDiv[i].style.display="none";
				aCont[i].style.display="none";
				aLayer[i].style.opacity="0.4";
			}
			aDiv[this.index].style.display="block";
			aCont[this.index].style.display="block";
			aLayer[this.index].style.opacity="0";
		};
	}
	var oCard=document.getElementById("card");
	var aCard=oCard.getElementsByTagName("div");
	var wt=aCard[0].scrollWidth;
	oCard.style.width=wt*aCard.length+"px";
	
	var len = aCard.length;
    var index = 0;  //图片序号
    var adTimer=null;
   //滑入停止动画，滑出开始动画.
    $(".card_1").hover(function() {
        clearInterval(adTimer);
    }, function() {
        adTimer = setInterval(function() {
            showImg(index)
            index++;
            if (index == len) {       //最后一张图片之后，转到第一张
                index = 0;
            }
        }, 5000);
    }).trigger("mouseleave");
	
	$(".net").click(function(){
		showImg(index);
		index++;
		if(index == len) {       //最后一张图片之后，转到第一张
            index = 0;
        }
	});
	$(".prev").click(function(){
		showImg(index);
		index--;
		if(index < 0) {       //最后一张图片之后，转到第一张
            index = len-1;
        }
	});
	
    function showImg(index) {
		$("#card").animate({
            "left":-wt*index+"px"   //改变 opacity 属性的值达到轮播的效果
        }, 700);
    }

	//var typevlue=getUrlParameter('type');
	//aBtn[parseInt(typevlue)].click();
});