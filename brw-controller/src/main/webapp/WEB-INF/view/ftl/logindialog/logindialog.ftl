<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>鐧诲綍_寮瑰嚭鐧诲綍</title>
<#include "*/common/commoncss_login.ftl" />
<#include "*/logindialog/commonjs.ftl" />

<script type="text/javascript">
var reOnClick=function(url){
	window.open(url);
}


jQuery(document).ready(function(e) {
	/* 登录验证 */
	var url=$("#register_btn").attr("userUrl");

	$.ajax({
		
		url : url+"/cookies/login/username",
		dataType: 'jsonp',
		traditional: true,	// Server only supports traditional style params
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		success : function(data, textStatus, jqXHR) {
			$('#username').val(data.responseBody);	
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
	$.ajax({
		
		url : url+"/captcha/is/exit",
		dataType: 'jsonp',
		traditional: true,	// Server only supports traditional style params
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		success : function(data, textStatus, jqXHR) {
			$("#captcha_id").css("display","block");
				jQuery("#captcha_img").attr("src","${Request["userControllerAddress"]}"+"/captcha?random="+new Date().getTime()+"&loginType="+"${uuid!}");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});

});
</script>
 <style>
 	html,body{overflow:auto;}
 </style>
</head>
<body class="yscroll">
	<form class="login_form f12 b_none">
		<input id="uuid" name="uuid" value=${uuid!} type=hidden />
      <ul><!--warn_n sus_n-->
          <li id="notice_input" class="pb5 fred error_n notice_input" style="visibility:hidden;"><i class="notice_icon icon mr8 ml10">&nbsp;</i><span></span></li>
          <li class="username mb10 focus_bg clearfix">
              <div class="clearfix focus_div">
                  <input id="username" name="userName" noform="1" name="userName" vertype="loginUser" class="f14 fgrayl fl" type="text" placeholder="请输入用户名\手机号\邮箱" value="请输入用户名\手机号\邮箱" />
                  <i class="user_icon icon fr">&nbsp;</i>
              </div>
          </li>
          <li class="password mb15 focus_bg clearfix">
              <div  class="clearfix focus_div">
                  <input id="password" name="password" noform="1" vertype="password" class="f14 fgrayl fl" type="text"  placeholder="请输入密码"  value="请输入密码 "/>
                  <i class="pword_icon icon fr">&nbsp;</i>
              </div>
          </li>
          <li class="clearfix mb15 forget">
              <div class="fl pl15"><input id="forget_user" name="forget_user" type="checkbox" />记住用户名</div>
              <div class="fr"><a  onclick="reOnClick('${Request["userControllerAddress"]}/forgetLP/page')" class="fblue">忘记密码</a></div>
          </li>
           
          <li id="captcha_id" class="clearfix mb15 mbd10 captcha mtd05 none " ><!-- style="display:none;"-->
              <div f="91x45" class="focus_bg fl"  >
                  <div class="focus_div "><input id="captcha" name="captcha" vertype="captcha" max="4" class="f14 ime" type="text" /></div>
              </div>
              <div class="captcha_img fl"><img onclick="getCaptcha('${Request["userControllerAddress"]}/captcha?'+'loginType='+'${uuid!}')" id="captcha_img" src="" /></div>
              <div class="captcha_op fl"><span>看不清</span><a id="step_page" onclick="getCaptcha('${Request["userControllerAddress"]}/captcha?'+'loginType='+'${uuid!}')" class="fred">换一张</a></div>
          </li>
          
        
          <li class="mb20 ml8"><input id="register_btn" vertype="ok_btn" class="btn01 btn_r273x36 fwhite" value="登录" type="button" class="fwhite" url1='${Request["userControllerAddress"]}/captcha?loginType=${uuid!}' url='${Request["userControllerAddress"]}/submitLogin' userUrl='${Request["userControllerAddress"]}' ucsDomain='${Request["ucsDomain"]}' /></li>
          <li class="wr"><span class="fgray">没有账号?</span><a onclick="reOnClick('${Request["userControllerAddress"]}/register/page')" id="register_a" class="fblue">免费注册</a></li>
      </ul>	
    </form>
</body>

</html>
