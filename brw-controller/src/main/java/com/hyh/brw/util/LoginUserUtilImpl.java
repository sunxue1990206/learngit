package com.hyh.brw.util;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpSession;

import com.hyh.controller.expand.util.LoginSession;
import com.hyh.ucs.dao.entity.User;
import com.hyh.util.LoginUserUtil;

public class LoginUserUtilImpl extends LoginUserUtil {

	@Override
	public String getLoginUserName(HttpServletRequest request) {
		User user = getLoginUser(request);
		if (null == user) {
			return null;
		}

		return user.getName();
	}

	@Override
	public String getLoginUserId(HttpServletRequest request) {
		User user = getLoginUser(request);
		if (null == user) {
			return null;
		}
		Long userId = user.getId();
		if (null == userId) {
			return null;
		}
		return String.valueOf(userId);
	}

	private User getLoginUser(HttpServletRequest request) {
		User user = null;
		HttpSession session = request.getSession();
		if (session.getAttribute("loginSession") != null) {
			user = new User();
			user.setId(((LoginSession) session.getAttribute("loginSession"))
					.getUserId());
			user.setUserId(((LoginSession) session.getAttribute("loginSession"))
					.getUserId());
			user.setName(((LoginSession) session.getAttribute("loginSession"))
					.getLoginUserName());
		}
		return user;
	}

}
