var getDateByDay=function(num){
	var today=new Date();
	today.setDate(today.getDate() + num);
	return getStringDate(today);
}
var getDateByMonth=function(num){
	var today=new Date();
	var oldDay = getLastDay(today);
	var newDay = getNewDay(today,num);
	if(oldDay > newDay){
		today.setDate(newDay);
	}
	today.setMonth(today.getMonth() + num);
	return getStringDate(today);
}
var getDateByMonthAndDay=function(num){
	var today=new Date();
	var oldDay = getLastDay(today);
	var newDay = getNewDay(today,num);
	if(oldDay > newDay){
		today.setDate(newDay);
	}
	today.setMonth(today.getMonth() + num);
	today.setDate(today.getDate() + 1);
	return getStringDate(today);
}
var getStringDate=function(today){
	return today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" 00:00:00";
}
var getStartDate = function(str){
	var today=new Date(str.split(".")[0],str.split(".")[1]-1,str.split(".")[2]);
	return getStringDate(today);
}
var getEndDate = function(str){
	var today=new Date(str.split(".")[0],str.split(".")[1]-1,str.split(".")[2]);
	today.setDate(today.getDate() + 1);
	return getStringDate(today);
}
var getDisplayDate = function(str){
	return str.replace(/-/g,".").split(" ")[0];
}
var getDisplayEndDate = function(str){
	var displayDate = str.replace(/-/g,".").split(" ")[0];
	var today=new Date(displayDate.split(".")[0],displayDate.split(".")[1]-1,displayDate.split(".")[2]);
	today.setDate(today.getDate() - 1);
	return today.getFullYear()+"."+(today.getMonth()+1)+"."+today.getDate();
}
var getUrlFutureParam = function(num){
	return "?"+getAjaxFutureParam(num);
}
var getUrlBackParam = function(num){
	return "?"+getAjaxBackParam(num);
} 
var getAjaxBackParam = function(num){
	var param = "random="+Math.random();
	var beginTime="";
	var endTime="";
	if(num == 0 || num== "0"){
		$("#start_time").val("");
		$("#end_time").val("");
	}
	if(num == 1 || num == "1"){
		beginTime = getDateByDay(-6);
		endTime = getDateByDay(1);
	}
	if(num == 2 || num == "2"){
		beginTime = getDateByMonth(-1);
		endTime = getDateByDay(1);
	}
	if(num == 3 || num == "3"){
		beginTime = getDateByMonth(-6);
		endTime = getDateByDay(1);
	}
	//对页面进行赋值
	if(beginTime != ""){ $("#start_time").val(getDisplayDate(beginTime)); }
	if(endTime != "") { $("#end_time").val(getDisplayEndDate(endTime)); }
	
	//获取时间
	if(beginTime == "" && $("#start_time").val() != ""){
		beginTime=getStartDate($("#start_time").val());
	}
	if(endTime == "" && $("#end_time").val() != ""){
		endTime=getEndDate($("#end_time").val());
	}
	param+="&beginTime="+beginTime+"&endTime="+endTime;
	return param;
}

var getAjaxFutureParam = function(num){
	var param = "random="+Math.random();
	var beginTime="";
	var endTime="";
	if(num == 0 || num== "0"){
		$("#start_time").val("");
		$("#end_time").val("");
	}
	if(num == 1 || num == "1"){
		beginTime = getDateByDay(0);
		endTime = getDateByDay(7);
	}
	if(num == 2 || num == "2"){
		beginTime = getDateByDay(0);
		endTime = getDateByMonthAndDay(1);
	}
	if(num == 3 || num == "3"){
		beginTime = getDateByDay(0);
		endTime = getDateByMonthAndDay(6);
	}
	//对页面进行赋值
	if(beginTime != ""){ $("#start_time").val(getDisplayDate(beginTime));}
	if(endTime != "") { $("#end_time").val(getDisplayEndDate(endTime)); }
	//获取时间
	if(beginTime == "" && $("#start_time").val() != ""){
		beginTime=getStartDate($("#start_time").val());
	}
	if(endTime == "" && $("#end_time").val() != ""){
		endTime=getEndDate($("#end_time").val());
	}
	param+="&beginTime="+beginTime+"&endTime="+endTime;
	return param;
}

var getSearchStatus = function(status){
	return "&status="+status;
}
var getUrlFuture =  function(){
	return "?"+getAjaxFuture();
}

var getAjaxFuture =  function(){
	var num = $("#all").parent().parent().find("dd.on_dd").attr("name");
	var status = $("#sta01").parent().parent().find("dd.on_dd").attr("name");
	return getAjaxFutureParam(num)+getSearchStatus(status)+getInvestmentHoldId();
}

var getUrlBack =  function(){
	return "?"+getAjaxBack();
}

var getAjaxBack =  function(){
	var num = $("#all").parent().parent().find("dd.on_dd").attr("name");
	var status = $("#sta01").parent().parent().find("dd.on_dd").attr("name");
	return getAjaxBackParam(num)+getSearchStatus(status)+getInvestmentHoldId();
}

var getInvestmentHoldId = function(){
	var investmentHoldId = $("#investmentHoldId").val();
	return "&investmentHoldId="+investmentHoldId;
}

//针对还款计划的参数
var getPlan = function(){
	var status = $("#sta01").parent().parent().find("dd.on_dd").attr("name");
	if(status == "10" || status == 10){
		return getAjaxBack();
	}
	if(status == "11" || status == 11){
		return getAjaxFuture();
	}
	if(status == "12" || status == 12){
		return getAjaxBack();
	}
}

var handTimeCss = function(num){
	//处理样式
	$("#all").parent().parent().find("dd").removeClass("on_dd");
	$("#all").parent().parent().find("dd[name='"+num+"']").addClass("on_dd");
}

var handStatusCss = function(num){
	//处理样式
	$("#sta01").parent().parent().find("dd").removeClass("on_dd");
	$("#sta01").parent().parent().find("dd[name='"+num+"']").addClass("on_dd");
}

var getLastDay = function(today){
	var today=new Date(today.getYear(),today.getMonth()+1,0);
	return today.getDate();
}

var getNewDay = function(today,num){
	var today=new Date(today.getYear(),today.getMonth()+1+num,0);
	return today.getDate();
}