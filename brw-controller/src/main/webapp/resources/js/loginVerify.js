// JavaScript Document
/*登录验证*/
(function ($) { 

jQuery.fn.loginVerify = function(operation) {
	var my={
		mes:"left",//提示信息的位置
		type :1,//登录
		loginBack:function(){}, //登录失去焦点与提交是要判断用户和密码是否争取
		existingName:function(){}, //注册当用户名失去焦点判断用户名是否已存在
		existingPhone:function(){}, //判断手机号一存在
		oksubmit:function(){}//提交的某些特殊的判断
		};
	var sus=1;
	var oldDate=new Date();
	my=jQuery.extend(my,operation);
	jQuery(this).find("#ok_btn").click(function(){
		my.oksubmit(sus,this);
		});
	jQuery(this).find("#step_page").click(function(){
		/*更新验证码图片*/
		});

	jQuery(this).find(".focus_bg").each(function(){
        	jQuery(this).focusInput({verifyF:function(that){
				var name=jQuery(that).attr("name");
				var status={message:"",type:1};
				var str= jQuery.method.getValue(that);
				 switch(name){
					 case "username":
					 	{status=jQuery.extend(status,jQuery.method.userName(my,str,that)); if(status.type==0){sus=0;}}
						break;
					 case "password":
					 	{status=jQuery.extend(status,jQuery.method.passWord(my,str,that)); if(status.type==0){sus=0;}}
						break;
					 case "phone":
					 	{status=jQuery.extend(status,jQuery.method.phone(my,str,that)); if(status.type==0){sus=0;}}
						break;
					 case "captcha":
					 	{status=jQuery.extend(status,jQuery.method.captcha(my,str,that,oldDate)); if(status.type==0){sus=0;}}
						break;
					case "sms_captcha":
					 	{status=jQuery.extend(status,jQuery.method.smsCaptcha(my,str,that,oldDate)); if(status.type==0){sus=0;}}
						break;
					case "pre_name":
					 	{status=jQuery.extend(status,jQuery.method.preName(my,str,that)); if(status.type==0){sus=0;}}
						break;
					case "id_num":
					 	{status=jQuery.extend(status,jQuery.method.idNum(my,str,that)); if(status.type==0){sus=0;}}
						break;
					 }
				
				}});
   		 });
		
};
 jQuery.method={
	 getValue : function(that){
		 return jQuery.trim(jQuery(that).val());
		 },
	 userName:function(myStr,str,that){
		 if(str==""){ return {message:"用户名不能为空",type:0};}
		 if(str.length<=4||str.length>=20){return {message:"用户名长度为4~20位字符",type:0};}
		 var reg=/^[a-zA-Z0-9—\-]+/;
		 if(!reg.test(str)){return {message:"用户名只能包含英文、数字、“-”、“_”",type:0};}
		  reg=/^[—\-][a-zA-Z0-9—\-]/;
		 if(reg.test(str)){ return {message:"用户名不能以符号开头",type:0};}
		 if(myStr.type==0){
			 //注册判断用户名存在否
			 my.loginBack(that);
			 }
		 },
	passWord :function(myStr,str,that){
		 if(str==""){ return {message:"密码不能为空",type:0};}
		 if(str.length<=6||str.length>=16){return {message:"密码长度为6~16位字符",type:0};}
		 var reg=/\s/;
		 if(reg.test(str)){return {message:"密码不能包含空格",type:0};}
		 if(myStr.type==1){
			 //登录密码框失去焦点是要判断用户和密码是否争取
			 my.existingName(that);
			 }
		},
	phone : function(myStr,str,that){
		if(str==""){ return {message:"密码不能为空",type:0};}
		if(str.length!=11){return {message:"手机号码为11位数字",type:0};}
		 var reg =/(1[3-9]\d{9})/;;
		  if(!reg.test(str))
		  {
		  return {message:"请输入正确的手机号码",type:0};
		  }
		  myStr.existingPhone(that);
		},
	captcha :function(myStr,str,that){ 
		if(str==""){ return {message:"验证码不能为空",type:0};}
		if(str!=jQuery(that).parent().parent().parent().find("img").attr("c")){
			return {message:"验证码错误，请重新输入",type:0};
			}
		/*从数据库读取验证码图片链接赋值*/
		},
	smsCaptcha: function(myStr,str,that,oldDate){
		if(str==""){ return {message:"验证码不能为空",type:0};}
		//超时
		var ts = (oldDate - new Date());
		var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟
		if(mm>30){return {message:"验证码输入有误，请重新输入",type:0};}
		var reg=/^\d{6}$/ ;
		//从数据口对比验证码
		if(!reg.test(str)){return {message:"验证码输入有误，请重新输入",type:0};}
		
		},
	preName :function(myStr,str,that){
		if(str==""){ return {message:"请填写您的真实姓名",type:0};}
		var reg=/[\u4E00-\u9FA5]/g;
		if(!reg.test(str)){ return {message:"真实姓名必须为汉字",type:0};}
		/*从数据库姓名与身份证不匹配*/
		},
	idNum :function(myStr,str,that){
		if(str==""){ return {message:"请填写您的身份证号码",type:0};}
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(!reg.test(str)){ return {message:"身份证号码有误",type:0};}
		/*身份证与姓名不匹配*/
		
		}
	 }
})(jQuery);
jQuery(document).ready(function(e) {
	/*登录验证*/
	jQuery("form.login_form").loginVerify({mes:"top"});
	
	});