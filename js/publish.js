(function  () {

	H.publish={
		init:function  () {
			var me=this;
			$("#wrapper").width($(window).width()).height($(window).height()); //设置高度
			me.fill();
			
			scrollPages(function  () { //上拉下拉刷新
				H.publish.fill(indexPage);
			});  
			
		}
		,fill:function  (sindex) {
			var me=this;
			var t=simpleTpl();
			sindex=sindex?sindex:0;
			getAppResultSucc("?methods=soonSoldList",{
				beginId:sindex,	//起始记录主键id
				count:20,   //要查询的记录数
				jsonp_method:"callback_soonSoldList"+parseInt(Math.random()*1000)
			},function  (data) {
				var t = simpleTpl();
				if(data.code == "GOOD" && data.content.length>0){
					var cdata=data.content;
					var innerObj={};
					for(var o in cdata){
						indexPage=cdata[o].bysort;
						innerObj=cdata[o];
//						
//						if(innerObj.roundStatus==4||true){  //test
//							console.log(innerObj.soonTime);
//							var endTime=(15)*1000;
//							var newEndTime=new Date().getTime()+endTime;
							
							if(innerObj.roundStatus==4 && innerObj.soonTime>0){  //正式环境 
							var endTime=(parseInt(innerObj.soonTime))*1000;
							var newEndTime=new Date().getTime()+endTime;

							t._('<li class="w-goodsList-item" onclick="jiexiao('+innerObj.awardId+','+innerObj.roundId+','+innerObj.roundName+',this)">')
							 	t._('<i class="ico ico-label ico-label-ten"></i>')
				   		 		t._('<div class="innerItem">')
				   		 			t._('<div style="background-image:url('+innerObj.imgUrl+');" class="descImg">')
				   		 			t._('</div>')
				         			t._('<div class="yy-title ">')
					           			t._('(第'+innerObj.roundName+'期)'+innerObj.awardName)
					           			t._('</div>')
					           		t._('<div class="w-countdown-title ">')
					           			t._('<i class="ico ico-countdown ico-countdown-gray"></i>')
					           			t._('即将揭晓')
					           		t._('</div>')	
					           		t._('<div class="yy-color yy-color-size countdown" data-stime="0" data-etime="'+newEndTime+'">')
					           			t._('06:50:80')
					           		t._('</div>')	
					           	t._('</div>')	
				         	t._('</li>')
			         	}else if(innerObj.roundStatus==2){
			         		t._('<li class="w-goodsList-item" onclick="jiexiao('+innerObj.awardId+','+innerObj.roundId+','+innerObj.roundName+')">')
								t._('<div class="innerItem">')
									t._('<div style="background-image:url('+innerObj.imgUrl+');" class="descImg">')
									t._('</div>')
					     			t._('<div class="yy-title paddingLR20">')
					           			t._('(第'+innerObj.roundName+'期)'+innerObj.awardName+' ')
					           		t._('</div>')	
					           		t._('<div class="paddingLR20">')
					           			t._('<div class="content-desc">')
					           				t._('<span>获 得 者:</span>')
						           			t._('<span class="desc-color-blue">'+innerObj.winNickName+'</span>')
						           		t._('</div>')	
						           		t._('<div class="content-desc">')
						           			t._('<span>参与人次:</span>')
						           			t._('<span>'+innerObj.buyCount+'</span>')
						           		t._('</div>')	
						           		t._('<div class="content-desc">')
						           			t._('<span>幸运号码:</span>')
						           			t._('<span class="desc-color-red">'+innerObj.winLotteryCode+'</span>')
						           		t._('</div>')	
						           		t._('<div class="content-desc">')
						           			t._('<span>揭晓时间:</span>')
						           			t._('<span>'+dateDiff(innerObj.winTime)+'</span>')
						           		t._('</div>')	
						           	t._('</div>')	
					           	t._('</div>')	
           					t._('</li>')
						}
			         	
					}

				}
				if(indexPage==0){
					if($(".timeUl li").length==0){
						t=t.toString() || "<li class='outerLi id20 _center norecord' >暂无记录</li>";
						$(".timeUl").append(t);
					}
				}else{
					t=t.toString();
					$(".timeUl").append(t);
				}
				me.countDowntime(); //执行倒计时
			});
         	
		}
		,countDowntime:function  (data) {
			var me=this;
			$(".countdown").each(function  () {
				var $me = $(this);
				$(this).countdown({
					stpl:'<p style="font-size:10px;"></p>%M%:%S%:%E%',
					etpl:'<p style="font-size:10px;"></p>%M%:%S%:%E%',
					otpl: '',
					callback:function  (state,_this,serverTime) {
						$(_this).attr("data-endTime",serverTime);
						if(state==3&&!_this.attr("a1")){
							_this.attr("a1","a1");
							$me.html("00:00:00");
						}
					}
				});
				
			});
		}
		
		
	};
	
	W.indexPage=0; //初始页面beginId
	W.scrollPages=function  (fn) {	//滚动加载
		var dropload = $('.inner').dropload({ // dropload
		    domUp : {
		        domClass   : 'dropload-up',
		        domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
		        domUpdate  : '<div class="dropload-update">↑释放更新</div>',
		        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		    },
		    domDown : {
		        domClass   : 'dropload-down',
		        domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
		        domUpdate  : '<div class="dropload-update">↓释放加载</div>',
		        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		    },
		    loadUpFn : function(me){
		    	location.reload();
		    },
		    loadDownFn : function(me){
		    	if(typeof fn =="function"){
		    		fn();
		    	}
		    	me.resetload();
		    }
		});
	}
	
	/**
     * [dateDiff 算时间差]
     * @param  {[type=Number]} hisTime [历史时间戳，必传]
     * @param  {[type=Number]} nowTime [当前时间戳，不传将获取当前时间戳]
     * @return {[string]}         [string]
     */
	W.dateDiff=function(hisTime,nowTime){
		var _arg=hisTime.replace(/-/,"/");
		_arg=new Date(""+_arg).getTime();
        if(!arguments.length) return '';
        var arg = arguments,
            now =arg[1]?arg[1]:new Date().getTime(),
            diffValue = now - _arg, //减去参数arg[0]
            result='',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            halfamonth = day * 15,
            month = day * 30,
            year = month * 12,
            second= 1000;

            _year = diffValue/year,
            _month =diffValue/month,
            _week =diffValue/(7*day),
            _day =diffValue/day;

            if(_year>=1) result=parseInt(_year) + "年前" +hisTime.substr(10);
            else if(_month>=1) result=parseInt(_month) + "月前"+hisTime.substr(10);
            else if(_week>=1) result=parseInt(_week) + "周前" +hisTime.substr(10);
            else if(_day>=1){
            	if(parseInt(_day)==1){
            		result="昨天"+ hisTime.substr(10) //天前
            	}else if(parseInt(_day)==2){
            		result="前天"+ hisTime.substr(10)
            	}else{
            		result=parseInt(_day)+"天前"+ hisTime.substr(10)
            	}
            }else{
            	var currentTimes=dateformat(new Date(),"yyyy-MM-dd");
            	if(currentTimes==hisTime.substring(0,10)){
            		result="今天"+ hisTime.substr(10)
            	}else{
            		result="昨天"+ hisTime.substr(10)
            	}
            }
            return result;
    }
//	var res=dateDiff("2015-11-01 11:22:06")
//  console.log(res);
	
	W.jiexiao=function  (awardId,roundId,roundName,e) {
		var phoneNum=getQueryString("phoneNum");
		var endTime=0;
		var _url="../soonDetail.html?phoneNum="+phoneNum+"&awardId="+awardId+"&roundId="+roundId+"&roundName="+roundName;
		if(e){
			endTime=$(e).find(".countdown").attr("data-endTime");
			_url=add_param(_url,"endTime",endTime);
		}
//		_url="../soonDetail.html?phoneNum=15905190335&awardId=1&roundId=3020033&roundStatus=1";   //测试数据
//		location.href=_url;
		TTY.toAnotherWebPage("最新揭晓",_url);
	}

	
})(Zepto);
$(function(){
    H.publish.init();
    
});