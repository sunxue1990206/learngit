<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>借款记录_海银会</title>
<meta name="keyword" content="安全保障,网络理财,投资理财,互联网金融,债权转让,理财产品,网络贷款,中小企业借款,网络借贷"> 
<meta name="description" content="海银会(www.haiyinhui.com)是中国领先互联网投融资平台，为投资理财用户和贷款用户提供安全、高效、透明的互联网金融服务。为中小企业及个人提供专业、可靠的理财、贷款服务。投资理财用户可通过海银会平台进行投资、购买债权来获得安全的高收益；贷款用户可在平台快速申请企业贷款、个人贷款等各类贷款。">
<#include "*/common/commoncss_account.ftl" />

</head>
<body>
	<div class="haiyin">
    	<header>
			<#include "*/common/header.ftl" />
       </header>
       <input type="hidden" value="${loanHoldId!}" id="investmentHoldId" />
         <div class="container">
        	<div class="w1160 mc clearfix">
        		<div class="fgray wb100 fl crumbs f12"><a class="fgray"  href="${Request["invControllerAddress"]}/index">首页</a>&nbsp;&gt;&nbsp;<a class="fgray"  href="${Request["userControllerAddress"]}/account/index">我的账户</a>&nbsp;&gt;&nbsp;<a class="fgray"  href="${Request["brwControllerAddress"]}/account/loanApply">借款管理</a>&nbsp;&gt;&nbsp;借款记录 </div>
                <!--menu-->
                	<#include "*/common/menu.ftl" />
                <!--menu end-->
                <!--connt_right-->
				<div id="connt_right" class="connt_right fr w938">
					<h1 class="fpurple f18 fn right_title">借款记录<span class="fr f14 fgray mt10 mr20">单位：元</span></h1>
				    <!--right_div-->
				    <div class="right_div plr30" id="loanApplyBodyId">
					    <dl class="table_tab clearfix mt30 f14" id="loanRepayStatusId">
							<dd class="fl"><a href="${rc.contextPath}/account/loanBidding">招标中</a></dd>
						    <dd class="fl"><a href="${rc.contextPath}/account/loanRepaymenting">还款中</a></dd>
						    <dd class="fl"><a href="${rc.contextPath}/account/loanRepaymentClosed">已还清</a></dd>
						    <dd class="on_t fl"><a href="${rc.contextPath}/account/returnPlan">还款计划</a></dd>
						</dl>
				        <!--table_Search--select-->
				     <dl class="table_select clearfix mt20 f14" id="searchTimeId">
							<dt class="clearfix fl">
						    	<span class="fl">应还时间：</span>
						    	<div f="112x36" class="focus_bg fl">
						            <div class="clearfix focus_div">
						                <input id="start_time"  name="date" group="01" class="f14 fgray fl" type="text" value="" />
						                <i class="fr account_icon date_icon">&nbsp;</i>
						            </div>
						        </div>
						        <span class="fl">--</span>
						        <div f="112x36" class="focus_bg fl">
						            <div class="clearfix focus_div">
						               <input id="end_time" name="date" group="01" class="f14 fgray fl" type="text" value="" />
						               <i class="fr account_icon date_icon">&nbsp;</i>
						            </div>
						        </div>
						    </dt>
							<dd class="on_dd fl" name="0"><a id="all" href="javascript:search(0)">全部</a></dd>
							<dd class="fl" name="1"><a id="week" href="javascript:search(1)">最近一周</a></dd>
							<dd class="fl" name="2"><a id="month" href="javascript:search(2)">最近一月</a></dd>
							<dd class="fl" name="3"><a id="year" href="javascript:search(3)">最近半年</a></dd>
						</dl>
						<!--table_select end-->
						<dl class="table_status clearfix mt10 f14" id="table_statusId">
							 <dt class="fl">还款状态：</dt>
						 	 <dd class="on_dd fl" name="10"><a id="sta01" href="javascript:searchStatus(10)">全部</a></dd>
						 	 <dd class="fl" name="11"><a id="sta02" href="javascript:searchStatus(11)">待还</a></dd>
						 	 <dd class="fl" name="12"><a id="sta03" href="javascript:searchStatus(12)">已还</a></dd>
						</dl>
				        <!--table_select end-->
				         <!--table 资金明细-->
				        <div class="table fgray f12 mt15" id="dataId">
				        </div>
				        <div id="pageDiv"></div>
				        <!--table end-->
				     </div>
				    <!--right_div end-->
				</div>
                <!--connt_right end-->
            </div>
        </div>
         <!--stage_cont end-->
        <!--foot end-->
     		<#include "*/common/footer.ftl" />
        <!--foot end-->
    </div>
</body>
<script src="${rc.contextPath}/resources/js/inputverify.js"></script>
<script src="${rc.contextPath}/resources/js/date.js"></script>
<script src="${rc.contextPath}/resources/js/timepicker.js"></script>
<script src="${rc.contextPath}/resources/js/help.js"></script>
<script src="${rc.contextPath}/resources/js/account/transfercommon.js"></script>
<script src="${rc.contextPath}/resources/js/jquery.pager.js"></script>
<script src="${rc.contextPath}/resources/js/PagerConfigure.js"></script>

<script src="${rc.contextPath}/resources/js/timeUtil.js"></script>
<script src="${rc.contextPath}/resources/js/account/returnPlan.js"></script>
</html>