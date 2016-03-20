package com.tl.common;

import java.util.HashMap;
import java.util.Map;

public class ResponseMsg {
	
	
	public ResponseMsg(){}
	
	
	
	boolean success;
	
	Map<String,String> errors;
	
	String msg;
	
	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public Map<String, String> getErrors() {
		return errors;
	}
	
	public void addError(String key,String value){
		if(errors == null){
			errors = new HashMap<String, String>();
		}
		errors.put(key, value);
	}

	public void setErrors(Map<String, String> errors) {
		this.errors = errors;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}


}
