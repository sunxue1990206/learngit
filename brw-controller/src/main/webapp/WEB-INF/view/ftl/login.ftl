
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Login</title>


</head>
<body>

 <form action="${rc.contextPath}/login" method="post"> 
        	<table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <th scope="row">用户名:</th>
                <td><div class="inputbox"><input type="text" value="" name="loginname" id="loginname" autocomplete="off" maxlength="30"/></div></td>
              </tr>
                
              <tr>
                <th scope="row">输入密码:</th>
                <td><div class="inputbox"><input type="password" value=""  name="password" id="password" autocomplete="off" maxlength="20" /></div></td>
              </tr>
           
           	 <tr>
                <th scope="row">&nbsp;</th>
                <td>&nbsp;<span class="errow_text" id="msg"></span></td>
              </tr>
          
            
            </table>
            <input type="submit" value="登录" />
          <a href="${rc.contextPath}/register" class="zhijie_loing">立即注册<i class="web_skin arr_position"></i></a>
 </form>
</body>
</html>

<script>	
	var msg='${msg!}';
	if(msg != ''){
		alert(msg);
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
		
	function login(){
		var loginname = $("#loginname").val();
		var password = $("#password").val();		
		password = $.md5(password);
		$.ajax({ url: "${rc.contextPath}/login",
			type:"post",
			dataType:"json",
			data:{loginname:loginname,password:password,time:Math.random()}, 
			success: function(data){
				if(data.result){
					location.href = "${rc.contextPath}/uc/index/";
				}else{
		        	alert(data.msg);			
				}
				
	      	}      	
      	});
      
	}
		
</script>





