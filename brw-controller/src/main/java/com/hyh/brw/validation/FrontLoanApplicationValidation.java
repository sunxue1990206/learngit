/**
 * 
 */
package com.hyh.brw.validation;

import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.hyh.brw.dao.entity.LoanApplication;
import com.hyh.brw.exception.ValidationControllerException;
import com.hyh.dao.entity.Dictionary;

/**
 * 理财管理
 * @author zhangbo
 *
 */
public class FrontLoanApplicationValidation{
	
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
	
	public static void valContact(String contact) throws ValidationControllerException{
		if(contact == null) 
			throw new ValidationControllerException(Message.CONTACT_BLANK_NOTICE);
		if(contact.length() > 50) 
			throw new ValidationControllerException(Message.CONTACT_LEN_NOTICE);
		 String regEx = "[\\u4e00-\\u9fa5]"; 
		 Pattern p = Pattern.compile(regEx);
		 Matcher m = p.matcher(contact);
		 int count = 0;
		 while (m.find()) {      
	            for (int i = 0; i <= m.groupCount(); i++) {      
	                 count = count + 1;      
	             }      
         }  
		 if(count != contact.length())  
			 throw new ValidationControllerException(Message.CONTACT_CHINESE_NOTICE);
	}
	
	public static void valSex(String sex) throws ValidationControllerException{
		if(sex == null) 
			throw new ValidationControllerException(Message.SEX_BLANK_NOTICE);
		if(sex.length() > 5) 
			throw new ValidationControllerException(Message.SEX_LEN_NOTICE);
	}
	
	public static void valCity(String city) throws ValidationControllerException{
		if(city == null) 
			throw new ValidationControllerException(Message.CITY_BLANK_NOTICE);
		if(city.length() > 50) 
			throw new ValidationControllerException(Message.CITY_LEN_NOTICE);
	}
	
	public static void valLoanPeriod(Integer loanPeriod) throws ValidationControllerException{
		if(loanPeriod == null) 
			throw new ValidationControllerException(Message.LOANPERIOD_BLANK_NOTICE);
		if(loanPeriod > 60 || loanPeriod < 1) 
			throw new ValidationControllerException(Message.LOANPERIOD_LEN_NOTICE);
	}
	
	public static void valPhone(String phone) throws ValidationControllerException{
		if(phone == null)	
			throw new ValidationControllerException(Message.PHONE_BLANK_NOTICE);
		if(phone.length() != 11)	
			throw new ValidationControllerException(Message.PHONE_LEN_NOTICE);
		Pattern p = Pattern.compile("^[1][3,4,5,8][0-9]{9}$"); 
		Matcher m = p.matcher(phone);
		if(!m.matches()) 
			throw new ValidationControllerException(Message.PHONE_NORMAL_NOTICE);
	}
	
	public static void valLoanAmount(BigDecimal loanAmount) throws ValidationControllerException{
		if(loanAmount == null) 
			throw new ValidationControllerException(Message.LOANAMOUNT_BLANK_NOTICE);
		if(loanAmount.doubleValue() < 1 || loanAmount.doubleValue() > 10000) 
			throw new ValidationControllerException(Message.LOANAMOUNT_LEN_NOTICE);
	}
	
	public static void valVerification(String verification) throws ValidationControllerException{
		if(verification == null) 
			throw new ValidationControllerException(Message.VER_BLANK_NOTICE);
		if(verification.length() != 6) 
			throw new ValidationControllerException(Message.VER_ERROR_NOTICE);
	}
	
	public static void valApplicationType(Dictionary dic) throws ValidationControllerException{
		if(dic == null) 
			throw new ValidationControllerException(Message.APPLICATIONTYPE_NOTICE);
	}
	
	public static void valUserIdAndName(Long userId,String name) throws ValidationControllerException{
			valUserId(userId);
			valUserName(name);
	}
	
	public static void valLoanApplication(LoanApplication loanApplication) throws ValidationControllerException{
		if(loanApplication == null)	
			throw new ValidationControllerException(Message.OBJ_BLANK);
		valCity(loanApplication.getCity());
		valApplicationType(loanApplication.getApplicationType());
		valLoanAmount(loanApplication.getLoanAmount());
		valLoanPeriod(loanApplication.getLoanPeriod());
		valSex(loanApplication.getSex());
		valContact(loanApplication.getContact());
		valPhone(loanApplication.getMobilePhone());
		valVerification(loanApplication.getIdCip());
	}
	
	public static void valBorrowUserIdAndName(Long userId,String name) throws ValidationControllerException{
		valBorrowUserId(userId);
		valBorrowUserName(name);
	}

	private static void valBorrowUserName(String name) throws ValidationControllerException {
		if(name == null || name.length() > 50)	
			throw new ValidationControllerException(Message.USERNAME_ILLEGAL);
	}

	private static void valBorrowUserId(Long userId) throws ValidationControllerException {
		if(userId == null || String.valueOf(userId).length() > 20) 
			throw new ValidationControllerException(Message.USERID_ILLEGAL);
	}

}
