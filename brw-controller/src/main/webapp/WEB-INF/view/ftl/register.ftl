
        <form id="reg_frm" action="${rc.contextPath}/register" method="post">
        	<table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <th scope="row">用户名:</th>
                <td><div class="inputbox"><input type="text" value="" name="loginname" id="loginname" maxlength="20"/></div></td>
              </tr>
               
              <tr>
                <th scope="row">输入密码:</th>
                <td><div class="inputbox"><input type="password" id="password"  name="password" maxlength="20"/></div></td>
              </tr>
               
              <tr>
                <th scope="row">确认密码:</th>
                <td><div class="inputbox"><input  type="password" id="password1"  name="password1" maxlength="20"/></div></td>
              </tr>
            
              <tr>
                <th scope="row">验证码:</th>
                <td class="clearfix"><div class="inputbox fl" style="width:138px;"><input type="text" name="validCode" style="width:114px" maxlength="4" /></div>
                <span class="yzm_icon fl"><img
	                            id="verifyImage" style="vertical-align: middle;"
	                            src="${rc.contextPath}/captcha"
	                            onclick="nextImage()" /></span></td>
              </tr>
             <tr>
              <th scope="row"> <input type="submit" value="注册" /></th>
             </tr>
            </table>
            </form>
          
          
          <script>	
	var msg='${msg!}';
	if(msg != ''){
		alert(msg);
	}
		

		
			
</script>