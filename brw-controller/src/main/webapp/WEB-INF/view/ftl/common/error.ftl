<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>404</title>
<link href="${rc.contextPath}/resources/css/base.css" rel="stylesheet" type="text/css">
<link href="${rc.contextPath}/resources/css/common.css" rel="stylesheet" type="text/css">
<link href="${rc.contextPath}/resources/css/theme.css" rel="stylesheet" type="text/css">

<!--getPlatformMode
	获取平台环境参数，具体为以下大写英文代表：
	DEV,//开发
	DEMO,//测试
	STAGE,//准生产
	PROD,//生产-->
<#assign getPlatformMode= "com.hyh.expand.util.ftlGetRunTimePlatform"?new()>
<!--getPlatformMode end-->
<#if getPlatformMode()?? && getPlatformMode()=='PROD'>
<script>
 var _hmt = _hmt || [];

(function() {

  var hm = document.createElement("script");

  hm.src = "//hm.baidu.com/hm.js?ccca8f369a3d739937d214c61d1a71f5";

  var s = document.getElementsByTagName("script")[0]; 

  s.parentNode.insertBefore(hm, s);

})();

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){

  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),

  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)

  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

 

  ga('create', 'UA-63175031-1', 'auto');

  ga('send', 'pageview');
</script>
</#if>


</head>
<body>
	<div class="haiyin">
    	<header>
			<#include "*/common/header.ftl" />
      </header>
         <!--container-->
        <div class="container">
        	<div class="w1100 mc clearfix">
                <!--connt_right-->
                <div id="wh" class="borderg mt40 fr wb100 pr">
                	<div class="view_404 clearfix w615 pa">
                    	<div class="imgdiv fl pr">
                        	<img src="${rc.contextPath}/resources/images/404.png" />
                            <p class="wc pa">502</p>
                        </div>
                        <p class="fgray f14 mt10">
                        	<span class="f16">错误编号:${obj!}</span><br />
                        	<span class="f16">抱歉，您访问的页面地址错误，或者页面不存在</span><br />
                            您可以：<a href="" class="fblue">返回首页</a>&nbsp;|&nbsp;<a href="" class="fblue">返回上级页面</a>&nbsp;|&nbsp;<a href="" class="fblue">在线客服</a></p>
                    </div>
                </div>
                <!--connt_right end-->
            </div>
        </div>
         <!--container end-->
        <!--foot end-->
        <footer class="bwhite wc f12 fgray">
        	<a href="#" id="ab_us">关于我们</a>|<a href="#" id="security ">安全保障</a>|<a href="#" id="help_center">帮助中心</a>|<a href="#" id="contact_us">联系我们</a>|<span>客服热线 400-186-8186</span><br />
            <span>上海海银会金融信息服务有限公司</span>|<span>Copyright ? 2015 <a href="#" id="company_link">www.haiyinhui.com</a>, All Rights Reserved</span>
        </footer>
        <!--foot end-->
    </div>

 </body>
</html>