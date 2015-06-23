package com.hyh.brw.validation;

import com.hyh.core.dto.Prompt;

public class Message {
	
	public static final String TELPHONSESSIONNAME="telPhonSessionName";
	
	public static final Prompt SYSTEM = new Prompt("510", "错误代码:");
	
	public static final Prompt OBJ_BLANK = new Prompt("0001","对象为空");  
	
	public static final Prompt MESS_BLANK = new Prompt("0002","提示信息为空");  
	
	public static final Prompt USERID_ILLEGAL = new Prompt("0003","用户ID不合法");  
	public static final Prompt USERID_DIS_ILLEGAL = new Prompt("0024","用户ID不合法");  
	
	public static final Prompt USERNAME_ILLEGAL = new Prompt("0004","用户名不合法");
	public static final Prompt USERNAME_DIS_ILLEGAL = new Prompt("0024","用户名不合法");
	
	public static final Prompt LOSE_ERROR_CODE = new Prompt("0006", "错误代码丢失");
	
	public static final Prompt UNKNOWN_ERROR = new Prompt("0007", "系统错误");
	
	public static final Prompt SOCKET_ERROR = new Prompt("0015", "通信失败");
	
	public static final Prompt STATUS_ILLEGAL = new Prompt("0016","状态不合法");
	
	public static final Prompt CITY_BLANK_NOTICE = new Prompt("0017","请选择所在城市");
	public static final Prompt CITY_LEN_NOTICE = new Prompt("0017","城市过长");
	
	public static final Prompt APPLICATIONTYPE_NOTICE = new Prompt("0018","请选择产品名称");
	
	public static final Prompt LOANAMOUNT_BLANK_NOTICE = new Prompt("0019","借款金额不能为空");
	public static final Prompt LOANAMOUNT_LEN_NOTICE = new Prompt("0019","借款金额过大或者过小");
	
	public static final Prompt LOANPERIOD_BLANK_NOTICE = new Prompt("0020","借款期限不能为空");
	public static final Prompt LOANPERIOD_LEN_NOTICE = new Prompt("0020","借款期过大或者过小");
	
	public static final Prompt SEX_BLANK_NOTICE = new Prompt("0021","请选择称谓");
	public static final Prompt SEX_LEN_NOTICE = new Prompt("0021","称谓过长");
	
	public static final Prompt CONTACT_BLANK_NOTICE = new Prompt("0022","真实姓名不能为空");
	public static final Prompt CONTACT_LEN_NOTICE = new Prompt("0022","真实姓名过长");
	public static final Prompt CONTACT_CHINESE_NOTICE = new Prompt("0022","真实姓名为汉字");
	
	public static final Prompt PHONE_BLANK_NOTICE = new Prompt("0023","手机号码不能为空");
	public static final Prompt PHONE_LEN_NOTICE = new Prompt("0023","手机号码为11位数字");
	public static final Prompt PHONE_NORMAL_NOTICE = new Prompt("0023","请输入正确的手机号码");
	public static final Prompt PHONE_REGIS_NOTICE = new Prompt("0023","该手机号码已注册，请<a href=\"javascript:loginUser()\" id=\"logindialogId\">登录</a>");
	public static final Prompt PHONE_REGIS_ERR = new Prompt("0023","手机号码自注册失败");
	
	public static final Prompt VER_BLANK_NOTICE = new Prompt("0024","验证码不能为空");
	public static final Prompt VER_ERROR_NOTICE = new Prompt("0024","验证码输入有误，请重新输入");
	public static final Prompt VER_NOTVALID_NOTICE = new Prompt("0024","验证码已失效，请重新获取");
	public static final Prompt VER_TOO_OFTEN_NOTICE = new Prompt("0024","您的操作过于频繁，请明日再来");
	public static final Prompt VER_SENDSMS_NOTICE = new Prompt("0024","您操作太频繁，请稍后再试");
	public static final Prompt VER_GET_NOTICE = new Prompt("0024","验证码获取失败");
	public static final Prompt ALREDAY_SUBMIT_NOTICE = new Prompt("0024","您有一笔审核中的借款申请，请勿重复提交");
	
	public static final Prompt REQUEST_DICTIONARY = new Prompt("0025","请求字典获取数据失败");
	public static final Prompt BWF10002_ERROR = new Prompt("0026","请求接口BWF10002失败");
	public static final Prompt BWF1007_ERROR = new Prompt("0027","请求接口BWF1007失败");
	public static final Prompt BWF1015_ERROR = new Prompt("0028","请求接口BWF1015失败");
	public static final Prompt BWF1016_ERROR = new Prompt("0029","请求接口BWF1016失败");
	public static final Prompt BWF1017_ERROR = new Prompt("0030","请求接口BWF1017失败");
	public static final Prompt USR10009_ERROR = new Prompt("0031","请求接口BUSR10009失败");
	
	
	
	
	public static String getCode(Prompt prompt){
		return getCode(prompt.getCode());
	}
	
	public static String getCode(String code){
		return Message.SYSTEM.getCode()+"-"+code;
	}
	
}
