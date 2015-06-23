package com.hyh.brw.controller;

import java.sql.Timestamp;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hyh.brw.controller.base.BaseController;
import com.hyh.brw.dao.entity.LoanApplication;
import com.hyh.brw.dao.entity.LoanHold;
import com.hyh.brw.dao.entity.RepaymentPlan;
import com.hyh.brw.exception.ValidationControllerException;
import com.hyh.brw.util.BrwConstantBeanUtil;
import com.hyh.brw.util.BrwDictionaryBeanUtil;
import com.hyh.brw.util.DicNum;
import com.hyh.brw.util.Util;
import com.hyh.brw.validation.FrontLoanManagerValidation;
import com.hyh.brw.validation.Message;
import com.hyh.core.dto.ResultBean;
import com.hyh.util.CommUtil;
import com.hyh.util.LogUtil;
import com.hyh.util.StringUtil;

@RequestMapping(produces = "application/json;charset=UTF-8", value = "/account")
@Controller
@SuppressWarnings("unchecked")
public class FrontLoanManagerController extends BaseController {
	
	@ModelAttribute
	public void addMeun(ModelMap map) {

		map.addAttribute("pageName", "account_page");
 
	}

	/**
	 * 账户中心_借款管理--界面入口
	 */
	@RequestMapping(value="/loanApply")
	@ResponseBody
	public ModelAndView loanApply(){
		//设置跳转页面
		ModelAndView modelAndView=getModelAndView();
		try {
			//controller验证
			FrontLoanManagerValidation.valUserId(getUserId());
			modelAndView.setViewName("account/loanApply");	
		}catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	@RequestMapping(value="/loanApplyData")
	@ResponseBody
	public ModelAndView loanApplyData(){
		//查询数据:账户中心_借款管理-借款申请
		ModelAndView modelAndView = getAjaxModelAndView();
		try {
			String beginTime = getParamBeginTime();
			String endTime = getParamEndTime();
			//查询-账户中心_借款管理_借款记录
			LoanApplication loanApplication = new LoanApplication();
			//从session获取用户
			loanApplication.setUserId(getUserId());
			if(StringUtils.isNotBlank(beginTime)){
				loanApplication.setBeginTime(Timestamp.valueOf(beginTime));	
			}
			if(StringUtils.isNotBlank(endTime)){
				loanApplication.setEndTime(Timestamp.valueOf(endTime));	
			}
			//controller验证
			FrontLoanManagerValidation.valUserId(loanApplication.getUserId());
			//第几页
			loanApplication.setPageNum(getPageNum());
			//每页多少条
			loanApplication.setPageSize(getPageSize());
			loanApplication.setSortString("APPLICATION_TIME.DESC");
			//远程调用
			ResultBean<List<LoanApplication>> bean = (ResultBean<List<LoanApplication>>) sendBrw("BWF10002",loanApplication);
			if(Util.isNotNull(bean)){
				if(Util.isFrontSuccess(bean)){
					modelAndView.setViewName("account/loanApplyData");	
					modelAndView.addObject("obj", bean.getModel());
					modelAndView.addObject(StringUtil.PAGE_COUNT, bean.getPageCount());
				}else{
					modelAndView.addObject("obj", Message.getCode(bean.getReturnCode()));
					LogUtil.getLog(getClass()).error(getErrorMsg(bean));
				}
			}else{
				modelAndView.addObject("obj", Message.getCode(Message.BWF10002_ERROR));
			}
		}catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	/**
	 * 账户中心_借款管理-招标中
	 */
	@RequestMapping(value="/loanBidding")
	@ResponseBody
	public ModelAndView loanBidding(){
		//设置跳转页面
		ModelAndView modelAndView = getModelAndView();
		try {
			FrontLoanManagerValidation.valUserId(getUserId());
			modelAndView.setViewName("account/loanBidding");	
		}catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	/**
	 * 账户中心_借款管理-招标中
	 */
	@RequestMapping(value="/loanBiddingData")
	@ResponseBody
	public ModelAndView loanBiddingData(){
		//设置跳转页面
		ModelAndView modelAndView = getAjaxModelAndView();
		try {
			String beginTime = getParamBeginTime();
			String endTime = getParamEndTime();
			LoanHold hold = new LoanHold();
			if(StringUtils.isNotBlank(beginTime)){
				hold.setBeginTime(Timestamp.valueOf(beginTime));	
			}
			if(StringUtils.isNotBlank(endTime)){
				hold.setEndTime(Timestamp.valueOf(endTime));	
			}
			//从session获取用户
			hold.setUserId(getUserId());
			//controller验证
			FrontLoanManagerValidation.valUserId(hold.getUserId());
			//第几页
			hold.setPageNum(getPageNum());
			//每页多少条
			hold.setPageSize(getPageSize());
			hold.setSortString("PLAN_PUBLISH_TIME.DESC");
			//远程调用
			ResultBean<List<LoanHold>> bean = (ResultBean<List<LoanHold>>) sendBrw("BWF1007",hold);
			if(Util.isNotNull(bean)){
				if(Util.isFrontSuccess(bean)){
					modelAndView.setViewName("account/loanBiddingData");
					modelAndView.addObject("obj", bean.getModel());
					modelAndView.addObject(StringUtil.PAGE_COUNT, bean.getPageCount());
				}else{
					modelAndView.addObject("obj", Message.getCode(bean.getReturnCode()));
					LogUtil.getLog(getClass()).error(getErrorMsg(bean));
				}
			}else{
				modelAndView.addObject("obj", Message.getCode(Message.BWF1007_ERROR));
			}
		}catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	/**
	 * 账户中心_借款管理-还款中
	 */
	@RequestMapping(value="/loanRepaymenting")
	@ResponseBody
	public ModelAndView loanRepaymenting(){
		//设置跳转页面
		ModelAndView modelAndView=getModelAndView();
		try {
			FrontLoanManagerValidation.valUserId(getUserId());
			modelAndView.setViewName("account/loanRepaymenting");	
		}catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	/**
	 * 账户中心_借款管理-还款中
	 */
	@RequestMapping(value="/loanRepaymentingData")
	@ResponseBody
	public ModelAndView loanRepaymentingData(){
		//设置跳转页面
		ModelAndView modelAndView=getAjaxModelAndView();
		try {
			String beginTime = getParamBeginTime();
			String endTime = getParamEndTime();
			LoanHold hold = new LoanHold();
			//从session获取用户
			hold.setUserId(getUserId());
			if(StringUtils.isNotBlank(beginTime)){
				hold.setBeginTime(Timestamp.valueOf(beginTime));	
			}
			if(StringUtils.isNotBlank(endTime)){
				hold.setEndTime(Timestamp.valueOf(endTime));	
			}
			//状态为还款中
			hold.setStatus(BrwDictionaryBeanUtil.getDicsOfKey(
					BrwDictionaryBeanUtil.LOANHOLD_STATUS
					, BrwConstantBeanUtil.LOANHOLD_STATUS_PAY_07));
			//controller验证
			FrontLoanManagerValidation.valUserIdAndStatus(hold.getUserId(), hold.getStatus(), DicNum.DIC_NUM_07);
			//第几页
			hold.setPageNum(getPageNum());
			//每页多少条
			hold.setPageSize(getPageSize());
			hold.setSortString("PLAN_PUBLISH_TIME.DESC");
			//远程调用
			ResultBean<List<LoanHold>> bean = (ResultBean<List<LoanHold>>) sendBrw("BWF1015",hold);
			if(Util.isNotNull(bean)){
				if(Util.isFrontSuccess(bean)){
					modelAndView.setViewName("account/loanRepaymentingData");	
					modelAndView.addObject("obj", bean.getModel());
					modelAndView.addObject(StringUtil.PAGE_COUNT, bean.getPageCount());
				}else{
					modelAndView.addObject("obj", Message.getCode(bean.getReturnCode()));
					LogUtil.getLog(getClass()).error(getErrorMsg(bean));
				}
			}else{
				modelAndView.addObject("obj", Message.getCode(Message.BWF1015_ERROR));
			}
		}catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	/**
	 * 账户中心_借款管理-已还清
	 */
	@RequestMapping(value="/loanRepaymentClosed")
	@ResponseBody
	public ModelAndView loanRepaymentClosed(){
		//设置跳转页面
		ModelAndView modelAndView = getModelAndView();
		try {
			FrontLoanManagerValidation.valUserId(getUserId());
			modelAndView.setViewName("account/loanRepaymentClosed");	
		}catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	/**
	 * 账户中心_借款管理-已还清
	 */
	@RequestMapping(value="/loanRepaymentClosedData")
	@ResponseBody
	public ModelAndView loanRepaymentClosedData(){
		//设置跳转页面
		ModelAndView modelAndView =getAjaxModelAndView();
		try {
			String beginTime = getParamBeginTime();
			String endTime = getParamEndTime();
			LoanHold hold = new LoanHold();
			//从session获取用户
			hold.setUserId(getUserId());
			if(StringUtils.isNotBlank(beginTime)){
				hold.setBeginTime(Timestamp.valueOf(beginTime));	
			}
			if(StringUtils.isNotBlank(endTime)){
				hold.setEndTime(Timestamp.valueOf(endTime));	
			}
			//状态为还款中
			hold.setStatus(BrwDictionaryBeanUtil.getDicsOfKey(
					BrwDictionaryBeanUtil.LOANHOLD_STATUS
					, BrwConstantBeanUtil.LOANHOLD_STATUS_PAYED_08));
			//第几页
			hold.setPageNum(getPageNum());
			//每页多少条
			hold.setPageSize(getPageSize());
			hold.setSortString("SETTLE_TIME.DESC");
			//controller验证
			FrontLoanManagerValidation.valUserIdAndStatus(hold.getUserId(), hold.getStatus(), DicNum.DIC_NUM_08);
			//远程调用
			ResultBean<List<LoanHold>> bean = (ResultBean<List<LoanHold>>) sendBrw("BWF1016",hold);
			if(Util.isNotNull(bean)){
				if(Util.isFrontSuccess(bean)){
					modelAndView.setViewName("account/loanRepaymentClosedData");	
					modelAndView.addObject("obj", bean.getModel());
					modelAndView.addObject(StringUtil.PAGE_COUNT, bean.getPageCount());
				}else{
					modelAndView.addObject("obj", Message.getCode(bean.getReturnCode()));
					LogUtil.getLog(getClass()).error(getErrorMsg(bean));
				}
			}else{
				modelAndView.addObject("obj", Message.getCode(Message.BWF1016_ERROR));
			}
		}catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	/**
	 * 账户中心_借款管理-还款中
	 */
	@RequestMapping(value="/returnPlan")
	@ResponseBody
	public ModelAndView returnPlan(){
		//设置跳转页面
		ModelAndView modelAndView = getModelAndView();
		try {
			FrontLoanManagerValidation.valUserId(getUserId());
			modelAndView.addObject("loanHoldId", "");
			modelAndView.setViewName("account/returnPlan");	
		}catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	/**
	 * 账户中心_借款管理-还款中
	 */
	@RequestMapping(value="/returnPlan/{loanHoldId}")
	@ResponseBody
	public ModelAndView returnPlan(@PathVariable Long loanHoldId){
		//设置跳转页面
		ModelAndView modelAndView = getModelAndView();
		try {
			FrontLoanManagerValidation.valUserId(getUserId());
			modelAndView.addObject("loanHoldId", loanHoldId);
			modelAndView.setViewName("account/returnPlan");	
		}catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	/**
	 * 账户中心_借款管理-还款中
	 */
	@RequestMapping(value="/returnPlanData")
	@ResponseBody
	public ModelAndView returnPlanData(){
		//设置跳转页面
		ModelAndView modelAndView = getAjaxModelAndView();
		try {
			String beginTime = getParamBeginTime();
			String endTime = getParamEndTime();
			RepaymentPlan repay = new RepaymentPlan();
			if(StringUtils.isNotBlank(beginTime)){
				repay.setBeginDate(CommUtil.formatStringToDate(beginTime));	
			}
			if(StringUtils.isNotBlank(endTime)){
				repay.setEndDate(CommUtil.formatStringToDate(endTime));	
			}
			String status = getParamStatus();
			if(StringUtils.isNotBlank(status)){
				repay.setCommonStatus(status);	
			}
			String loanHoldId = getLoanholdId();
			if(StringUtils.isNotBlank(loanHoldId)){
				repay.setLoanHoldId(Long.valueOf(loanHoldId));	
			}
			//从session获取用户
			repay.setUserId(getUserId());
			//controller验证
			FrontLoanManagerValidation.valUserId(repay.getUserId());
			//第几页
			repay.setPageNum(getPageNum());
			//每页多少条
			repay.setPageSize(getPageSize());
			repay.setSortString("PLAN_REPAYMENT_DATE.ASC");
			//远程调用
			ResultBean<List<RepaymentPlan>> bean = (ResultBean<List<RepaymentPlan>>) sendBrw("BWF1017",repay);
			if(Util.isNotNull(bean)){
				if(Util.isFrontSuccess(bean)){
					modelAndView.setViewName("account/returnPlanData");	
					modelAndView.addObject("obj", bean.getModel());
					modelAndView.addObject(StringUtil.PAGE_COUNT, bean.getPageCount());
				}else{
					modelAndView.addObject("obj", Message.getCode(bean.getReturnCode()));
					LogUtil.getLog(getClass()).error(getErrorMsg(bean));
				}
			}else{
				modelAndView.addObject("obj", Message.getCode(Message.BWF1017_ERROR));
			}
		}catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	
	private String getParamBeginTime(){
		return getRequest().getParameter("beginTime");
	}
	
	private String getParamEndTime(){
		return getRequest().getParameter("endTime");
	}
	
	private String getParamStatus(){
		return getRequest().getParameter("status");
	}
	
	private String getLoanholdId(){
		return getRequest().getParameter("investmentHoldId");
	}

}
