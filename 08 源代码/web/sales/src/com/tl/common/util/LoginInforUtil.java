package com.tl.common.util;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.tl.resource.business.dto.LoginInforDto;

/**
 * 用户登录session管理
 * @author lichicheng
 *
 */
public class LoginInforUtil {
	
	public final static String USER_SESSION_FLAG = "loginInfor";
	
	public static Map<String,String> ALL_USERS = Collections.synchronizedMap(new HashMap<String,String>());
  
	public static void setLoginInfor(HttpServletRequest request,LoginInforDto loginInfor){
		ALL_USERS.put(loginInfor.getUser().getId(),request.getSession().getId());
		request.getSession().setAttribute(LoginInforUtil.USER_SESSION_FLAG, loginInfor);
		loginInfor.setSession(request.getSession());
	} 
	
	
	public static LoginInforDto getLoginInfor(HttpServletRequest request){
		return (LoginInforDto) request.getSession().getAttribute(LoginInforUtil.USER_SESSION_FLAG);
	}
	
	/**
	 * 删除session
	 * @param request
	 */
	public static void removeLoginInfo(HttpServletRequest request){
		String sessionId = request.getSession().getId();
		request.getSession().removeAttribute(LoginInforUtil.USER_SESSION_FLAG);
		removeLoginInfo(sessionId);
	}
	
	/**
	 * 删除用户
	 * @param sessionId
	 */
	public static void removeLoginInfo(String sessionId){
		for (String userId : ALL_USERS.keySet()) {
			if(ALL_USERS.get(userId).equals(sessionId)){
				ALL_USERS.remove(userId);
				break;
			}
		}
	}
	
	/**
	 * 判断当前登录用户在系统中的状态
	 * @param session
	 * @return 1:未登录 2：重复登录（不同浏览器、ip登录相同用户）3:已登录用户
	 */
	public static int loginUserStatus(HttpSession session){
		LoginInforDto u = (LoginInforDto)session.getAttribute(LoginInforUtil.USER_SESSION_FLAG);
		if(u==null){
			return 1;
		}
		String sid = ALL_USERS.get(u.getUser().getId());
		if( !sid.equals(session.getId()) ){
			return 2;
		}
		return 3;
	}

}