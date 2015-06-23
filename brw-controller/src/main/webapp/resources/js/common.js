// JavaScript Document
/*focus*/
(function ($) { 
/*
*input获取焦点效果时外框
*/
$.fn.focusInput = function(operation) {
		var obj=$(this);
		var thatz=this;
		var str=obj.attr("f");
		var value=obj.find("input").attr("placeholder");
		var op={type:1,callback:function(){},verifyB:function(){},verifyF:function(){}};
		op=$.extend(op,operation);
		//对password 但是类型不为password且有提示信息的做重新生成
		setPassword(obj);
		str=typeof(str)!="undefined"? "ibg_"+$.trim(str):"ibg_285x45";
		if(op.type==1) {
			  obj.find("input").focus(function(){
				  var that=$(this);
				  if(isDIsOrOnly(that)){ return false;}
				  if($(this).css("display")!="none"){
					  obj.css({padding:"0"}).find(".focus_div").addClass(str).css({border: 0,padding: "6px 18px 6px 21px"});
					$("div.select_cont").siblings().css({padding:"5px"}).find(".focus_div").removeClass("ibg_231x45").css({border:"1px solid #ddd",padding: "0 12px 0 15px"});
					if(obj.find("input").val()==value){obj.find("input").val("");}
					
					if(pass($.trim(that.attr("vertype")))&&$.trim(that.attr("type"))!="password"){
						thatobj=that.siblings("input");
						if(thatobj.size()>0){
							that.css("display","none");
							thatobj.css("display","inline-block").focus(); 
							
							return; 
							}
						}
				
					if(typeof(op.verifyF)!="undefined"){op.verifyF(that);}
					  }
				   return;
				  });
				  obj.find(".focus_div").bind("click",function(){obj.find("input").focus();});
			  
			  }else{
				  obj.find("input").focus(function(){
					  obj.css({padding:"0"}).find(".focus_div").addClass(str).css({border: 0,padding: "6px 18px 6px 21px"});
					  if(typeof(op.verifyF)!="undefined"){op.verifyF(this);}
				  });
				  obj.click(function(){
					  obj.find("input").focus();
					  op.callback(thatz);
					  return false;
				  });
		  
					}
			 obj.find("input").blur(function(){	
			 		var that=$(this);
					if(isDIsOrOnly(that)){ return false;}
					  if(op.type==1&&that.css("display")!="none"){
						  obj.css({padding:"5px"}).find(".focus_div").removeClass(str).css({border:"1px solid #ddd",padding: "0 12px 0 15px"});
						  if(pass($.trim(that.attr("vertype")))&&that.attr("type")=="password"){ 
						    if(that.val()==""){
								thatobj=that.siblings("input");
								if(thatobj.size()>0){
									that.css("display","none")
									thatobj.css("display","inline-block"); 
									}
								
								//that.val(value);
								}
							}else{ if(that.val()==""){that.val(value);}}
						 if(typeof(op.verifyB)!="undefined"){op.verifyB(that);} 
					  }
					  return;
					  });
	    function isDIsOrOnly(obj){
			if(obj.attr("readonly")=="readonly"||obj.attr("readonly")==true||obj.attr("disabled")=="disabled"||obj.attr("disabled")==true){
				return true;
				}
			return false;
			}
		function setPassword(obj){
			var thatInput=obj.find("input");
			var newid=typeof(thatInput.attr("id"))!="undefined"?thatInput.attr("id"):"newinput";
			if(pass($.trim(thatInput.attr("vertype")))&&$.trim(thatInput.attr("type"))!="password"){
				var input='<input style="display:none;" type="password" class="'
					 +thatInput.attr("class")
					 +'"'
					 +' did="'
					 +newid;
				if(typeof(thatInput.attr("ne"))!="undefined"){input=input+'" ne="'+thatInput.attr("ne");}
				if(typeof(thatInput.attr("sus"))!="undefined"){input=input+'" sus="'+thatInput.attr("sus");}
				if(typeof(thatInput.attr("fill"))!="undefined"){input=input+'" fill="'+thatInput.attr("fill");}
				if(typeof(thatInput.attr("noform"))!="undefined"){input=input+'" noform="'+thatInput.attr("noform");}
				if(typeof(thatInput.attr("vertype"))!="undefined"){input=input+'" vertype="'+thatInput.attr("vertype");}
				if(typeof(thatInput.attr("autocomplete"))!="undefined"){input=input+'" autocomplete="'+thatInput.attr("autocomplete");}
				var nameTem=thatInput.attr("name");
				if(typeof(thatInput.attr("name"))!="undefined"){input=input+'" dname="'+nameTem;}
				input=input+'" value="" />';	
				
				thatInput.parent().prepend(input);	
				thatInput.attr({"name":nameTem+"02","id":newid+'02'});
				setTimeout(function(){
　　　　　　	　　	 $("input[type='password']").each(function(){
					 $(this).attr({"id": $(this).attr("did"),"name":$(this).attr("dname")});   
					});
				},1)
			//禁止粘贴复制
				thatInput.parent().find("input[type='password']").bind("cut copy paste",function(e){
								e.preventDefault();  
								});
			}else if(pass($.trim(thatInput.attr("vertype")))&&$.trim(thatInput.attr("type"))=="password"){
				//禁止粘贴复制
				thatInput.parent().find('#'+newid).bind("cut copy paste",function(e){
				e.preventDefault();  
				});
				}
			
			
			}	  
		function pass(strPass){
			var pass=["password","deal_password","okpassword","new_password","oldpassword","login_password","deal_pw"];
			for(key in pass){
				if(strPass==pass[key]){n=1; return true;}
				}
			return false;
			}	
			return;
};
/*
*buttonh滑过效果
*/
$.fn.hoverBtn = function() {
		$(this).hover(function(){
			$(this).addClass("btn01_1").removeClass("btn01");
			},function(){$(this).removeClass("btn01_1").addClass("btn01");});
		$(this).focus(function(){
			$(this).addClass("btn01_1").removeClass("btn01");
			});
		$(this).blur(function(){
			$(this).removeClass("btn01_1").addClass("btn01");
			});
			return;
};

/*进度条 rate
*callbackFull:标满的时候的回调函数
**/
$.fn.rate = function(options) {
	var my={};
	$.extend(my,options);
	var that=this;
	var objRate=that.find(".rate_div");
	objRate.append('<span class="pa">&nbsp;</span>');
	var rates=objRate.attr("rate");
	var n=0;//当前走过的进度
	if(parseFloat(rates)<1){
		that.find(".rate_num").html(rates+"%"); 
		objRate.find("span").css("width",parseFloat(rates)/100*objRate.width()+"px");
		return false;
	}
	var ratetime=setInterval(function(){
		that.find(".rate_num").html((++n)+"%");
		objRate.find("span").css("width",n/100*objRate.width()+"px");
		if(n>=parseInt(rates)){
			if(n<parseFloat(rates)){that.find(".rate_num").html(rates+"%");}
			objRate.find("span").css("width",rates/100*objRate.width()+"px");
			clearInterval(ratetime); if(typeof(my.callbackFull)!="undefined"){my.callbackFull(objRate);}}
		}, parseInt(600/rates)); 
	return;
};

})(jQuery);

//获取2位小数，不四舍五入
function Round2(temp) {
    temp = temp.toString();
    if (temp.indexOf(".") > -1) {
		if(temp.split(".")[1].length>2){ return temp.substring(0, temp.indexOf(".") + 3);}
		else{
			if(temp.split(".")[1].length==0){temp=temp+"00";}
			if(temp.split(".")[1].length==1){temp=temp+"0";}
			return temp;
			}  
    }
    else {
        return temp+".00";
    }
}
/*判断屏幕高度设置最小高度*/
//屏幕最小宽度，针对ie6
function screenHeight(){
	$("div.haiyin").css("width",$(window).width()>1200? "auto":"1200px");
	if($(window).height()>$("body").height()){

		  $("#wh").height($(window).height()-314);

		 }else{

			 $("#wh").attr("style","min-height:298px; height:auto; _height:298px;"); }
}
/*弹出框*/
function upWindow(operation){
	this.my={
		"id":"01",
		"title":"标题",
		"type" :"html",
		"html":"",
		"url" :"",
		"width": 1,
		"height" : 0,
        "class_c" :"win_cont",
		"div":".haiyin",
		"callback" : function(){},
		"closeback":function(){}
		}
	this.my=$.extend(this.my,operation);
	this.width=this.my.width<=1 ? $(window).width()*this.my.width : this.my.width;
	this.height=this.my.height<=1 ? $(window).height()*this.my.height : this.my.height;
	if (top != self) {
   		this.bodyobj=$('body', window.parent.document);
		this.wobj=$(window.parent.window);
		this.dobj=$(window.parent.document);
	}else{
		this.bodyobj=$('body');
		this.wobj=$(window);
		this.dobj=$(document);
		}		
	this.wh=this.wobj.height()>this.dobj.outerHeight(true)? this.wobj.height():this.dobj.outerHeight(true);
	this.ww=this.wobj.width()>this.dobj.outerWidth(true)? this.wobj.width():this.dobj.outerWidth(true);
	this.init();
	}
	
upWindow.prototype={
	constructor : upWindow,
	init : function(){
		var that=this;
		if($.trim(that.my.type)=="html"){that.htmlIn();}
        if($.trim(that.my.type)=="iframe"){that.iframeIn();}
		that.bodyobj.find("#up_close").click(function(){
			that.my.closeback();
			that.closeUP();
			});
		that.bodyobj.find("div.up_bg").height(that.wh);
		$(window).resize(function(){
			that.wh=that.wobj.height()>that.dobj.outerHeight(true)? that.wobj.height():that.dobj.outerHeight(true);
			that.ww=that.wobj.width()>that.dobj.outerWidth(true)? that.wobj.width():that.dobj.outerWidth(true);
			that.bodyobj.find("div.up_bg").height(that.wh);
				});
		that.my.callback(that);
		},
        iframeIn : function(){
        var that=this;
		var h=that.height==0?"auto" : that.height+'px';
		var html='<div class="up_window pf" id="up_'+that.my.id
			+'" style="width:'+that.width+'px;'+'height:'+h+';';
		if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
				html=html+'margin-left:'+(-that.width/2+$(window).scrollLeft())+'px;'+'margin-top:'+(-that.height/2+$(window).scrollTop())+'px';
			}else{
				html=html+'margin-left:'+(-that.width/2)+'px;'+'margin-top:'+(-that.height/2)+'px';
				}
		html=html+'">'
			+'<div class="up_cont mc">'
        		+'<h1 id="'+that.my.id+'_title" class="fn up_title "><span>'
			+that.my.title+'</span><i id="up_close" class="fr icon up_close">关闭</i></h1>'
            		+'<div class="up_div">'
			+'<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="100%" id="'+that.my.id+'_iframe" src='+that.my.url+'></iframe>'
			+'</div></div></div>';
			if(top != self){
				that.bodyobj.find("div.up_window").hide();
				}else{
					that.bodyobj.find(".up_bg").remove();
					that.bodyobj.find("div.up_window").remove();}
			if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
				that.bodyobj.addClass("html-body-overflow")
				}
			$(that.my.div).append('<div class="up_bg" style="height:'+that.wh+'px;"></div>');
			that.bodyobj.append(html);
			if(that.height==0){that.bodyobj.find("#up_"+that.my.id).css("marginTop",-that.bodyobj.find("#up_"+that.my.id).height()/2+"px");}  
            that.bodyobj.find("#"+that.my.id+'_iframe').addClass(that.my.class_c).height(that.bodyobj.find("#up_"+that.my.id).height()-that.bodyobj.find("#"+that.my.id+'_title').outerHeight(true));
        },
	htmlIn : function(){
		var that=this;
		var h=that.height==0?"auto" : that.height+'px';
		var html='<div class="up_window pf" id="up_'+that.my.id
					+'" style="width:'+that.width+'px;'+'height:'+h+';';
			if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
				 html=html+'margin-left:'+(-that.width/2+$(window).scrollLeft())+'px;'+'margin-top:'+(-that.height/2+$(window).scrollTop())+'px';
				}else{
					html=html+'margin-left:'+(-that.width/2)+'px;'+'margin-top:'+(-that.height/2)+'px';
					}			
				html=html+'">'
					+'<div class="up_cont mc">'
        			+'<h1  id="'+that.my.id+'_title" class="fn up_title "><span>'
					+that.my.title+'</span><input type="button" id="up_close" class="fr up_close icon" value="关闭" /></h1>'
            		+'<div class="up_div" style="overflow:auto;">'
					+that.my.html
					+'</div></div></div>';
			if(top != self){
				that.bodyobj.find("div.up_window").hide();
				}else{that.bodyobj.find(".up_bg").remove();
					that.bodyobj.find("div.up_window").remove();}
			if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
				that.bodyobj.addClass("html-body-overflow")
				}
			$(that.my.div).append('<div class="up_bg" style="height:'+that.wh+'px;"></div>');
			that.bodyobj.append(html);
			that.bodyobj.find("#up_"+that.my.id).find("div.up_div").height(that.bodyobj.find("#up_"+that.my.id).height()-that.bodyobj.find("#"+that.my.id+'_title').outerHeight(true));
            that.bodyobj.find("#up_"+that.my.id).addClass(that.my.class_c);
			if(that.height==0){that.bodyobj.find("#up_"+that.my.id).css("marginTop",-that.bodyobj.find("#up_"+that.my.id).height()/2+"px");}
		},
	closeUP : function(){
		if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
				this.bodyobj.removeClass("html-body-overflow");
				}
		this.bodyobj.find(".up_bg").remove();
		this.bodyobj.find("#up_"+this.my.id).remove();
		} 
		
	}
/*table 删除行颜色向下变化*/	
function del_tr(that){
	var objNext=$(that).parents("tr").nextAll("tr");
	$(that).parents("tr").remove();
	objNext.each(function() {
		if($(this).hasClass("tbg")){$(this).removeClass("tbg");}
		else{$(this).addClass("tbg");}
  	  });
	/* del_server(); 对服务器操作*/
	}
	
	
/*选择弹出框回调函数*/
function selectBack(that){
	var obj_s=$(that).parent().find("div.select_cont");
	/*初始化*/
	var s_str=$(that).find("h4").text().split(" ");
	obj_s.find("a").each(function() {
        if($.trim($(this).text())==s_str[0]){
			$(this).addClass("on_a").siblings("a").removeClass("on_a").parent().siblings().find("a").removeClass("on_a");
			}
    });
	obj_s.parent().parent().mouseleave(function(){
		
	   obj_s.slideUp(); 
	   /*设置初始化值*/
	   setStarValue(that,obj_s);
	   
		$(that).parent().find(".notice_input").hide();
		obj_s.find("dl.select_tab>dd").first().addClass("on_s").siblings("dd").removeClass("on_s");
		obj_s.find("dl.select_div").show();
		obj_s.find(".city_select").remove();
		});
	if(obj_s.css("display")!="block"){
		obj_s.stop(true).slideDown().find("dl.select_div a").click(function(){
			$(that).parent().find("a").removeClass("on_a");
			$(this).addClass("on_a");
			$(that).find("input,h4").val($(this).text());
			$(that).parent().parent().find(".notice_input").hide(); 
			//跳到城市列表
			obj_s.find("dl.select_tab>dd").last().addClass("on_s").siblings("dd").removeClass("on_s");
			obj_s.find("dl.select_div").hide();
			obj_s.find(".city_select").remove();
			obj_s.append('<div class="clearfix city_select"></div>');
				
			//插入各自的城市
			var a_id=$.trim($(this).attr("id"));
			var a_str=$.trim($(that).find("h4").text()).split(" ");
			appendCity(obj_s.find(".city_select"),a_str[1],a_id);
			clickCity(obj_s,that);
			
			return false;
			});
		obj_s.find("dl.select_tab>dd").click(function(){
			var index=$(this).index();
			$(this).addClass("on_s").siblings("dd").removeClass("on_s");
			obj_s.find(".city_select").remove();
			
			if(index==1){
				
				obj_s.find("dl.select_div").hide();
				obj_s.append('<div class="clearfix city_select"></div>');
				
				//插入各自的城市
				var app_str=$.trim($(that).find("h4").text()).split(" ");
				appendCity(obj_s.find(".city_select"),app_str[1],obj_s.find("a.on_a").attr("id"));
				clickCity(obj_s,that);
				}else{
					obj_s.find("dl.select_div").show();
					obj_s.find(".city_select").remove();
					}
			});
		}
	
	}
function setStarValue(that,obj_s){ /*设置初始化值*/
	
	 var h4Str=$.trim($(that).find("h4").text());
		if(h4Str==""||h4Str=="请选择城市"||h4Str.split(" ").length<2){
			 h4Str=obj_s.find(".select_div a.on_a").html();
			 if(obj_s.find(".city_select").size()>0){
				 h4Str=h4Str+" "+obj_s.find(".city_select a.on_a").html();
				 }else{
					 h4Str=h4Str+" "+ arrayCitys()[obj_s.find(".select_div a.on_a").attr("id")][0];
					 }
			 
			 $(that).find("h4,input").text(h4Str);
			$(that).parent().parent().find(".notice_input").hide(); 
			}
	
	}
	
function clickCity(obj_s,that){/*城市点击设置*/
  obj_s.find(".city_select>a").click(function(){
	  $(that).find("h4").text(obj_s.find(".select_div a.on_a").text()+" "+$(this).text());
	  $(that).find("input").val(obj_s.find(".select_div a.on_a").text()+" "+$(this).text());
	  $(that).parent().parent().find(".notice_input").hide();
	  obj_s.stop(true).slideUp(function(){
		  obj_s.find("div.city_select").remove();
		  obj_s.find("dl.select_div").show();
		  $(that).parent().find("dl.select_tab>dd").first().addClass("on_s").siblings("dd").removeClass("on_s");
		  }); 
	  
	  return false;
	  });
		  
	}

function arrayCitys(){
	return {
	a01:["合肥","芜湖","蚌埠","淮南","马鞍山","淮北","铜陵","安庆","黄山","滁州","阜阳","宿州","巢湖","六安","亳州","池州","宣城"],
	a02:["澳门"],
	a03:["北京"],
	a04:["重庆"],
	a05:["福州","厦门","莆田","三明","泉州","漳州","南平","龙岩","宁德"],
	a06:["广州","深圳","珠海","汕头","韶关","佛山","江门","湛江","茂名","肇庆","惠州","梅州","汕尾","河源","阳江","清远","东莞","中山","潮州","揭阳","云浮","顺德","潮阳"],
	a07:["南宁","柳州","桂林","梧州","北海","防城港","钦州","贵港","玉林","百色","贺州","河池","来宾","崇左"],
	a08:["贵阳","六盘水","遵义","安顺","都均","凯里","铜仁","毕节","兴义"],
	a09:["兰州","金昌","白银","天水","嘉峪关","武威","张掖","平凉","酒泉","庆阳","定西","陇南"],
	h01:["石家庄","唐山","秦皇岛","邯郸","邢台","保定","张家口","承德","沧州","廊坊","衡水"],
	h02:["哈尔滨","齐齐哈尔","鹤岗","双鸭山","鸡西","大庆","伊春","牡丹江","佳木斯","七台河","黑河","绥化","加格达奇"],
	h03:["郑州","开封","洛阳","平顶山","安阳","鹤壁","新乡","焦作","濮阳","许昌","漯河","三门峡","南阳","商丘","信阳","周口","驻马店"],
	h04:["武汉","黄石","十堰","荆州","宜昌","襄阳","鄂州","荆门","孝感","黄冈","咸宁","随州","恩施","江汉"],
	h05:["长沙","株洲","湘潭","衡阳","邵阳","岳阳","常德","张家界","益阳","郴州","永州","怀化","娄底","吉首"],
	h06:["海口","三亚","儋州"],
	h07:["长春","吉林","四平","辽源","通化","白山","松原","白城","延吉","珲春"],
	h08:["南京","无锡","徐州","常州","苏州","南通","连云港","淮安","盐城","扬州","镇江","泰州","宿迁"],
	h09:["杭州","宁波","温州","嘉兴","湖州","绍兴","金华","衢州","舟山","台州","丽水"],
	h10:["南昌","景德镇","萍乡","九江","新余","鹰潭","赣州","吉安","宜春","抚州","上饶"],
	l01:["沈阳","大连","鞍山","抚顺","本溪","丹东","锦州","营口","阜新","辽阳","盘锦","铁岭","朝阳","葫芦岛"],
	l02:["呼和浩特","包头","乌海","赤峰","通辽","鄂尔多斯","呼伦贝尔","巴彦淖尔","乌兰察布","锡林浩特","乌兰浩特","阿拉善左旗"],
	l03:["银川","石嘴山","吴忠","固原","中卫"],
	l04:["西宁","海东","同仁","共和","玛沁","玉树","德令哈"],
	l05:["太原","大同","朔州","阳泉","长治","晋城","忻州","晋中","临汾","运城","吕梁"],
	l06:["上海"],
	l07:["济南","青岛","淄博","枣庄","东营","烟台","潍坊","济宁","泰安","威海","日照","莱芜","临沂","德州","聊城","滨州","菏泽"],
	l08:["成都","自贡","攀枝花","泸州","德阳","绵阳","广元","遂宁","内江","乐山","南充","眉山","宜宾","广安","达州","雅安","巴中","资阳"],
	l09:["西安","铜川","宝鸡","咸阳","渭南","延安","汉中","榆林","安康","商洛"],
	t01:["天津"],
	t02:["台北","高雄","基隆","台中","台南","新竹","嘉义"],
	t03:["拉萨","日喀则","山南"],
	t04:["乌鲁木齐","克拉玛依"],
	t05:["香港"],
	t06:["昆明","曲靖","玉溪","保山","昭通","丽江","普洱","临沧","大理","个旧","文山","楚雄","思茅","景洪","潞西","东川","六库","中甸"]
	}
	
	}
/*插入城市 
*参数：
*obj:即将插入的div 
*str：初始化的内容 
*id：插入内容的索引
*/
function appendCity(obj,str,id){
  var arrayCity=arrayCitys();
	var j=1;
 for(var i in arrayCity[$.trim(id)]){
	 if(j==1){
		 obj.append('<a class="on_a" id="c'+j+'" href="">'+arrayCity[$.trim(id)][i]+'</a>');
		 }else{
		  obj.append('<a id="c'+j+'" href="">'+arrayCity[$.trim(id)][i]+'</a>');
		 }
	
	 j++;
	 if(typeof(str)!="undefined"&&arrayCity[$.trim(id)][i]==str){
		 obj.find("a").removeClass("on_a").last().addClass("on_a");
		 }
	 }                 
}

$(function() {
	 /*select焦点*/
	 $(".focus_select").each(function(){
		 $(this).find("h4").text($(this).find("input").val());
		 });
	$(".focus_select").each(function(){
		$(this).focusInput({
			type:0,
			callback:selectBack
			});
	 });
	 /*input btn鼠标滑过*/
	 $("input[type='button'],input[type='submit']").each(function(){
		$(this).hoverBtn();
	});

	 
	
	
	screenHeight();
	$(window).load(function(){
		screenHeight();
		});
	$(window).resize(function(){screenHeight();});
	/*nav*/
	$("#nav").find("ul").mouseenter(function(){
		$(this).parent().addClass("on_nav");
		});
	$("#nav").find("dd>a,dt>a").mouseenter(function(){
		$(this).parent().addClass("on_nav");
		if($(this).parent().find("ul").length> 0){
			$(this).parent().find("ul").show();
			}
		});
		$("#nav").find("dd,dt").mouseleave(function(){
			if($(this).find("ul").length> 0){
				$(this).find("ul").stop(true,true).hide();
			}
			$(this).removeClass("on_nav");
			});
	/*menu*/
	/*后台*/
	$("#menu").find("dt").not(".noa").click(function(){
		var that=$(this);
		var id=$.trim(that.parent().attr("id"));
		if(id=="on_menu"){
			that.addClass("mb0").siblings("dd").slideUp();	
			that.parent().removeAttr("id");
			}else{
			that.removeClass("mb0").siblings("dd").stop(true).slideDown().parent().addClass("on_menu on_icon").attr("id","on_menu")
			.siblings("dl").removeClass("on_menu on_icon").removeAttr("id").find("dd").slideUp();	
				}
		return false;
		});


/*选择支付方式*/	
$("dd.more_up").find("a.aimg").click(function(){
	$(this).addClass("on_check").siblings("a.aimg").removeClass("on_check").parent().siblings("dd.more_up").find("a.aimg").removeClass("on_check");
	$("#recharge").find("div").removeClass("on_check");
	return false;
	});
$("#stop_re").click(function(){
	if($("#rec_way").css("display")=="none"){
		var obj;
		if($(".more_up").find(".on_check").size()>0){
			$("dd.more_up").slideUp();
			$("#recharge").show();
			 obj=$("dd.more_up").find("a.on_check>span");
			if(obj.size()>0){
				$("#recharge").find("span").attr({"title":obj.attr("title"),"class":obj.attr("class")});
				$("#recharge").find("div").addClass("on_check").show();
			}
			}
		}else{
			$("dd.more_up").slideUp();
			obj=$("dd.more_up").find("a.on_check>span");
			if(obj.size()>0){
				$("#recharge").find("span").attr({"title":obj.attr("title"),"class":obj.attr("class")});
			}
			$("#recharge").show().find("div").addClass("on_check").show();
			}
	
	$("#more_re").show();
	return false;
	});
$("#more_re").click(function(){
	$("dd.more_up").slideDown();
	$("#recharge").find("div").removeClass("on_check");
	$(this).hide();
	return false;
	});
	

/*radio*/
$("input[type='radio']").click(function(){
	$(this).parent().find("input").removeAttr("checked");
    $(this).attr("checked","checked");
   
	});	

/*进度条 rate*/
$("div.inv_rate").each(function() {
   $(this).rate(); 
});

/*置顶导航*/

var rollSet = $('#scroll_tab02');// 检查对象，#scroll_tab02是要随滚动条固定的ID，可根据需要更改
	 
if(rollSet.size()>0){
	var offset = rollSet.offset();
	$(window).scroll(function () {
	// 检查对象的顶部是否在游览器可见的范围内
	var scrollTop = $(window).scrollTop();
	if(offset.top < scrollTop){
		$("#scroll_tab").css({width:$(window).width()>1200? $(window).width():1200+"px"}).find("dl").addClass("w1160 mc");
	$(window).resize(function() {
		$("#scroll_tab").css({width:$(window).width()>1200? $(window).width():1200+"px"});
	});
	 $("#scroll_tab").removeClass("none");
	  $("#scroll_tab").find("a[hrefid='"+checkTop(scrollTop)+"']").parent().attr("id","on_tab").siblings().removeAttr("id");
	}else{
	 $("#scroll_tab").addClass("none");
	}
	});
}
function ddsNext(ddsArrey,onkey){
	var len=ddsArrey.length;
	var j=0;
	for(var key in ddsArrey){
		if(j>len&&ddsArrey[key]!=0){return key;}
		if(key==onkey){len=j;};
		j++;
	}
	return onkey;
}
function checkTop(top){
	var dds={};
	$("#scroll_tab").find("dd").each(function() {
		 var id=$(this).find("a").attr("hrefid");
		    if($(id).size()<1||$(id).css("display")=="none"){dds[id]=0;}else{dds[id]=$(id).offset().top-57;}
	});
	
	var onkey="";
	for(var key in dds ){
		 if(top>=dds[key]&&dds[key]!=0){onkey=key; }
		}

	if(top+$(window).height()>=$(document).outerHeight(true)){
		
	    return ddsNext(dds,onkey); 
	  }
	
	return onkey;
	}
//点击置顶滚动到相应的位置

$("#scroll_tab,#scroll_tab02").find("dd").click(function(){
	$(this).siblings().removeAttr("id");
	if($(this).parent().parent().attr("id")=="scroll_tab"){
		$(this).attr("id","on_tab");
		}
	var id=$(this).find("a").attr("hrefid");
	$(window).scrollTop($(id).offset().top-57);
	});


/*帮助中心_列表*/
$("#help_list").not(".help_center").find("h3").click(function(){
	var obj=$(this).next(".help_detail");
	if(!obj.hasClass("helip")){
		obj.addClass("helip").show();
		$(this).parent().siblings("li").find(".help_detail").removeClass("helip").hide();
		}else{
			obj.removeClass("helip").hide();
			}
	
	});
/*账户中心首页，ie6鼠标滑过的时候显示标题*/
if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
		$("#imghover").hover(
		function(){$(this).find("span").show();}
		,function(){$(this).find("span").hide()});
				}
				
/*转让详情图片点击放大效果*/

$(".picScroll-left").find(".pic a").bind("click",function(){
	if($("#header_userName").text()==""||$("#header_userName").text().length==0||$("#header_userName").size()<=0){loginUser();return false;}
	 var wh=$(document).height();
	 var ww=$(window).width()>1200? $(window).width():1200;
	 var src=$(this).find("img").attr("src");
	 var html= '<div id="max_imgbg" class="up_bg " style="height:'+wh+'px; width:'+ww+'px;"></div>'
	 		   +'<div id="max_img" class="max_img pa" ><img src="'
			   +src
			   +'" /><span class="pa" style="display:none;" >&nbsp;</span></div>';
	 
	 $("body").append(html);
	
	 $(window).resize(function(){
		  var wh=$(document).height();
		  var ww=$(window).width()>1200? $(window).width():1200;
		   $("#max_imgbg").height(wh).width(ww);
		 });
	 var imgh=PreviewImg(0,0);

	 $("#max_img").css({
		 "height":imgh.height+8,
		 "width":imgh.width+8,
		 "margin-top":$(window).scrollTop()-imgh.height/2+"px",
		 "margin-left":-imgh.width/2+"px"
		 }).slideDown().find("span").bind("click",function(){
		 $("#max_img").slideUp(function(){
			 $("#max_imgbg").hide().remove();
			 $("#max_img").remove();
			 });
		 });
	  $("#max_img").find("img").load(function() {
			
			 var imgpre=PreviewImg(this.width,this.height);
			 $("#max_img").animate({ 
					"height":imgpre.height+8,
					"width":imgpre.width+8,
					"margin-top":$(window).scrollTop()-imgpre.height/2+"px",
				   "margin-left":-imgpre.width/2+"px" 
				  }, 300,function(){
					 $("#max_img").find("span").show(300);
					 } ).find("img").css({
				 "height":imgpre.height,
				 "width":imgpre.width});
		 }).error(function(){

              $("#max_img").find("span").show(300);

        });
	 return false;
	 });
/*推荐码*/
$("#rcode_c").toggle(function(){
	$(this).find("i").addClass("onrcode_cion").removeClass("rcode_cion").parent().parent().next(".rcode").show();
	},function(){$(this).find("i").addClass("rcode_cion").removeClass("onrcode_cion").parent().parent().next(".rcode").hide();});
	
/*关于我们置顶*/
if($("#aboutnav").size()>0){	
	aboutnavFun()
$(window).scroll(function(){
	aboutnavFun()
	
	});
	
	}

/*注册登录焦点*/
if($("#focuspage").size()>0){
	
	$(window).scrollTop($("#focuspage").offset().top);
	}


});

function aboutnavFun(){
	if($(window).scrollTop()>($("#aboutnav").offset().top+$("#aboutnav").height())){
		if($("#aboutnav02").size()<=0){
			$("#aboutnav").clone().appendTo("body").addClass("pf onscroll").attr("id","aboutnav02");
			}
		
		
		}else{$("#aboutnav02").remove();}
	}
	
function PreviewImg(width,height){
	       var imgh=height,imgw=width,imgwold=0;
		   if(height>$(window).height()){
			   imgh=$(window).height()-8;
			   imgwold=width*imgh/height;
			   }
		   if(imgwold>$(window).width()){
			   imgw=$(window).width()-8;
			   imgh=height*imgw/imgwold;
			   }else if(imgwold!=0){imgw=imgwold;}
		  if(width==0){
			  imgh=360;imgw=480;
			  }
	       return {"width":imgw,"height":imgh} ;
	 }
//复制链接
//
//function copy_code(copyText)
//{
//if (window.clipboardData)
//{
//window.clipboardData.setData("Text", copyText)
//}
//else
//{
//var flashcopier = 'flashcopier';
//if(!document.getElementById(flashcopier))
//{
//var divholder = document.createElement('div');
//divholder.id = flashcopier;
//document.body.appendChild(divholder);
//}
//document.getElementById(flashcopier).innerHTML = '';
//var divinfo = '<embed src="clipboard.swf" FlashVars="clipboard='+encodeURIComponent(copyText)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
//document.getElementById(flashcopier).innerHTML = divinfo;
//}
//
//$(".copyresult").html("复制链接成功！");
//}


$(function() {$(".copybtn").click(function(){

	var copytxt=$(".copytxt").html();
	copy_code(copytxt);
	})
})


$(function() {
	
	$(".honor li").each(function(){
		
	  //  var img_w= $(this).find("img").width();
	  //  var img_h=$(this).find("img").height();
		// $(this).find(".markred").width(img_w).height(img_h);
		 
		 $(this).hover(function(){
			  $(this).find(".markred").fadeIn(150);$(this).find(".txt").fadeIn(150);
			 },function(){
				  $(this).find(".markred").hide();$(this).find(".txt").hide();}
			 )
		})
	

})

/*微信*/
$(function() {
	

		 
		$("#wechat").hover(function(){
			 $(" .weixin").fadeIn(300);
			 },function(){
				 $(".weixin").hide();}
			 )
		
	

})
/*公告*/
$(function() {
$("#notice_data dd:last-child").attr("class", "last");
});
/*公告列展示（三个）*/
var noticeShow = function(divId,url){
	$.ajax({
		type : "post",
		async : true, // 同步请求
		url : basePath + "/notice/indexlist",
		data: "url="+url,
		success : function(dates) {
			// alert(dates);
			$("#"+divId).html(dates);// 要刷新的div
		},
		error : function() {
			
		}
	});
	return false;
}

var view_article = function(id){
	$.ajax({
		type : "post",
		async : true, // 同步请求
		url : basePath + "/noticeView",
		data : "id="+id,
		success : function(dates) {
			// alert(dates);
			//$("#notice").html(dates);// 要刷新的div
		},
		error : function() {
			
		}
	});
	return false;
}


/*切换*/
$(function(){
	var $tabmenu=$(".tab_menu li");
	
	      
	$tabmenu.click(function(){
		     var	$tabparent=	$(this).parents(".tabarea");
			  var $tabbox=   $tabparent.find(".tablist");
		
			var  index = $tabmenu.index(this);
			  $(this).addClass("selected").siblings().removeClass("selected");	
			  
			$tabbox.eq(index).fadeIn(300).siblings().hide();		 
						 


	})
  })
var returnDable=true;

var setReturnDable=function(status,e){
	returnDable=status;
	if(!status&&typeof(e)!="undefined"){ e.preventDefault(); }else if(status){ 
	if(e&&e.preventDefault){
		window.event.returnValue = false;
		
		}}
	}   


/**
 * js金额字符串formart
 *  
 *
 * @example $("#fmoney").numeral(12321.23,2)
 *
 **/
	function fmoney(s, n)   
{   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1],   
   t = "";   
   for(var i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
}