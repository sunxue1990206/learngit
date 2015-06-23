var PagerConfigure = function(pageDiv,dataId,page,url,parm){
	
	this.pageDiv = pageDiv;//分页div的ID
	this.dataId = dataId;//list数据Div的ID
	this.page = page;//后台返回的总页码
	this.url = url;//Controller的url
	this.parm =parm;//Controller的参数
}
var obj; 
function initPage(pageObj){
	obj = pageObj;
	if($("#"+obj.page).val() == 0 || $("#"+obj.page).val() == "0") {
		$("#"+obj.pageDiv).hide();
		return true;
	}
	$("#"+obj.pageDiv).show();
	$("#"+obj.pageDiv).pager({//生成pager
		pagenumber : '1',//页码
		pagecount :  $("#"+obj.page).val(), //总共多少页
		pageSize : "10",//每页显示多少条
		buttonClickCallback : PageClick
	})
}

function PageClick(pointNum){
	$("#"+obj.pageDiv).pager({ pagenumber: pointNum, pagecount: $("#"+obj.page).val(), buttonClickCallback: PageClick });
	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : obj.url,
		data: "pageNum="+pointNum+"&"+obj.parm,
		timeout : 1000,
		success : function(dates) {
			$("#"+obj.dataId).html(dates);// 要刷新的div
		},
		error : function() {
			alert("失败，请稍后再试！");
		}
	});
};
