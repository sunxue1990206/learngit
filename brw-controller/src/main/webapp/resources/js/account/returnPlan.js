jQuery(document).ready(function(e) {
//控制菜单
$("menu > dl").removeClass("on_menu on_icon");
$("menu > dl > dd").removeClass("on_dd");
$("#me03").addClass("on_menu on_icon");
$("#m03_2").parent().addClass("on_dd");
//焦点
jQuery("div.focus_bg" ).each(function(index, element) {
    jQuery(this).focusInput();
});
//date
var dates=$("input[name='date']");
dates.datepicker({
	time24h:true,
	duration: '',
	showTime: false,
	constrainInput: false,
	dateCallback:dateCallback
}); 
//加载数据
searchByDate(getPlan());

});

function dateCallback(){
	$("#all").parent().parent().find("dd").removeClass("on_dd");
	searchByDate(getPlan());
}

var searchByDate = function(param){
	var searchByDateUrl = basePath+"/account/returnPlanData";
	$.ajax({
		type:"post",
		url : searchByDateUrl,
		data : param,
		success : function(data, textStatus, jqXHR) {
			handleError(data);
			$("#dataId").html(data);
			var pageCfg = new PagerConfigure('pageDiv','dataId',"pageCode",searchByDateUrl,param);
			initPage(pageCfg);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$("#dataId").html("系统连接异常");
		}
	});
}
var search = function(day){
	handTimeCss(day);
	searchByDate(getPlan());
}

var searchStatus = function(day){
	handStatusCss(day);
	searchByDate(getPlan());
}
