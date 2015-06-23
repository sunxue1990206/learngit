package com.hyh.brw.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.hyh.expand.util.Configuration;

public class SessionFilter implements Filter {

	/**
	 * 账号中心url地址
	 */
	private static final String USER_CONTROLLER_ADDRESS = "userControllerAddress";
	/**
	 * inv url地址
	 */
	private static final String INV_CONTROLLER_ADDRESS = "invControllerAddress";
	/**
	 * brw url地址
	 */
	private static final String BRW_CONTROLLER_ADDRESS = "brwControllerAddress";
	
	/**
	 * ucsDomain
	 */
	private static final String UCS_DOMAIN = "ucsDomain";

	public void doFilter(ServletRequest servletrequest,
			ServletResponse servletresponse, FilterChain filterchain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) servletrequest;
		servletrequest.setAttribute(USER_CONTROLLER_ADDRESS,
				Configuration.getConfigItem(Configuration.ConfigItem.UCS_CONTROLLER_URL));
		req.setAttribute(BRW_CONTROLLER_ADDRESS,
				Configuration.getConfigItem(Configuration.ConfigItem.BRW_CONTROLLER_URL));
		req.setAttribute(INV_CONTROLLER_ADDRESS,
				Configuration.getConfigItem(Configuration.ConfigItem.INV_CONTROLLER_URL));
		req.setAttribute(UCS_DOMAIN, UCS_DOMAIN);
		
		filterchain.doFilter(servletrequest, servletresponse);
	}

	public void destroy() {
	}


	public void init(FilterConfig filterconfig) throws ServletException {

	}
}
