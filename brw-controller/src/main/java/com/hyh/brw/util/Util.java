package com.hyh.brw.util;

import org.apache.commons.lang.StringUtils;

import com.hyh.core.BaseConstantCode;
import com.hyh.core.dto.ResultBean;

public class Util {
	
	/**
	 * 判断返回是否成功，如果 ResultBean<T>（result）为空，则返回false,如果ResultBean<T>（result）的
	 * returnCode和BaseConstantCode.SUCCESS.code相同，则返回true,否则返回false
	 * */
	public static <T> boolean isSuccess(ResultBean<T> result) {
		if (null == result) {
			return false;
		}
		if (StringUtils.equals(result.getReturnCode(),
				BaseConstantCode.SUCCESS.getCode())) {
			return true;
		}
		return false;
	}
	
	/**
	 * 判断返回是否成功，如果 ResultBean<T>（result）为空，则返回false,如果ResultBean<T>（result）的
	 * returnCode和BaseConstantCode.SUCCESS.code相同，则返回true,否则返回false
	 * */
	public static <T> boolean isFrontSuccess(ResultBean<T> result) {
		if (StringUtils.equals(result.getReturnCode(),
				BaseConstantCode.SUCCESS.getCode())) {
			return true;
		}
		if (StringUtils.equals(result.getReturnCode(),
				BaseConstantCode.DATA_NOT_FOUND.getCode())) {
			return true;
		}
		return false;
	}
	
	/**
	 * 判断返回是否成功，如果 ResultBean<T>（result）为空，则返回false,如果ResultBean<T>（result）的
	 * returnCode和BaseConstantCode.SUCCESS.code相同，则返回true,否则返回false
	 * */
	public static <T> boolean isNotNull(ResultBean<T> result) {
		if (null == result) {
			return false;
		}
		return true;
	}

}
