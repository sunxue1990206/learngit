<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>快速借款产品_长期借款产品_大额借款产品_投资产品_融资专区_海银会_借款申请成功</title>
<meta name="keywords"  content="快速借款产品,长期借款产品,大额借款产品"/>
<meta name="description" content="借款频道专注于为广大的借款用户提供高效、快速、便捷的借款渠道，满足不同行业、不同地域的用户达成借款需求。"/>

<#include "*/common/commoncss_invest.ftl" />

</head>
<body>
	<div class="haiyin">
    	<header>
			<#include "*/common/header.ftl" />
       	</header>
        <div class="stage_cont">
        	<div class="w1160 mc clearfix">
        		<div class="fgray wb100 fl crumbs f12"><a class="fgray"  href="${Request["invControllerAddress"]}/index">首页</a>&nbsp;&gt;&nbsp;<a class="fgray" href="${Request["brwControllerAddress"]}/loanapplication/forwardlist/00">融资专区</a>&nbsp;&gt;&nbsp;申请成功</div>
                <div id="wh" class=" wb100 fl clearfix borderg pr">
                	 <!--step_text-->
                     <form class="step_text fgray pa sus_loans ">
                        <dl>
                           <dd class="f18 wc"><i class=" sus_icon mr15">&nbsp;</i>恭喜您，您的借款申请已成功提交！</dd>
                           <dd class="wc f14 mt20">贷款经理将尽快与您取得联系，请您注意手机来电。</dd>
                            <dd class="mt40 wc"><input id="verify_btn" class="btn01 btn_r201x36 fwhite" value="返回首页" type="button" onclick="returnIndex('${Request["invControllerAddress"]}')" /></dd>
                        </dl>
                    </form>
                    <!--step_text end-->
                </div>
            </div>
        </div>
 		<#include "*/common/footer.ftl" />
    </div>
</body>
<script src="${rc.contextPath}/resources/js/loanapplication/success.js"></script>
</html>