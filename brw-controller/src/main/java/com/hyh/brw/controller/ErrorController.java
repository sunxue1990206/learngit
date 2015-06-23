package com.hyh.brw.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.hyh.brw.controller.base.BaseController;

@Controller
@RequestMapping("error")
public class ErrorController extends BaseController{
	@RequestMapping("502")
	public ModelAndView get502ModelAndView(HttpServletRequest request) {
		return ErrorController.get502ModelAndViewPage(null,
				request.getAttribute("exception_code"));
	}

	@RequestMapping("404")
	public ModelAndView get404ModelAndView() {
		return new ModelAndView("error/404");
	}

	public static ModelAndView get502ModelAndViewPage(Throwable throwable,
			Object code) {
		ModelAndView view = new ModelAndView("error/502");
		if (null == throwable) {
			return view;
		}
		view.addObject("code", code);
		return view;
	}
	
	@RequestMapping("forward502")
	public ModelAndView get502() {
		ModelAndView view = new ModelAndView("error/502");
		String error = getRequest().getParameter("error");
		view.addObject("obj", error);
		return view;
	}
	
}
