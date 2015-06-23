   <!--menu-->
<menu id="menu" class="menu_b fl w198 bwhite fgray f14">
	<div class="menu_title f18"><a  id="d01" class="fgray" href="${Request["userControllerAddress"]}/account/index"><i class="account_icon user_icon03 mr8">&nbsp;</i>我的账户</a></div>
    <dl id="me01">
    	<dt class="f16"><a  id="m01" class="ws"><i class="account_icon capital_icon mr8"></i>资金管理</a></dt>
        <dd><a  id="m01_1" href="${Request["userControllerAddress"]}/account/fund/fundRecord/tab1" class="ws">资金记录</a></dd>
        <dd><a  id="m01_2" href="${Request["userControllerAddress"]}/account/fund/recharge" class="ws">充值</a></dd>
        <dd class="pb10"><a  id="m01_3" href="${Request["userControllerAddress"]}/account/fund/withdraw" class="ws">提现</a></dd>
    </dl>
    <dl id="me02">
    	<dt class="f16"><a  id="m02" class="ws "><i class="account_icon invest_icon mr8"></i>理财管理</a></dt>
        <dd><a  id="m02_1" href="${Request["invControllerAddress"]}/account/loanInvesting" class="ws">我的投资</a></dd> 
        <dd class="pb10"><a  id="m02_2" href="${Request["invControllerAddress"]}/account/transferAvailable" class="ws">债权转让</a></dd>
        <!--<dd class="pb10"><a  id="m02_3" href="" class="ws">自动投标</a></dd>-->
    </dl>
<!--    
	<dl id="me03">
    	<dt class="f16"><a  id="m03" class="ws"><i class="account_icon loans_icon mr8"></i>借款管理</a></dt>
        <dd><a  id="m03_1" href="${Request["brwControllerAddress"]}/account/loanApply"  class="ws">借款申请</a></dd>
        <dd class="pb10"><a  id="m03_2" href="${Request["brwControllerAddress"]}/account/loanBidding" class="ws">借款记录</a></dd>
    </dl>
-->
    <dl id="me04">
    	<dt class="f16"><a   id="m04" class="ws"><i class="account_icon activ_icon mr8"></i>活动管理</a></dt>
        <dd class="pb10"><a  id="m04_1" href="${Request["userControllerAddress"]}/marketing/userRedRedpocketList" class="ws">我的红包</a></dd>
        <!--<dd class="pb10"><a id="m04_2" href="${Request["userControllerAddress"]}/" class="ws">推荐好友</a></dd>-->
    </dl>
    <dl  id="me05" class="on_menu on_icon">
    	<dt class="f16"><a  id="m05" class="ws"><i class="account_icon book_icon mr8"></i>个人中心</a></dt>
        <dd class="on_dd"><a  id="m05_1" href="${Request["userControllerAddress"]}/account/security/home" class="ws">安全中心</a></dd>
        <dd><a  id="m05_2" href="${Request["userControllerAddress"]}/account/bankCard_index" class="ws">银行卡信息</a></dd>
        <dd><a  id="m05_3" href="${Request["userControllerAddress"]}/notification/list" class="ws">站内消息</a></dd> 
        <dd class="pb10"><a  id="m05_4" href="${Request["userControllerAddress"]}/notification/config/list" class="ws">提醒设置</a></dd>
    </dl>
</menu>
 <!--menu end-->