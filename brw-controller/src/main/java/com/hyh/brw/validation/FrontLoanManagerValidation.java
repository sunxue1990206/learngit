/**
 * 
 */
package com.hyh.brw.validation;

import com.hyh.brw.exception.ValidationControllerException;
import com.hyh.dao.entity.Dictionary;

/**
 * 理财管理
 * @author zhangbo
 *
 */
public class FrontLoanManagerValidation{
	
	public static void main(String[] args) {
		try {
//			FrontLoanApplicationValidation.valContact("中");
//			System.out.println("中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中".length());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void valUserId(Long userId) throws ValidationControllerException{
		if(userId == null || String.valueOf(userId).length() > 20) 
			throw new ValidationControllerException(Message.USERID_ILLEGAL);
	}
	
	public static void valUserName(String name) throws ValidationControllerException{
		if(name == null || name.length() > 50)	
			throw new ValidationControllerException(Message.USERNAME_ILLEGAL);
	}
	
	public static void valUserIdAndName(Long userId,String name) throws ValidationControllerException{
		valUserId(userId);
		valUserName(name);
	}
	
	/******验证用户ID和状态********/
	public static void valUserIdAndStatus(Long userId,Dictionary type,String code) throws ValidationControllerException{
		if(userId == null || String.valueOf(userId).length() > 20)	
			throw new ValidationControllerException(Message.USERID_ILLEGAL);
		if(type == null)	
			throw new ValidationControllerException(Message.STATUS_ILLEGAL);
		if(code != null && !code.equals(type.getCode()))
			throw new ValidationControllerException(Message.STATUS_ILLEGAL);
	}

}
