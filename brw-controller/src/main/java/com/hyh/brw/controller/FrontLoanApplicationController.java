package com.hyh.brw.controller;

import java.math.BigDecimal;
import java.util.Date;
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
import com.hyh.brw.exception.Response;
import com.hyh.brw.exception.ValidationControllerException;
import com.hyh.brw.util.BrwDictionaryBeanUtil;
import com.hyh.brw.util.Util;
import com.hyh.brw.validation.FrontLoanApplicationValidation;
import com.hyh.brw.validation.Message;
import com.hyh.core.bean.helper.annotation.PreventDuplicateSubmission;
import com.hyh.core.dto.ResultBean;
import com.hyh.dao.entity.Dictionary;
import com.hyh.dao.entity.enums.ChannelCodeEnum;
import com.hyh.expand.util.RemoteConnectionFactory.ServerCode;
import com.hyh.interceptor.TokenHandler;
import com.hyh.ucs.dao.entity.Login;
import com.hyh.ucs.dao.entity.User;
import com.hyh.ucs.dao.entity.UserVerificationCode;
import com.hyh.ucs.dao.entity.VerificationCode;
import com.hyh.ucs.dao.entity.enums.Enums.SuccessAndFail;
import com.hyh.ucs.dao.entity.enums.VerificationCodeEnum;
import com.hyh.util.BigDecimalUtil;
import com.hyh.util.CityUtil;
import com.hyh.util.DictionaryBeanUtil;
import com.hyh.util.LogUtil;
import com.hyh.util.ResultUtil;

@RequestMapping(produces = "application/json;charset=UTF-8", value = "/loanapplication")
@Controller
public class FrontLoanApplicationController extends BaseController {

	@ModelAttribute
	public void addMeun(ModelMap map) {
		map.addAttribute("pageName", "loan_page");
	}

	/**
	 * 从菜单上触发此请求，组合资源后，跳转到具体页面
	 * 
	 * @param loanApplication
	 * @return JSON STRING
	 */
	
	@RequestMapping(value = "/forwardlist/{borrowTypeNo}")
	@PreventDuplicateSubmission(generateToken = true)
	public ModelAndView forwardList(@PathVariable String borrowTypeNo) {
		ModelAndView model =getModelAndView();
		try {
			model.addObject("borrowTypeNo", borrowTypeNo);
			model.setViewName("loanapplication/list");
		} catch (Exception e) {
			//生成错误代码、跳转到错误页面
			model.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return model;
	}

	/**
	 * 从菜单上触发此请求，组合资源后，跳转到具体页面
	 * 
	 * @param loanApplication
	 * @return JSON STRING
	 */
	@RequestMapping(value = "/loadBorrowType")
	public ModelAndView loadBorrowType() {
		ModelAndView model = getAjaxModelAndView();
		try {
			List<Dictionary> borrowTypes = DictionaryBeanUtil
					.getDictionaryByType(BrwDictionaryBeanUtil.APPLICATIONTYPE);
			if(borrowTypes.isEmpty()){
				model.addObject("obj", Message.getCode(Message.REQUEST_DICTIONARY));
				LogUtil.getLog(getClass()).error(Message.getCode(Message.REQUEST_DICTIONARY));
			}else{
				model.addObject("obj", borrowTypes);
				model.setViewName("loanapplication/borrowType");
			}
		} catch (Exception e) {
			//生成错误代码、跳转到错误页面
			model.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return model;
	}

	/**
	 * 前台申请借款第三步请求（结束） 借款申请 校验该用户是否已有同类型未审核项目 若有 ，则报错，否则 放回成功
	 * 
	 * @param loanApplication
	 * @return JSON STRING
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value = "/applyLoanApplication")
	@ResponseBody
	@PreventDuplicateSubmission(validateToken = true) 
	public String apply(LoanApplication loanApplication) {
		Response response = new Response();
		response.setStatus(Response.STATUS_ERROR);
		try {
			//如果用户登录，获取手机号码、真实姓名
			loanApplication.setChannelCodeEnums(ChannelCodeEnum.PC);
			loanApplication.setUserId(getUserId());
			ResultBean bean = getNameAndPhone(loanApplication,response);
			if(!ResultUtil.success(bean)){
				response.setToken(TokenHandler.generateGUID(getRequest()));
				return toJsonByMsg(response);
			}
			//controller数据验证
			FrontLoanApplicationValidation.valLoanApplication(loanApplication);
			//对借款金额由万元转换到元
			loanApplication.setLoanAmount(BigDecimalUtil.mul(
					loanApplication.getLoanAmount(), BigDecimal.valueOf(10000L)));
			
			//判断验证码是否输入正确、手机号码、验证码
			bean = valPhoneRegister(loanApplication,response);
			if(!ResultUtil.success(bean)){
				response.setToken(TokenHandler.generateGUID(getRequest()));
				return toJsonByMsg(response);
			}
			//验证手机号码是否注册
			bean = valSms(loanApplication,response);
			if(!ResultUtil.success(bean)){
				response.setToken(TokenHandler.generateGUID(getRequest()));
				return toJsonByMsg(response);
			}
			//用户未注册的情况下进行自注册
			bean = autoRegister(loanApplication,response);
			if(!ResultUtil.success(bean)){
				response.setToken(TokenHandler.generateGUID(getRequest()));
				return toJsonByMsg(response);
			}
			
			//对用户进行验证
			FrontLoanApplicationValidation.valUserIdAndName(loanApplication.getUserId(), loanApplication.getUserName());
			
			//提交申请
			ResultBean<LoanApplication> result = (ResultBean<LoanApplication>) sendBrw(
					"BWF10004", loanApplication);
			if(!ResultUtil.success(result)){
				response.setErrorCode(Message.ALREDAY_SUBMIT_NOTICE.getCode());
				response.setErrorMsg(ResultUtil.getResult(result).getReturnMessage());
				response.setToken(TokenHandler.generateGUID(getRequest()));
				ResultUtil.logMsg(ServerCode.BRW_CONTROLLER.getCode(), result);
				return toJsonByMsg(response);
			}
			response.setStatus(Response.STATUS_SUCCESS);
		} catch (ValidationControllerException e) {
			response.setStatus(Response.STATUS_ERROR);
			response.setErrorCode(e.getDisplayCode());
			response.setErrorMsg(e.getMessage());
			//获取新的token、需要放到页面上
			response.setToken(TokenHandler.generateGUID(getRequest()));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		} catch (Exception e) {
			response.setStatus(Response.STATUS_ERROR);
			response.setErrorCode(Message.ALREDAY_SUBMIT_NOTICE.getCode());
			response.setErrorMsg(Message.UNKNOWN_ERROR.getMsg());
			//获取新的token、需要放到页面上
			response.setToken(TokenHandler.generateGUID(getRequest()));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return toJsonByMsg(response);
	}
	
	@SuppressWarnings({"unchecked","rawtypes"})
	private ResultBean getNameAndPhone(LoanApplication loanApplication,Response response){
		if(loanApplication.getUserId() == null){
			return ResultUtil.getSuccess();
		}
		User user = new User();
		user.setId(getUserId());
		ResultBean<User> userModel = (ResultBean<User>) sendUcs("USR10009",user);
		if(!Util.isSuccess(userModel)){
			ResultUtil.logMsg(ServerCode.BRW_CONTROLLER.getCode(), userModel);
			response.setErrorCode(Message.CONTACT_BLANK_NOTICE.getCode());
			response.setErrorMsg(userModel.getReturnMessage());
			return ResultUtil.getResult(userModel);
		}
		if(userModel.getModel().getIdcardAuth()){
			loanApplication.setContact(userModel.getModel().getFullname());
		}
		Login login = new Login();
		login.setUserId(getUserId());
		ResultBean<Login> loginBean = (ResultBean<Login>) sendUcs("USR10045",login);
		if(!Util.isSuccess(loginBean)){
			ResultUtil.logMsg(ServerCode.BRW_CONTROLLER.getCode(), loginBean);
			response.setErrorCode(Message.PHONE_LEN_NOTICE.getCode());
			response.setErrorMsg(userModel.getReturnMessage());
			return ResultUtil.getResult(userModel);
		}
		loanApplication.setMobilePhone(loginBean.getModel().getCellphone());
		return ResultUtil.getSuccess();
	}
	
	//进行手机号码自注册、发送短信
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ResultBean autoRegister(LoanApplication loanApplication,Response response){
		if(getUserId() != null){
			return ResultUtil.getSuccess();
		}
		User user = new User();
		// 进入自注册流程、 调用用户、规则hyh+手机号码的后8位
		user.setName(CityUtil.getAutoUserId(loanApplication
				.getMobilePhone()));
		String passWd = CityUtil.getAutoPassWord(loanApplication.getMobilePhone(), loanApplication.getCity());
		user.setTranPassword(passWd);
		user.setOldTranPassword(passWd);
		user.setCellphone(loanApplication.getMobilePhone());
		ResultBean<User> mobile = (ResultBean<User>) sendUcs("USR10039", user.getName(),user.getTranPassword(),user.getCellphone(),true,ChannelCodeEnum.PC.getCode());
		if(!Util.isSuccess(mobile)){
			ResultUtil.logMsg(ServerCode.BRW_CONTROLLER.getCode(), mobile);
			response.setErrorCode(Message.PHONE_REGIS_ERR.getCode());
			response.setErrorMsg(ResultUtil.getResult(mobile).getReturnMessage());
			return ResultUtil.getResult(mobile);
		}
		LogUtil.getLog(getClass()).info("autoUserName:"+user.getName()+"autoPassWord:"+passWd);
		loanApplication.setUserId(mobile.getModel().getId());
		loanApplication.setUsrName(mobile.getModel().getName());
		return ResultUtil.getSuccess();
	}
	
	//手机号码是否已经注册过
	@SuppressWarnings("rawtypes")
	public ResultBean valSms(LoanApplication loanApplication,Response response){
		if(loanApplication.getUserId() != null){
			return ResultUtil.getSuccess();
		}
		loanApplication.setUserId(getUserId());
		loanApplication.setUsrName(getUser().getName());
		//判断手机号码是否注册
		User user = new User();
		user.setCellphone(loanApplication.getMobilePhone());
		@SuppressWarnings("unchecked")
		ResultBean<Boolean> mobileReg = (ResultBean<Boolean>)sendUcs("USR10002",user);
		if(!ResultUtil.success(mobileReg)){
			ResultUtil.logMsg(ServerCode.BRW_CONTROLLER.getCode(), mobileReg);
			response.setErrorCode(Message.PHONE_REGIS_NOTICE.getCode());
			response.setErrorMsg(ResultUtil.getResult(mobileReg).getReturnMessage());
			return ResultUtil.getResult(mobileReg);
		}
		if(mobileReg.getModel()){
			response.setErrorCode(Message.PHONE_REGIS_NOTICE.getCode());
			response.setErrorMsg(Message.PHONE_REGIS_NOTICE.getMsg());
			return ResultUtil.getResult(null);
		}
		return ResultUtil.getResult(mobileReg);
	}
	
	//处理手机号码验证码
	@SuppressWarnings("rawtypes")
	public ResultBean valPhoneRegister(LoanApplication loanApplication,Response response){
		ResultBean<Boolean> phoneCode = checkSms(loanApplication);
		response.setErrorMsg(ResultUtil.getResult(phoneCode).getReturnMessage());
		response.setErrorCode(Message.VER_ERROR_NOTICE.getCode());
		return ResultUtil.getResult(phoneCode);
	}

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/sendSms")
	@ResponseBody
	public String sendSms() {
		Response response = new Response();
		response.setStatus(Response.STATUS_ERROR);
		try {
			String mobilePhone = getRequest().getParameter("mobilePhone");
			if(mobilePhone.contains("*")){
				mobilePhone = (String) getRequest().getSession().getAttribute(Message.TELPHONSESSIONNAME);
			}
			FrontLoanApplicationValidation.valPhone(mobilePhone);
			Long nowTime = System.currentTimeMillis();
			Object timeObj = getRequest().getSession().getAttribute(
					mobilePhone +VerificationCodeEnum.借款申请手机验证码.getCode()+ "_TIME");
			if (null != timeObj) {
				Long time = (Long) timeObj;
				if (nowTime - time < 1000 * 5) {
					response.setErrorMsg(Message.VER_SENDSMS_NOTICE.getMsg());
					return toJsonByMsg(response);
				}
			}
			getRequest().getSession().setAttribute(
					mobilePhone +VerificationCodeEnum.借款申请手机验证码.getCode()+ "_TIME", nowTime);
			if (null == getUserId()) {
				//验证手机号码是否注册
				LoanApplication loanApplication = new LoanApplication();
				loanApplication.setMobilePhone(mobilePhone);
				ResultBean bean = valSms(loanApplication,response);
				if(!ResultUtil.success(bean)){
					//获取新的token、需要放到页面上
					return toJsonByMsg(response);
				}
				response = saveVerificationCode(mobilePhone, VerificationCodeEnum.借款申请手机验证码.getCode());
			} else {
				response = saveUserVerficationCode(mobilePhone, VerificationCodeEnum.借款申请手机验证码.getCode());
			}
		} catch (ValidationControllerException e) {
			response.setErrorCode(Message.PHONE_REGIS_ERR.getCode());
			response.setErrorMsg(e.getMessage());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}catch (Exception e) {
			response.setErrorCode(Message.ALREDAY_SUBMIT_NOTICE.getCode());
			response.setErrorMsg(Message.UNKNOWN_ERROR.getMsg());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return toJsonByMsg(response);
	}

	public ResultBean<Boolean> checkSms(LoanApplication application) {
		if (null == getUserId()) {
			VerificationCode verificationCode = new VerificationCode();
			verificationCode.setCode(application.getIdCip());
			verificationCode.setPhoneOrEmail(application.getMobilePhone());
			verificationCode.setType(VerificationCodeEnum.借款申请手机验证码);
			verificationCode.setStatus("6");
			return checkVerificationCode(verificationCode,true);
		} else {
			UserVerificationCode userVerificationCode = new UserVerificationCode();
			userVerificationCode.setCode(application.getIdCip());
			userVerificationCode.setId(getUserId());
			userVerificationCode.setMobilePhone(application.getMobilePhone());
			userVerificationCode.setType(VerificationCodeEnum.借款申请手机验证码);
			userVerificationCode.setStatus(SuccessAndFail.成功);
			userVerificationCode.setUserId(getUserId());
			userVerificationCode.setCreator(String.valueOf(getUserId()));
			userVerificationCode.setSystemCode(ServerCode.BRW_CONTROLLER.getCode());
			return checkUserVerificationCode(userVerificationCode,true);
		}
	}

	@SuppressWarnings("unchecked")
	private ResultBean<Boolean> checkUserVerificationCode(UserVerificationCode userVerificationCode,boolean isSave) {
		return (ResultBean<Boolean>)sendUcs("VER100040",userVerificationCode,isSave);
		
	}

	@SuppressWarnings("unchecked")
	private ResultBean<Boolean> checkVerificationCode(VerificationCode verificationCode, Boolean isSave) {
		return (ResultBean<Boolean>)sendUcs("VER10004",verificationCode,isSave);
	}

	/**
	 * 说明：ModelAndView里面封装的是相对路径，支持外部页面跳转，如果 要内部跳转，需要先跳转到外部页面，然后跳到内部请求
	 * 
	 * @param userId
	 * @param map
	 * @param req
	 * @param res
	 * @return JSON STRING
	 */
	@RequestMapping(value = "/second")
	public String second() {
		return "redirect:/loanapplication/first";
	}

	/**
	 * 测试
	 * 
	 * @param userId
	 * @param map
	 * @param req
	 * @param res
	 * @return JSON STRING
	 */
	@RequestMapping(value = "/first")
	public String first() {
		return "loanapplication/list";
	}

	/**
	 * 检查用户
	 */
	@RequestMapping(value = "/checkUser")
	@ResponseBody
	@SuppressWarnings("unchecked")
	public String checkLoanUser() {
		Response response = new Response();
		response.setStatus(Response.STATUS_ERROR);
		try {
			if (!checkUser()) {
				return toJsonByMsg(response);
			}
			//获取用户真实姓名
			User user = new User();
			user.setId(getUserId());
			ResultBean<User> userModel = (ResultBean<User>) sendUcs("USR10009",user);
			if(!Util.isFrontSuccess(userModel)){
				response.setErrorCode(ResultUtil.systemCode(ServerCode.BRW_CONTROLLER.getCode(), userModel));
				return toJsonByMsg(response);
			}
			//获取手机号码
			Login login = new Login();
			login.setUserId(getUserId());
			ResultBean<Login> loginBean = (ResultBean<Login>) sendUcs("USR10045",login);
			if(!Util.isSuccess(loginBean)){
				response.setErrorCode(ResultUtil.systemCode(ServerCode.BRW_CONTROLLER.getCode(), loginBean));
			}
			//设置返回页面信息
			response.setStatus(Response.STATUS_SUCCESS);
			userModel.getModel().setCellphone(loginBean.getModel().getCellphone());
			getRequest().getSession().setAttribute(Message.TELPHONSESSIONNAME,userModel.getModel().getCellphone());
			response.setResponseBody(userModel.getModel());
		} catch (Exception e) {
			response.setErrorCode(Message.getCode(Message.UNKNOWN_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(),e);
		}
		return toJsonByMsg(response);
	}
	
	/**
	 * 借款成功页面
	 */
	@RequestMapping(value = "/success")
	public String success() {
		return "loanapplication/success";
	}
	
	/**
	 * 借款错误页面
	 */
	@RequestMapping(value = "/error")
	public ModelAndView error() {
		ModelAndView andView = new ModelAndView();
		try {
			String errorCode = getRequest().getParameter("errorCode");
			if(StringUtils.isBlank(errorCode)){
				andView.addObject("obj", Message.getCode(Message.LOSE_ERROR_CODE));
			}else{
				andView.addObject("obj", errorCode);
			}
		} catch (Exception e) {
			LogUtil.getLog(getClass()).error(e.getMessage(),e);
			andView.addObject("obj", Message.getCode(Message.UNKNOWN_ERROR));
		}
		andView.setViewName("loanapplication/error");
		return andView;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/loginedLoanApplication")
	public ModelAndView loginedLoanApplication(LoanApplication loanApplication) {
		ModelAndView modelAndView = getModelAndView();
		try {
			//controller 验证
			FrontLoanApplicationValidation.valLoanApplication(loanApplication);
			//获取用户名和密码
			loanApplication.setUserId(getUser().getId());
			loanApplication.setUserName(getUser().getName());
			//对借款金额由万元转换到元
			loanApplication.setLoanAmount(BigDecimalUtil.mul(
					loanApplication.getLoanAmount(), BigDecimal.valueOf(10000L)));
			//controller验证
			FrontLoanApplicationValidation.valUserIdAndName(loanApplication.getUserId(), loanApplication.getUserName());
			//远程调用
			ResultBean<LoanApplication> result = (ResultBean<LoanApplication>) sendBrw(
					"BWF10004", loanApplication);
			if(Util.isSuccess(result)){
				modelAndView.setViewName("loanapplication/success");
			}else{
				LogUtil.getLog(getClass()).info(getErrorMsg(result));
			}
		} catch (ValidationControllerException e) {
			modelAndView.addObject("obj", e.getCode());
			LogUtil.getLog(getClass()).error(e.getMessage(),e);
		} catch (Exception e) {
			modelAndView.addObject("obj", Message.getCode(Message.SOCKET_ERROR));
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return modelAndView;
	}
	
	@RequestMapping(value = "/login")
	@ResponseBody
	public ModelAndView login() {
		return forwardList("01");
	}
	
	
	/**
	 * 保存无登陆用户的手机验证码
	 * */
	 @SuppressWarnings("deprecation")
	private Response saveVerificationCode(String mobilePhone, String typeCode) {
		Response resp = new Response();
		resp.setStatus(Response.STATUS_ERROR);
		try {
			VerificationCode verificationCode = new VerificationCode();
			verificationCode.setBackId("1");
			verificationCode.setChannelCode("1");
			verificationCode.setCode("1");
			verificationCode.setCodeExpireTime(new Date());
			verificationCode.setCreateTime(new Date());
			verificationCode.setCreator("1");
			verificationCode.setFailTime(0);
			verificationCode.setFrontId("2");
			verificationCode.setHmac("3");
			verificationCode.setPhoneOrEmail(mobilePhone);
			verificationCode.setStatus(SuccessAndFail.成功.getCode());
			verificationCode.setSystemCode("7");
			verificationCode.setType(VerificationCodeEnum.getObjByCode(typeCode));
			verificationCode.setSystemCode(ServerCode.BRW_CONTROLLER.getCode());

			@SuppressWarnings("unchecked")
			ResultBean<VerificationCode> resultBean = (ResultBean<VerificationCode>) sendUcs(
					"VER10003", verificationCode);
			if (Util.isSuccess(resultBean)) {
				String smsCode = resultBean.getModel().getCode();
				resp.setStatus(Response.STATUS_SUCCESS);
				resp.setTransCode(smsCode);
				//设置发送验证码次数
				resp.setTimes(getVerificationCodeSendTime(mobilePhone,VerificationCodeEnum.借款申请手机验证码));
			}else{
				resp.setErrorCode(Message.VER_GET_NOTICE.getCode());
				resp.setErrorMsg(resultBean.getReturnMessage());
				resp.setTimes(5);
				LogUtil.getLog(getClass()).info(getErrorMsg(resultBean));
			}
		} catch (Exception e) {
			resp.setErrorMsg(Message.VER_GET_NOTICE.getCode());
			resp.setErrorMsg(Message.VER_GET_NOTICE.getMsg());
			LogUtil.getLog(getClass()).error(e.getMessage(), e);
		}
		return resp;
	}
	 
		@SuppressWarnings("deprecation")
		private Response saveUserVerficationCode(String mobilePhone, String type) {
			Response resp = new Response();
			resp.setStatus(Response.STATUS_ERROR);
			try {
				UserVerificationCode userVerficationCode = new UserVerificationCode();
				userVerficationCode.setUserId(getUserId());
				userVerficationCode.setSystemCode(ServerCode.BRW_CONTROLLER.getCode());
				userVerficationCode.setMobilePhone(mobilePhone);
				userVerficationCode.setTypeCode(type);

				@SuppressWarnings("unchecked")
				ResultBean<UserVerificationCode> resultBean = (ResultBean<UserVerificationCode>) sendUcs(
						"VER100030", userVerficationCode);
				if (Util.isSuccess(resultBean)) {
					String smsCode = resultBean.getModel().getCode();
					resp.setStatus(Response.STATUS_SUCCESS);
					resp.setTransCode(smsCode);
					//设置发送验证码次数
					resp.setTimes(getUserVerificationCodeSendTime(userVerficationCode.getUserId(),VerificationCodeEnum.借款申请手机验证码));
				}else{
					resp.setErrorCode(Message.VER_GET_NOTICE.getCode());
					resp.setErrorMsg(resultBean.getReturnMessage());
					resp.setTimes(5);
					LogUtil.getLog(getClass()).info(getErrorMsg(resultBean));
				}
			} catch (Exception e) {
				resp.setErrorMsg(Message.VER_GET_NOTICE.getCode());
				resp.setErrorMsg(Message.VER_GET_NOTICE.getMsg());
				LogUtil.getLog(getClass()).error(e.getMessage(), e);
			}
			return resp;
		}
		
		
		/** 根据用户信息 获得发送 验证码 的次数 */
		@SuppressWarnings({ "unchecked" })
		public static int getUserVerificationCodeSendTime(Long userId,
				VerificationCodeEnum type) {
			UserVerificationCode userVerificationCode = new UserVerificationCode();
			userVerificationCode.setUserId(userId);
			userVerificationCode.setBeginDate(new Date());
			userVerificationCode.setEndDate(new Date());
			userVerificationCode.setType(type);
			ResultBean<Integer> result = (ResultBean<Integer>) sendUcs("USR10044", userVerificationCode);
			if(Util.isNotNull(result) && null == result.getModel()){
				return 0;
			}
			LogUtil.getLog(FrontLoanApplicationController.class).info(getErrorMsg(result));
			return result.getModel().intValue();
		}
		
		/** 根据手机号码 获得发送 验证码 的次数 */
		@SuppressWarnings({ "unchecked" })
		public static int getVerificationCodeSendTime(String phone,
				VerificationCodeEnum type) {
			VerificationCode code = new VerificationCode();
			code.setPhoneOrEmail(phone);
			code.setBeginDate(new Date());
			code.setEndDate(new Date());
			code.setType(type);
			ResultBean<Integer> result = (ResultBean<Integer>) sendUcs("USR10043", code);
			if(Util.isNotNull(result) && null == result.getModel()){
				return 0;
			}
			
			LogUtil.getLog(FrontLoanApplicationController.class).info(getErrorMsg(result));
			return result.getModel().intValue();
		}
}
