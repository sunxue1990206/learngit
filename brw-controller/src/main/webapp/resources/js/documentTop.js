// JavaScript Document
/*
*置顶
*楼层与客服置顶按钮设置eg：
floors:[{name:"1F",id:"top01"},{name:"2F",id:"top02"},{name:"3F",id:"top03"}],//楼层名称以及楼层a描点位置 href=""
custom:{html:"<span>在线</span><span>客服</span>",url:""},//在线客服
doctop:'<i class="icon03 top_icon"></i>'//置顶内容设置
*/
$.fn.documentTop = function(operation){
	$("#suspend_top").remove();
	var thz=this;
	var my={
		floors:[],
		custom:{},
		top:0,
		type:0,
		doctop:"",
		callback:function(that,html){}
		}
	my=$.extend(my,operation);
	var html='<dl id="suspend_top" class=" suspend_top f14 none" ';
	if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
		html=html+'style="top: expression(offsetParent.scrollTop+document.documentElement.clientHeight-this.offsetHeight-20);"';
		}
	//if(my.type==0){html=html+'style="display:none;"';}
	html=html+'>';
	var i=1;
	if(typeof(my.floors!="undefined")&&my.floors.length!=0){
		for(var key in my.floors){
			html=html+'<dd type="top"  id="topta0'
					 +i
					 +'" hrefid="#'
					 +my.floors[key].id+'" ';
			if(typeof(my.floors[key].name)!="undefined"){
				html=html+'name="'+my.floors[key].name+'">';
				}
			if(typeof(my.floors[key].html)!="undefined"){
				html=html+my.floors[key].html;
				}else if(typeof(my.floors[key].name)!="undefined"){
					html==html+my.floors[key].name;
					}else{html==html+i;}		 
					 
			html=html+'<div class="none">'
				+my.floors[key].onHtml
				+'</div>' +'</dd>';
				i++;
			}
		}
	if(typeof(my.custom.html)!="undefined"){
		html=html+'<dd  class="f12 custom_on" type="top" id="topta0'
			+i
			+'"> <a target="_blank" class="cus_top" '
			+'href="'
			+my.custom.url
			+'">'
			+my.custom.html
			+'<div class="none">'
			+my.custom.onHtml
			+'</div>'
			+'</a>'
			+'</dd>';
		i++;
	}
	
	if(typeof(my.doctop)!="undefined"&&my.doctop!=""){
		if(my.type==0){
			html=html+'<dt type="top" id="topta0'+i+'">';
			}else{
				html=html+'<dt type="top" id="topta0'+i+'">';
				}
		html=html+my.doctop
				 +'<div class="none"><span class="mt3">返回</span><span>顶部</span></div></dt>';
	}
	html=html+'</dl>';
	$("body").append(html);
	$('#topta0'+i).click(function(){
		$(document).scrollTop(0);
		return false;
		});
	var obj=$("#suspend_top");
	
	obj.find("dd,dt").hover(function(){
		$(this).addClass("ona").find("i").hide();
		$(this).find("div").show();
		},function(){
			$(this).removeClass("ona").find("div").hide();
			$(this).find("i").show();
			});

	obj.find("dd").not(".custom_on").click(function(){
		var hrefid=$(this).attr("hrefid");
		$(window).scrollTop($(hrefid).offset().top-15);
		});
	scrollFun();
	my.callback(thz,html);
	function scrollFun(){
		if(document.documentElement.scrollTop>0|| document.body.scrollTop>0){
			//console.log(0);
			obj.show();
			if(my.type==0){ obj.find("dd").hide();}
			}else{obj.hide();}
		}
	$(window).scroll(function(){
		scrollFun();
		return false;
		});
	
}