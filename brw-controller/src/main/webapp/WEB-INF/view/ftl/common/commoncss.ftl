<link href="${rc.contextPath}/resources/css/base.css" rel="stylesheet" type="text/css">
<link href="${rc.contextPath}/resources/css/common.css" rel="stylesheet" type="text/css">
<link href="${rc.contextPath}/resources/css/theme.css" rel="stylesheet" type="text/css">
<link href="${rc.contextPath}/resources/css/date.css" rel="stylesheet" type="text/css">
<link href="${rc.contextPath}/resources/css/pager.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="${rc.contextPath}/resources/images/favicon.ico" type="image/x-icon" />
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
