package com.hyh.brw.controller.base;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.druid.support.json.JSONUtils;
import com.alisoft.xplatform.asf.cache.IMemcachedCache;
import com.hyh.brw.exception.Response;
import com.hyh.brw.validation.Message;
import com.hyh.controller.expand.util.LoginSession;
import com.hyh.core.dto.ResultBean;
import com.hyh.expand.util.RemoteConnectionFactory;
import com.hyh.expand.util.RemoteConnectionFactory.ServerCode;
import com.hyh.platform.cache.CacheInitialization;
import com.hyh.platform.cache.CacheKey;
import com.hyh.ucs.dao.entity.User;
import com.hyh.util.LogUtil;
import com.hyh.util.StringUtil;

/**
 *
 * @ProjectName: [vita]
 * @Package: [com.chyjr.vita.base.BaseController]
 * @ClassName: [BaseController]
 * @Description: [基础控制器]
 * @Author: [cz]
 * @CreateDate: [Oct 14, 2014 4:40:00 PM]
 * @UpdateUser: [cz]
 * @UpdateDate: [Oct 14, 2014 4:40:00 PM]
 * @UpdateRemark: []
 * @Version: [v1.0]
 *
 */
@SuppressWarnings("rawtypes")
public class BaseController {
	@Autowired
	private CacheInitialization cacheInitialization;
	private Integer pageSize = 10;
	private Integer pageNum = 1;
	private String sortString;

	public Integer getPageNum() {
		String pageNumTemp = getParameter(StringUtil.PAGE_NUM);
		if (StringUtils.isNotBlank(pageNumTemp)) {
			return Integer.parseInt(pageNumTemp);
		} else {
			return pageNum;
		}
	}

	public Integer getPageSize() {
		String pageSizeTemp = getParameter(StringUtil.PAGE_SIZE);
		if (StringUtils.isNotBlank(pageSizeTemp)) {
			return Integer.parseInt(pageSizeTemp);
		} else {
			return pageSize;
		}
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	/** BRW远程Service系统访问 */
	protected static ResultBean sendBrw(String apiCode,
			Object... params) {
		return RemoteConnectionFactory.sendBrw(ServerCode.BRW_CONTROLLER, apiCode, params);
	}

	/** Ucs远程Service系统访问 */
	protected static ResultBean sendUcs(String apiCode,
			Object... params) {
		return RemoteConnectionFactory.sendUcs(ServerCode.BRW_CONTROLLER, apiCode, params);
	}

	/** Inv远程Service系统访问 */
	protected static ResultBean sendInv(String apiCode,
			Object... params) {
		return RemoteConnectionFactory.sendInv(ServerCode.BRW_CONTROLLER, apiCode, params);
	}

	/** Wall远程Service系统访问 */
	protected static ResultBean sendWm(String apiCode,
			Object... params) {
		return RemoteConnectionFactory.sendWm(ServerCode.BRW_CONTROLLER, apiCode, params);
	}

	/**
	 * 获取request对象
	 *
	 * @return
	 */
	protected HttpServletRequest getRequest() {
		return ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
	}

	protected IMemcachedCache getCache() {
		return cacheInitialization.getRomoteInstance(CacheKey.MEM_CLIENT_COMM);
	}

	protected IMemcachedCache getCache(String a) {
		return cacheInitialization.getRomoteInstance(a);
	}

	/**
	 * 获取request中的参数
	 *
	 * @param name
	 * @return
	 */
	protected String getParameter(String name) {
		return getRequest().getParameter(name);
	}

	/**
	 * 获取当前登录用户ID
	 *
	 * @return
	 */
	protected String getLoginUserId() {
		if (getRequest().getAttribute("UID") != null) {
			return (String) getRequest().getAttribute("UID");
		} else {
			return null;
		}
	}

	/**
	 * 判断用户是否登录
	 * 
	 * @return
	 */
	protected Boolean checkUser() {
		if (getUser().getUserId() == null)
			return false;
		return true;
	}

	public Long getUserId() {
		User user = getUser();
		
		Long loginId = null;
		if (user != null) {
			loginId = user.getUserId();
		}
		return loginId;
	}

	/**
	 * 得到用户
	 * 
	 * @return
	 */
	public User getUser() {
		User user = new User();
		LogUtil.getLog(getClass()).info("start get user");
		HttpSession session = getRequest().getSession();
		if(session.getAttribute(CacheKey.LOGIN) == null){
			return user;
		}
		
		LoginSession loginSession  =  (LoginSession) session.getAttribute(CacheKey.LOGIN);
		if (loginSession != null) {
			user.setUserId(loginSession.getUserId());
			user.setId(loginSession.getUserId());
			user.setName(loginSession.getLoginUserName());
		}
		LogUtil.getLog(getClass()).info("get user name is "+user.getUsrName());
		LogUtil.getLog(getClass()).info("get id is "+user.getId());
		LogUtil.getLog(getClass()).info("get user id is "+user.getUserId());
		return user;

	}

	/**
	 * 获取登录用户名
	 * 
	 * @return
	 */
	protected String getLoginUserName() {
		if (getRequest().getAttribute("UNAME") != null) {
			return (String) getRequest().getAttribute("UNAME");
		} else {
			return null;
		}
	}

	public String operationResult(boolean result) {
		String msg = "success";
		if (!result) {
			msg = "failure";
		}
		return operationResult(result, msg);
	}

	public String operationResult(boolean result, String msg) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("result", result);
		map.put("msg", msg);
		try {
			return JSONUtils.toJSONString(map);
		} catch (Exception e) {
			LogUtil.getLog(getClass()).error(e.getMessage(),e);
			return "";
		}

	}

	protected Map<String, Object> buildPageDBParamter(HttpServletRequest req) {
		Map<String, Object> param = new HashMap<String, Object>();
		String pageNo = req.getParameter(StringUtil.PAGE_NO);
		if (StringUtils.isBlank(pageNo)) {
			pageNo = "1";
		}
		Integer startIndex = (Integer.valueOf(pageNo) - 1) * pageNum;
		param.put(StringUtil.PAGE_NO, pageNo);
		param.put(StringUtil.PAGE_NUM, pageNum);
		param.put("startIndex", startIndex);
		return param;
	}

	protected void buildPageViewParamter(ModelMap m, HttpServletRequest req,
			Integer allRecord) {
		String pageNo = req.getParameter(StringUtil.PAGE_NO);
		if (StringUtils.isBlank(pageNo)) {
			pageNo = "1";
		}
		m.put("recordCount", allRecord);
		m.put(StringUtil.PAGE_NUM, pageNum);
		m.put(StringUtil.PAGE_NO, Integer.valueOf(pageNo));
	}

	@SuppressWarnings("unchecked")
	protected String toJson(ResultBean<?> result) {
		// 处理为空
		if (result == null) {
			return JSONObject.fromObject(new ResultBean(Message.UNKNOWN_ERROR, Boolean.TRUE)).toString();
		}
		// 处理集合
		if (result.getModel().getClass()
				.isAssignableFrom(List.class.getClass())) {
			return JSONArray.fromObject(result).toString();
		}
		// 处理一般对象
		return JSONObject.fromObject(result).toString();
	}

	protected String toJsonByErrorMsg(String msg) {
		return toJsonByMsg(new Response(null, msg, Response.STATUS_ERROR));
	}

	protected String toJsonBySuccessMsg(String msg) {
		return toJsonByMsg(new Response(null, msg, Response.STATUS_SUCCESS));
	}

	protected String toJsonByMsg(Response resObj) {
		return JSONObject.fromObject(resObj).toString();
	}

	/**
	 * 弹出dialog
	 * 
	 * @param model
	 *            默认查询条件
	 * @return 满足条件的债权信息
	 * @throws NoSuchAlgorithmException
	 */
	@RequestMapping(value = "/logindialog")
	@ResponseBody
	public ModelAndView loginDialog() {

		// 设置跳转页面
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/logindialog/logindialog");
		modelAndView.addObject("uuid",UUID.randomUUID().toString());
		// 缓冲区管理
		String key = getRequest().getSession().getId() + CacheKey.CAPTCHA_CODE;
		getCache().remove(key);

		return modelAndView;
	}

	protected ModelAndView getModelAndView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("common/error");
		return modelAndView;
	}

	protected ModelAndView getAjaxModelAndView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("common/errorMsg");
		return modelAndView;
	}

	protected static String getErrorMsg(ResultBean<?> bean) {
		if (bean == null)
			return Message.getCode(Message.UNKNOWN_ERROR);
		return "代码:" + bean.getReturnCode() + ",错误描述:"
				+ bean.getReturnMessage();
	}

	protected String getTipError(ResultBean<?> bean) {
		if (bean == null)
			return Message.UNKNOWN_ERROR.getMsg();
		return bean.getReturnMessage();
	}

	public String getSortString() {
		return sortString;
	}

	public void setSortString(String sortString) {
		this.sortString = sortString;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

}
