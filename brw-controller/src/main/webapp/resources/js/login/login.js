
var loginToInvest = function(url,ucsdomain,url1){
	var checkFlag=1;
	if($('#forget_user').attr("checked")=='checked'){
		checkFlag=1;
		//setCookie("userName",$('#username').val());
	}else{
		checkFlag=0;
		//delCookie("userName");
	}
	
	var param = "username="+$('#username').val()+"&password="+$('input[name="password"]').val()+"&validCode="+$('#captcha').val()+"&forget_user="+checkFlag;
	// var url = url + "?"+param;

	// window.parent.location.href = url;
	
	// window.parent.location.reload();
	param.domain = ucsdomain;
	$.ajax({
		url : url+"?callback=?",
		dataType: 'jsonp',
		traditional: true,	// Server only supports traditional style params
		data : param,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		success : function(data, textStatus, jqXHR) {
			if(data.status=='0000'){
				window.parent.location.reload();
			}else{
				setReturnDable(true);
				$("#captcha_id").css("display","block");
				jQuery("#captcha_img").attr("src",url1+"&random="+new Date().getTime());
				jQuery.method.noticeWordDisplay($("#notice_input"),"v",{"type":0,"message":data.errorMsg});
				
			}
	
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			setReturnDable(true);
			jQuery.method.noticeWordDisplay($("#notice_input"),"v",{"type":0,"message":textStatus});
		}
	});
	
// $.ajax({
// url : url,
// type : "POST",
// contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
// data : param,
// success : function(data, textStatus, jqXHR) {
// if(data.status == "100"){
// var id = $('#productId', parent.document).val();
// var throwNum = $('#throw_num', parent.document).val();
// var param = id+"?throwNum="+throwNum;
// window.parent.location.href=basePath + "/lend/detailPage/" + param;
// }
// // $('#loanUserId', parent.document).html(data);
// // parent.upWindow01.closeUP();
// },
// error : function(XMLHttpRequest, textStatus, errorThrown) {
// //alert("error");
// }
// });
}

jQuery(document).ready(function(e) {
	/* 登录验证 */
	
	
	jQuery("form.login_form").loginVerify({
		
		mes : "top",
		oksubmit : function(sus, that, myDate) {
			
			if (sus == 1) {
			
				var url=that.find("[vertype='ok_btn']").attr("url");
				var url1=that.find("[vertype='ok_btn']").attr("url1");
				var ucsDomain=that.find("[vertype='ok_btn']").attr("ucsDomain");
				
				loginToInvest(url,ucsDomain,url1);
				/* 登录密码输错1次，页面展现图形验证码，登录密码连续输错6次，账号冻结，明日凌晨解冻 */
			}
		}
	});
});
var  getCaptcha=function(url){
	
	jQuery("#captcha_img").attr("src",url+"&random="+new Date().getTime());
	return false;
	 
}
var setCookie=function(name, objValue) {//设置cookie
	  var str = name + "=" + escape(objValue)+";";
	  var date = new Date();
	  var ms = 7*24*3600*1000;
	  date.setTime(date.getTime() + ms);
	  str += "; expires=" + date.toGMTString();
	   document.cookie = str;
}
var getCookie=function(name){//取cookies函数       
	 var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null; 
	}
var delCookie=function(name){//删除cookie
	var date = new Date();
 date.setTime(date.getTime() - 10000);
 document.cookie = name + "=a; expires=" + date.toGMTString();
}
