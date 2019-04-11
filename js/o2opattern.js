window.onload=function(){
	var oBt=document.getElementById("btn");
	var aBtn=oBt.getElementsByTagName("li");
	var oUl=document.getElementById("O2O_cont");
	var aLi=oUl.getElementsByTagName("li");
	
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
};