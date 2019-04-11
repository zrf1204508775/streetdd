$(function(){
	var oBt=document.getElementById("btn");
	var aBtn=oBt.getElementsByTagName("li");
	var oUl=document.getElementById("O2O_cont");
	var aLi=oUl.getElementsByTagName("li");
	
	var oAtc=$("#activity");
	var aOpt=$("#activity div");
	aOpt.click(function(){
		index=$(this).index();
		$(".options span").css("background","rgba(0,0,0,0.5)");
		$(".options p").css("color","white");
		$(".options p").eq(index).css("color","#2fa56c");
		$(".options span").eq(index).css("background","rgba(0,0,0,0)");
		$(".act .acp").css("display","none");
		$(".act .acp").eq(index).css("display","block");
	});
	
	$("#party .party_dis").click(function(){
		len=$(this).index();
		$(".dis .party").css("display","none");
		$(".dis .party").eq(len).css("display","block");
	});
	
	for(i=0; i<aBtn.length; i++){
		aBtn[i].index =i;
		aBtn[i].onclick=function(){
			for(i=0; i<aBtn.length; i++){
				aBtn[i].className="";
				aLi[i].style.display="none";
			}
			this.className="bor";
			aLi[this.index].style.display="block";
		};
	}
		
	
	/* var typevlue=getUrlParameter('type');
	aBtn[parseInt(typevlue)].click(); */
	
	
	/* 创客派对列表是否出现滚动条 */
	var partyHeight = $('#party .party_dis').length*80;
	if( partyHeight > 400){
		$('#party').css("overflowY","scroll")
	}
	
	/* 视频媒体列表是否出现滚动条 */
	var activityHeight = $('#activity>div').length*180;
	if( activityHeight > 600){
		$('#activity').css("overflowY","scroll")
	}
	
	
	console.log(activityHeight)
});