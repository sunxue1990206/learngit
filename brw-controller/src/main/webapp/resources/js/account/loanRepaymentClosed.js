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
searchByDate(getAjaxBack());
});

//时间函数回调函数
function dateCallback(){
	$("#all").parent().parent().find("dd").removeClass("on_dd");
	//加载数据
	searchByDate(getAjaxBack());
}

//时间输入框触发函数
var searchByDate = function(param){
	var searchByDateUrl = basePath+"/account/loanRepaymentClosedData";
	$.ajax({
		type: "post",
		url : searchByDateUrl,
		data: param,
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
//快捷时间查询函数
var search = function(day){
	handTimeCss(day);
	searchByDate(getAjaxBack());
}