jQuery(document).ready(function(e) {
	//加载借款类型
	loadBorrowType();
	/*登录验证*/
	jQuery("form.step_text").loginVerify({
		mes:"bottom",
		getca:0,
		verImobilePhone:function(){getCaptcha();},
		oksubmit:function(sus,that,myDate){
			if(sus == 1){
				$("#ok_btn").removeClass("btn_r222x36").addClass("btn_rg222x36").attr("disabled","disabled");
				$.ajax({
					url : basePath+"/loanapplication/applyLoanApplication",
					async : false,
					type : "post",
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
					dataType : 'json',
					data : $("form").serialize(),
					success : function(data, textStatus, jqXHR) {
						if(data.status == "100"){
							location.href = basePath+"/loanapplication/success";
						}else{
							setReturnDable(true);
							$("#"+data.errorCode).parent().css("display","block").addClass('error_n').removeClass('sus_n warn_n')
							.find('span').html(data.errorMsg);
							$("#ok_btn").removeClass("btn_rg222x36").addClass("btn_r222x36").removeAttr("disabled");
							if(data.token != ""){
								$("#pageTokenId").val(data.token);
							}
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						handAjaxError(XMLHttpRequest, textStatus, errorThrown);
					}
				});
			}
			}
		});
	});

var loadBorrowType = function(){
	$.ajax({
		type:"post",
		url : basePath+"/loanapplication/loadBorrowType",
		success : function(data, textStatus, jqXHR) {
			handleError(data);
			$("#bank").append(data);
			jQuery("select").sSelect();
			var borrowType = $("#borrowTypeId").val();
			$("#bank").val(borrowType);
			if(borrowType != ""){
				var borrowTypeName = $("#bank option[value='"+borrowType+"']").text();
				if(borrowTypeName == ""){
					$("#bank").next().find("h4").text($("#bank option[value='04']").text()); 
				}else{
					$("#bank").next().find("h4").text(borrowTypeName); 
				}
			}else{
				$("#bank").next().find("h4").text($("#bank option[value='04']").text()); 
			}
	
			//检查是否登录
			checkUser();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			handAjaxError(XMLHttpRequest, textStatus, errorThrown);
		}
	});
}

var checkUser = function(){
	$.ajax({
		url : basePath+"/loanapplication/checkUser",
		type : "post",
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if(data.status != 100 || data.status != "100") {
				handleError(data.errorCode);
				return true;
			}
			$("#phone").val(data.responseBody.cellphone.substring(0,3)+"****"+data.responseBody.cellphone.substring(7,11));
			$('#phone').attr({"readonly":true,"disabled":"disabled"});
			if(data.responseBody.idcardAuth == true){
				$("#pre_name").val(data.responseBody.fullname.substring(0,1)+"*");
				$('#pre_name').attr({"readonly":true,"disabled":"disabled"});
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			handAjaxError(XMLHttpRequest, textStatus, errorThrown);
		}
	});
}

var getCaptcha = function(){
	var phoneAll = $("#phone").val();
	if(phoneAll == "" || phoneAll.length != 11){
		return false;
	}	
	var param = "mobilePhone="+phoneAll;
	$.ajax({
		type:"post",
		url : basePath+"/loanapplication/sendSms",
		data : param,
		success : function(data, textStatus, jqXHR) {
			if(data.status == "100"){
				$("#getcaptcha").attr("ca",data.times);
			}else{
				$("#getcaptcha").attr("ca",data.times);
				$("#"+data.errorCode).parent().css("display","block").addClass('error_n').removeClass('sus_n warn_n')
				.find('span').html(data.errorMsg);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			handAjaxError(XMLHttpRequest, textStatus, errorThrown);
		}
	});
}

var loginUser = function(){
	upWindow01=new upWindow({
	id:"login",title:"登录",type:"iframe",
	url:basePath+"/logindialog",
	width: 376,
	height:420,
	callback:function(){
	}
});
}