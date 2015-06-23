package com.hyh.brw.exception;

import com.hyh.brw.validation.Message;
import com.hyh.core.dto.Prompt;

public class ValidationControllerException extends Exception{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1656368392102284806L;
	private String message;
	private String code;
	private String displayCode;
	
	public ValidationControllerException(Prompt prompt){
		if(prompt == null) {
			this.message = Message.MESS_BLANK.getMsg();
			this.code = Message.SYSTEM.getCode()+"-"+Message.MESS_BLANK.getCode();
			this.displayCode = Message.MESS_BLANK.getCode();
		}else{
			this.message = prompt.getMsg();
			this.code = Message.SYSTEM.getCode()+"-"+prompt.getCode();
			this.displayCode = prompt.getCode();
		}
	}
	
	@Override
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDisplayCode() {
		return displayCode;
	}
	public void setDisplayCode(String displayCode) {
		this.displayCode = displayCode;
	}
	
}
