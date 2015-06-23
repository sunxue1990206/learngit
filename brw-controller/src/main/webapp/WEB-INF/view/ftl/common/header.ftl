  <!--well_top-->
  <script src="${rc.contextPath}/resources/js/jquery-1.7.min.js"></script>
  <script src="${rc.contextPath}/resources/js/html5.js"></script>
    <#include "*/common/url.ftl" />
            <div class="well_top">
                <ul class="w1060 mc clearfix fgrayd f12 pr">
		            <li class="fl mr10 mtd10"><i class="icon phone_icon mr8">&nbsp;</i>400-186-8186</li>	
		            <li class="fl mtd10">
		                <a   href="http://v1.live800.com/live800/chatClient/chatbox.jsp?jid=3348651369&companyID=491608&configID=41747&codeType=custom" target="_blank" class="  fgrayd" >
                        <i class="icon linecus_icon">&nbsp;</i>在线客服</a>
		            	 <div class="weixin pa"><img  alt="海银财富微信" src="${rc.contextPath}/resources/images/weixin.png"/></div>
		             </li>
                    <li class="fr no_a mtd10 ml8">关注我们<a target="_blank" href="http://weibo.com/haiyinwealth"  id="sina" class="icon sina_icon ml13">&nbsp;</a><a href="#" target="_blank" id="wechat" class="icon wechat_icon ml8">&nbsp;</a></li>
                    <li class="fr ml10">
                    <li class="fr">您好，
                    <#if DISPLAY_USER_NAME??>
                    <a class="fgrayd" href="${Request["userControllerAddress"]}/account/index">${DISPLAY_USER_NAME!}</a>
                        [<a class="fgrayd" href="${Request["userControllerAddress"]}/logout">退出</a>]
                    <#else>
          欢迎来到海银会！  <a href="${Request["userControllerAddress"]}/login" id="w_login" class="fgrayd mr8 ml8">登录</a>|<a href="${Request["userControllerAddress"]}/register/page" id="w_re" class="fgrayd mr8 ml8">注册</a>|
                    </#if>
                    <a href="${Request["invControllerAddress"]}/help/forwardPage/helpIndex" id="help_top" target="_blank" class="fgrayd mr8 ml8">帮助中心</a>|<a href="${rc.contextPath}/aboutUs/forwardPage/contactUs" target="_blank" id="contact_top" class="fgrayd ml8 mr8">联系我们</a>|</li>	 
              </li>
                </ul>
            </div>
            <!--logo_top-->
            <div class="logo_top ">
                <div class="w1060 mc clearfix">
                    <div class="logo_div fl">
                        <a id="login_a" target="_blank" href="${Request["invControllerAddress"]}/index"><img id="logo_223x592" alt="海银财富"  src="${rc.contextPath}/resources/images/logo_223x592.png"/></a>
                        <span class="in_b f14fblack1 pl15">智慧理财&nbsp;健康生活</span>
                    </div>
               
                     <!--nav-->
                    <nav id="nav" class="fr">
                        <dl class="clearfix"> 
                            <dt id="index_page" class="fl pr"><a id="n01"  href="${Request["invControllerAddress"]}/index" class="ws">首页</a></dt>
                            <dd id="lend_page" class="fl pr z11">
                                <a id="n02" href="${Request["invControllerAddress"]}/lend/forwardLoanList" class="ws">投资专区 </a>
                                <ul class="pa">
                                    <li><a id="n02_2" href="${Request["invControllerAddress"]}/lend/forwardLoanList" class="ws">海银宝</a></li>
                                    <li><a id="n02_3" href="${Request["invControllerAddress"]}/transfer/transferList" class="ws">随意转</a></li>
                                </ul> 
                            </dd>
                            <!--<dd id="loan_page" class="fl pr z10"><a id="n03" href="${Request["brwControllerAddress"]}/loanapplication/forwardlist/00" class="ws">融资专区</a></dd>-->
                            <dd id="security_page" class="fl pr"><a id="n08" href="${Request["invControllerAddress"]}/security/forwardPage/riskSecurity" class="ws">安全保障</a></dd>
                            <dd id="newcustomer_page" class="fl pr"><a id="n04" href="${Request["invControllerAddress"]}/help/forwardPage/newCustomer" class="ws">新手引导</a></dd>
                            <dd id="about_page" class="fl pr"><a id="n05" href="${Request["invControllerAddress"]}/aboutUs/forwardPage/aboutHYH" class="ws" class="ws">关于我们</a></dd>
                            <dd id="account_page" class="fl pr"><a id="n07" href="${Request["userControllerAddress"]}/account/index" class="ws">我的账户</a></dd>
                        </dl>
                    </nav>
                    <!--nav end-->
                 </div>
            </div>
            <!--logo_top end--> 
            
    <script>
		$(function(){
			$("#"+'${pageName!}').addClass("curnav");
		})
</script> 
           