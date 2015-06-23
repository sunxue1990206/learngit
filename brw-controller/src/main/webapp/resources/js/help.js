// JavaScript Document
/*html页面结构加help属性
help="f_url_w_h" _help=本地连接
help="c_iframe_w_h" _help=远程链接
help="h_text_w_h" _help=字符串"
f : 获得焦点
c : 点击
h ：滑过

eg:
<div help="h_text_300_100" _help="url.html" title="标题" style="width:300px; height:30px; background:#0F0;"></div>
注：如果有标题请加"title"属性


*/

(function ($) { 
$.fn.help = function() {    
 		var str=$(this).attr("help").split("_");
		if($.methodHelp.checkmethodHelp(str,"c")){    
			$(this).click(function(e){
				$.methodHelp.appDome(0,this,e);
				});
			$(this).mouseout(function(e){
				$.methodHelp.appDome(1);
				});
			return;
			}
		if($.methodHelp.checkmethodHelp(str,"h")){
			$(this).mousemove(function(e){
				$.methodHelp.appDome(0,this,e);
				return false;
				});
			$(this).mouseout(function(e){
				$.methodHelp.appDome(1);
				});
			return;
			}
		if($.methodHelp.checkmethodHelp(str,"f")){
			$(this).click(function(e){
				$.methodHelp.appDome(0,this,e,0);
				});
			$(this).focus(function(e){
				//$(this).click();
				$.methodHelp.appDome(0,this,e);
				});
			$(this).blur(function(e){
				$.methodHelp.appDome(1);
				});
			return;
			}
};
	
	$.methodHelp={
		checkmethodHelp	: function(arr,str){
		  for(i=0;i<arr.length;i++){
				if($.trim(arr[i])==str){return true;}
				}
		 return false;
			}, 
		getWidth : function(arr){
			var patrn=/^([1-9][0-9]*)$/;
			 for(i=0;i<arr.length;i++){
				if (patrn.exec(arr[i])){return parseInt(arr[i]);}
				}
			return 0;
			},
		getHeight : function(arr){
			var n=1;
			var patrn=/^([1-9][0-9]*)$/;
			 for(i=0;i<arr.length;i++){
				if (patrn.exec(arr[i])){
					if(n==2){return parseInt(arr[i]);}
					n++;
					}
				}
			return 0;
			},
		appDome : function(type,obj,e,n){
			if(type==0){
				var str=$(obj).attr("help").split("_");
				var title=$(obj).attr("title");
				var scont=$.trim($(obj).attr("_help"));
				var w=$.methodHelp.getWidth(str);
				var h=$.methodHelp.getHeight(str);
				var th=0;
				var wc=0;
				wc=w>0?w:200;
				w=w>0?w+'px':200+"px";
				h=h>0?h+"px":"auto";
				if(typeof(title)!="undefined"){
					title='<div class="help_title" style="height:30px; line-height:30px; background:#eee;padding:0 3px;">'
								+title
								+'</div>'
					th=30;
					}else{title="";}
					var el=$.methodHelp.getMousePos(e);
					if(isNaN(el.y)||typeof(n)!="undefined"){
						el.y=$(obj).offset().top+$(obj).outerHeight();
						el.x=$(obj).offset().left;
					}

				if(h!="auto"){
					el.y=el.y-parseInt(h)/2;
					
				}
				var iconstr="helpl_icon";
				var ex=el.x;
				var left="margin-left:8px; margin-right:0; ";
				if($(window).width()<(el.x+wc)){
					iconstr="helpr_icon";
					el.x=el.x-wc-15;	
					$("#helpattr").find(".arrowicon").addClass("helpr_icon").removeClass("helpl_icon");	
					left="margin-left:0; margin-right:8px; ";
				}
				
				if($("#helpattr").size()<=0){
					var html='<div id="helpattr" style="width:'
								+w+'; height:'+h+'; position:absolute; '
								+'top:'+el.y+'px; left:'+el.x+'px;'
								+'">'
								+'<i class="'+iconstr+' arrowicon pa">&nbsp;</i>'
								+title
								+'<div class="helpattr_cont " style="'+left+'padding:10px; height:'+(parseInt(h)-th-20)+'px;overflow:hidden;">';
					if($.methodHelp.checkmethodHelp(str,"url")){ 
						$.get(scont, function(data){
						  html=html+data.replace(/<script\s+type="text\/javascript"[\s\S]*?<\/script>|<script\s+type='text\/javascript'[\s\S]*?<\/script>|<link(.*?)><\/link>|<link[\s\S]*?\/>|<!DOCTYPE[\s\S]*?<body>|<\/body>[\s\S]*?<\/html>/gi,"")+'</div></div>';
						$("body").append(html);
						},"html");
													
					}   
					if($.methodHelp.checkmethodHelp(str,"text")){ 
						html=html+scont+'</div></div>';
						$("body").append(html);
					}   
					if($.methodHelp.checkmethodHelp(str,"iframe")){
						html=html+'<iframe width="100%" height="100%" style="border:none; margin:0; padding:0;" src="'+scont+'"></iframe></div></div>';
						$("body").append(html);
						 } 

					if(h=="auto"){
						el.y=el.y-$("#helpattr").outerHeight(true)/2;
						$("#helpattr").css({top:el.y+"px"/*,left:el.x+"px"*/});
						
					}
					//if($(window).width()<(ex+wc)){
						 //$("#helpattr").find(".arrowicon").addClass("helpr_icon").removeClass("helpl_icon");	
					//}
					}else{
						$("#helpattr").find(".arrowicon").addClass("helpl_icon").removeClass("helpr_icon");
						if($(window).width()<(ex+wc)){
							$("#helpattr").find(".arrowicon").addClass("helpr_icon").removeClass("helpl_icon");
							$("#helpattr").find(".helpattr_cont").css({"margin-left":0,"margin-right":"8px"});	
						}
						if(h=="auto"){
							el.y=el.y-$("#helpattr").outerHeight(true)/2; 
						}
						$("#helpattr").css({top:el.y+"px",left:el.x+"px"});
						
						
					}
				}else{$("#helpattr").remove();}
			},
		getMousePos : function(event){
			var e = event || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX || e.clientX + scrollX;
            var y = e.pageY|| e.clientY + scrollY;

            //alert('x: ' + x + '\ny: ' + y);
            return { 'x': x+10, 'y': y };
			},
		getOffset: function(obj,w){
            var x = $(obj).offset().left-$("div.help_div").offset().left+$(obj).outerWidth()/2-parseInt(w)/2;
            var y =  $(obj).offset().top+$(obj).outerHeight()-$("div.help_div").offset().top;
            //alert('x: ' + x + '\ny: ' + y);
            return { 'x': x, 'y': y-5 };
			}
		}

})(jQuery);

$(document).ready(function(e) {
    	$("[help]").each(function(){
        	$(this).help();
   		 });	
});