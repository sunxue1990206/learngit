<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>快速借款产品_长期借款产品_大额借款产品_投资产品_融资专区_海银会</title>
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
        		<div class="fgray wb100 fl crumbs f12"><a class="fgray"  href="${Request["invControllerAddress"]}/index">首页</a>&nbsp;&gt;&nbsp;融资专区</div>
                <div class="fl clearfix borderg wb100">
                	<div class="loans_img fl">
                    	<div class="imgdiv">
                        	<img id="banner" alt="我要借款" src="${rc.contextPath}/resources/images/imgs/banner02.jpg" />
                        </div>
                        <ul class="clearfix fgray f14">
                        	<li class="fl clearfix wb45">
                            	<img class="fl mr20" id="mg001" alt="芝麻小贷" src="${rc.contextPath}/resources/images/imgs/img33.png" />
                                <div class="fl img_word wb60 mt15">
                                	<span class=" f16 fblack fn ws">芝麻小贷</span>
                                    <p class="ws mt10">融资范围：&nbsp;1万-100万</p>
                                </div>
                            </li>
                            <li class="fl clearfix wb50">
                            	<img class="fl mr20" id="mg002" alt="成长时贷" src="${rc.contextPath}/resources/images/imgs/img34.png" />
                                <div class="fl img_word wb60 mt15">
                                	<span class=" f16 fblack fn ws">成长时贷</span>
                                    <p class="ws mt10">融资范围：&nbsp;101万-500万</p>
                                </div>
                            </li>
                            <li class="fl clearfix wb45">
                            	<img class="fl mr20" id="mg003" alt="海派易贷" src="${rc.contextPath}/resources/images/imgs/img35.png" />
                                <div class="fl img_word wb60 mt15">
                                	<span class=" f16 fblack fn ws">海派易贷</span>
                                    <p class="ws mt10">融资范围：&nbsp;500万以上</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                     <!--step_text-->
                     <form class="step_text fl fgray ml90 mt10" id="loanApplicationAddId" action="${rc.contextPath}/loanapplication/applyLoanApplication" method="post">
                      <dl class="f14 label70 mt15">
                           <dd class="clearfix input_div city pr z11">
                              <label class="fl">所在城市：</label>
                              <div class="select_up pr fl">
                                  <div f="231x45" class="focus_select">
                                      <div class=" clearfix focus_div">
                                          <input id="open_city" name="city" class="f14 fgray fl" type="text"  placeholder="请选择城市" vertype="city" fill="1" value="请选择城市" style=" display:none;"  />
                                          <h4 class="f14 fgray fl fn">请选择城市</h4>
                                          <i class="icon city_icon fl">&nbsp;</i>
                                      </div>
                                  </div>
                                  <div class="select_cont pa f12">
                                      <dl class="clearfix select_tab"><dd class="on_s">省份</dd><dd>城市</dd><dt>&nbsp;</dt></dl>
                                      <dl class="clearfix select_div">
                                      <dt>A-G</dt>
                                      <dd class="clearfix">
                                          <a id="a01" class="on_a" href="">安徽</a>
                                          <a id="a02" href="">澳门</a>
                                          <a id="a03" href="">北京</a>
                                          <a id="a04" href="">重庆</a>
                                          <a id="a05" href="">福建</a>
                                          <a id="a06" href="">广东</a>
                                          <a id="a07" href="">广西</a>
                                          <a id="a08" href="">贵州</a>
                                          <a id="a09" href="">甘肃</a>
                                      </dd>
                                      <dt>H-K</dt>
                                      <dd class="clearfix">
                                          <a id="h01" href="">河北</a>
                                          <a id="h02" href="">黑龙江</a>
                                          <a id="h03" href="">河南</a>
                                          <a id="h04" href="">湖北</a>
                                          <a id="h05" href="">湖南</a>
                                          <a id="h06" href="">海南</a>
                                          <a id="h07" href="">吉林</a>
                                          <a id="h08" href="">江苏</a>
                                          <a id="h09" href="">浙江</a>
                                          <a id="h10" href="">江西</a>
                                     </dd>
                                     <dt>L-S</dt>
                                      <dd class="clearfix">
                                          <a id="l01" href="">辽宁</a>
                                          <a id="l02" href="">内蒙古</a>
                                          <a id="l03" href="">宁夏</a>
                                          <a id="l04" href="">青海</a>
                                          <a id="l05" href="">山西</a>
                                          <a id="l06" href="">上海</a>
                                          <a id="l07" href="">山东</a>
                                          <a id="l08" href="">四川</a>
                                          <a id="l09" href="">陕西</a>
                                     </dd>
                                     <dt>T-Z</dt>
                                      <dd class="clearfix">
                                          <a id="t01" href="">天津</a>
                                          <a id="t02" href="">台湾</a>
                                          <a id="t03" href="">西藏</a>
                                          <a id="t04" href="">新疆</a>
                                          <a id="t05" href="">香港</a>
                                          <a id="t06" href="">云南</a>
                                     </dd>
                                  </dl>
                                      
                                  </div>
                              </div>
                              <div class="notice_input pab f12 error_n " style="display:none;">
                                  <i class="icon notice_icon">&nbsp;</i><span id="0017"></span>
                              </div>
                           </dd>
                           <dd class="clearfix input_div mt15 pr z10">
                              <label class="fl">产品名称：</label>
                              <div f="231x45" class="select">
                                  <select id="bank" fill="1" vertype="borrowTypeCode" name="applicationTypeCode" class="f14 fgray fl">
                                  </select>
                              </div>
                              <div class="notice_input pab f12 error_n z11 " style="display:none;">
				                  <i class="icon notice_icon">&nbsp;</i><span></span>
				              </div>
                               <div class="notice_input pab f12 error_n " style="display:none;">
                                  <i class="icon notice_icon">&nbsp;</i><span id="0018"></span>
                              </div>
                           </dd>
                           <dd class="clearfix input_div mt15 money_pnum pr">
                              <label class="fl">借款金额：</label>
                              <div f="231x45" class="focus_bg fl">
                                  <div class="clearfix focus_div pr">
                                      <input id="money_pnum" name="loanAmount" vertype="loanAmount" class="f14 fgrayl fl mr10" type="text" value="" />
                                      <span class="f14 pa">万元</span>
                                  </div>
                              </div>
                              <div class="notice_input pab f12 error_n" style="display:none;">
                                  <i class="icon notice_icon">&nbsp;</i><span id="0019"></span>
                              </div>
                           </dd>
                           <dd class="clearfix input_div mt15 pr prloans_time" >
                              <label class="fl">借款期限：</label>
                              <div f="231x45" class="focus_bg fl">
                                  <div class="clearfix focus_div pr">
                                      <input id="prloans_time" name="loanPeriod" vertype="loanPeriod" class="f14 fgrayl fl" type="text" value="" />
                                      <span class="f14 pa">个月</span>
                                  </div>
                              </div>
                              <div class="notice_input pab f12 error_n " style="display:none;">
                                  <i class="icon notice_icon">&nbsp;</i><span id="0020"></span>
                              </div>
                           </dd>
                           <dd class="clearfix input_div mt10 pr" id="sex">
                              <label class="fl">称谓：</label>
                              <div class="fl sex_div">
                              	<input id="sir" name="sex" class="mr5" type="radio" checked="checked" value="先生" />先生
                                <input id="lady" name="sex" class="ml10 mr5" type="radio" value="女士" />女士
                              </div>
                              <div class="notice_input pab f12 error_n" style="display:none;">
                                  <i class="icon notice_icon">&nbsp;</i><span id="0021"></span>
                              </div>
                           </dd>
                           <dd class="clearfix input_div mt10 mtd05 pr">
                              <label class="fl">真实姓名：</label>
                              <div f="231x45" class="focus_bg fl">
                                  <div class="clearfix focus_div">
                                      <input id="pre_name" name="contact" vertype="preName" class="f14 fgrayl fl" type="text" value="" />
                                  </div>
                              </div>
                              <div class="notice_input pab f12 error_n" style="display:none;">
                                  <i class="icon notice_icon">&nbsp;</i><span id="0022"></span>
                              </div>
                           </dd>
                           <dd class="clearfix input_div mt15 pr">
                              <label class="fl">手机号码：</label>
                              <div f="231x45" class="focus_bg fl">
                                  <div class="clearfix focus_div">
                                      <input no="0" id="phone" name="mobilePhone" vertype="mobilePhone" class="f14 fgrayl fl" type="text" value="" />
                                  </div>
                              </div>
                              <div id="mobileErrorMsgId" class="notice_input pab f12 error_n " style="display:none;">
                                  <i class="icon notice_icon">&nbsp;</i><span id="0023"></span>
                              </div>
                           </dd>
                           <dd class="clearfix mt15 pr" id="sms_captcha_id">
                              <label class="fl">验证码：</label>
                              <div f="121x45" class="focus_bg fl">
                                  <div class="focus_div input_captcha"><input name="idCip" maxnum="6" vertype="sms_captcha" class="f14 ime" type="text" /></div>
                              </div>
                              <input id="getcaptcha" vertype="getcaptcha" ca="0" class="fl btn01 btn_r101x36 mt5 fred ml3" type="button" value="点击获取" />
                              <div id="getcaptchaErrorId" class="notice_input pab f12 error_n " style="display:none;">
                                  <i class="icon notice_icon">&nbsp;</i><span id="0024"></span>
                              </div>
                           </dd>
                           <dd class="ml5 mt5"><label>&nbsp;</label>没收到验证码？请联系客服 400-186-8186</dd>
                           <dd class="ml5 mt5"><label>&nbsp;</label><input type="button" id="ok_btn" vertype="ok_btn" class="btn01 btn_r222x36 fwhite"  value="立即申请" type="button" /></dd>
                      </dl>
                      <input type="hidden" id="borrowTypeId" value="${borrowTypeNo!}" />
               		  <input type="hidden" id="pageTokenId" name="page_token" value="${page_token!}" /> 
                   </form>
                   <!--step_text end-->
                </div>
            </div>
        </div>
         <!--stage_cont end-->
        <!--foot end-->
     		<#include "*/common/footer.ftl" />
        <!--foot end-->
    </div>
</body>
<script src="${rc.contextPath}/resources/js/inputverify.js"></script>
<script src="${rc.contextPath}/resources/js/jquery.select-1.3.6.js"></script>
<script src="${rc.contextPath}/resources/js/loanapplication/loanapplication.js"></script>
</html>