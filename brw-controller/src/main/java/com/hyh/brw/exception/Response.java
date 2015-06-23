
package com.hyh.brw.exception;

 
public class Response implements java.io.Serializable {
	private static final long serialVersionUID = 2553809076321136643L;
	public static final String STATUS_WARN = "000";

	/**
	 * 返回结果正常
	 */
	public static final String STATUS_SUCCESS = "100";
	/**
	 * 返回结果异常：有异常出现的时候为该状态
	 */
	public static final String STATUS_ERROR= "999";
	
	/**
	 * 页面跳转
	 */
	public static final String STATUS_CONVERT= "101";
	
	private String transCode;
	// 响应主体
	private Object responseBody;
	//处理费时（不计算网络时间）
	private Long costTime;
	// 响应错误代码
	private String errorCode;
	// 响应异常信息
	private String errorMsg;
	// 状态
	private String status;
	// 次数
	private Integer times;
	// token
	private String token;

	public Response(){
		
	}
	
	public Response(String errorCode, String errorMsg, String status) {
		super();
		this.errorCode = errorCode;
		this.errorMsg = errorMsg;
		this.status = status;
	}

	public Object getResponseBody() {
		return responseBody;
	}

	public void setResponseBody(Object responseBody) {
		this.responseBody = responseBody;
	}


	public Long getCostTime() {
		return costTime;
	}

	public void setCostTime(Long costTime) {
		this.costTime = costTime;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	public String getTransCode() {
		return transCode;
	}
	public void setTransCode(String transCode) {
		this.transCode = transCode;
	}

	public Integer getTimes() {
		return times;
	}

	public void setTimes(Integer times) {
		this.times = times;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
