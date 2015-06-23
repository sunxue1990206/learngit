/**
 * 
 */

function ajaxFun(url, backFun) {
	_ajaxFunction({
		url : url,
		backFun : backFun
	});
}

function ajaxFunTip(url, backFun, tipId) {
	_ajaxFunction({
		url : url,
		backFun : backFun,
		tipId : tipId
	});
}

function fmoney(s, n)  
{  
   n = n > 0 && n <= 20 ? n : 2;  
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
   var l = s.split(".")[0].split("").reverse(),  
   r = s.split(".")[1];  
   t = "";  
   for(i = 0; i < l.length; i ++ )  
   {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
   }  
   return t.split("").reverse().join("") + "." + r;  
}

function ajaxFunTipForm(url, backFun, tipId, formId) {
	var $form = $("#" + formId);
	if ($form.length == 0) {
		$form = $("form");
	}
	_ajaxFunction({
		url : url,
		backFun : backFun,
		tipId : tipId,
		data : $form.serialize()
	});
}

function ajaxFunTipFormErrorBack(url, backFun, errorBack, tipId, formId) {
	var $form = $("#" + formId);
	if ($form.length == 0) {
		$form = $("form");
	}
	_ajaxFunction({
		url : url,
		backFun : backFun,
		tipId : tipId,
		errorBackFun:errorBack,
		data : $form.serialize()
	});
}

function ajaxFunFormErrorBack(url, backFun, errorBack, formId) {
	var $form = $("#" + formId);
	if ($form.length == 0) {
		$form = $("form");
	}
	_ajaxFunction({
		url : url,
		backFun : backFun,
		errorBackFun:errorBack,
		data : $form.serialize()
	});
}

function _ajaxFunction(option) {
	var default_Option = {
		async : true,
		cache : false,
		type : 'POST',
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		dataType : 'json',
		global : true,
		tipId : 'error_tip'
	}
	var new_option = $.extend(default_Option,option);
	$.ajax({
		url : new_option.url,
		async : new_option.async,
		cache : new_option.cache,
		type : new_option.type,
		contentType : new_option.contentType,
		crossDomain : new_option.crossDomain,
		dataType : new_option.dataType,
		global : new_option.global,
		error : new_option.error,
		data : new_option.data,
		success : function(data, textStatus, jqXHR) {
			if (returnFail(data)) {
				var $tip = $("#" + new_option.tipId);
				if (isNotEmptyJqueryObj($tip)) {
					$tip.html(data.errorMsg).css("visibility", "block");
				}
			}
			if (new_option.backFun) {
				new_option.backFun(data, textStatus, jqXHR);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			var $tip = $("#" + new_option.tipId);
			if (new_option.errorBackFun) {
				new_option
						.errorBackFun(XMLHttpRequest, textStatus, errorThrown);
			} else if (isNotEmptyJqueryObj($tip)) {
				$tip.html(data.errorMsg).css("visibility", "block");
			} else {
				alert(XMLHttpRequest.responseText+";"+textStatus+";"+errorThrown+";"+XMLHttpRequest.readyState+";"+XMLHttpRequest.status);
			}

		}
	});
}

function returnFail(data) {
	if ("999" == data.status || 999 == data.status) {
		return true;
	}
	return false;
}

function isNotEmptyJqueryObj($obj) {
	if ($obj && $obj.length > 0) {
		return true;
	}
	return false;
}

var getDateByDay=function(num){
	var today=new Date();
	today.setDate(today.getDate() + num);
	return getStringDate(today);
}
var getDateByMonth=function(num){
	var today=new Date();
	today.setMonth(today.getMonth() + num);
	return getStringDate(today);
}
var getStringDate=function(today){
	return today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" 00:00:00";
}
var getcurrenthhmmss = function(str){
	var today=new Date(str.split(".")[0],str.split(".")[1]-1,str.split(".")[2]);
	today.setDate(today.getDate() + 1);
	return getStringDate(today);
}

/**
 * 判断对象为空
 * JSObject.isNull(obj);
 */
var JSObject = '';
String.prototype.isNull = function(obj){
	if(obj==null||typeof(obj)=='undefined'||obj.length==0){
		return true;
	} else {
		return false;
	}
}

var handleError = function(data){
	if(data.indexOf("510") == 0) {
		top.location.href = basePath + "/error/forward502?random="+Math.random()+"&error="+data;
	}
}

var handAjaxError = function(XMLHttpRequest, textStatus, errorThrown){
	if(XMLHttpRequest.readyState == 0 || XMLHttpRequest.readyState == "0"){
		if(XMLHttpRequest.status == 0 ||  XMLHttpRequest.status == "0"){
			alert("很抱歉,您操作的过于频繁，请稍后再试！");
		}
	}
}