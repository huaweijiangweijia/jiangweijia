package com.tl.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.tl.common.util.LoginInforUtil;

/**
 * 登录验证过滤器
 * @author lichicheng
 *
 */
public class LoginFilter implements Filter{

	@Override
	public void destroy() {
		
	}
	
	//不用登录便可访问的uri
	final static String[] FILTER_URI = new String[]{"loginAction.do","LogoutAction.do","indexAction.do","uploadManager/upload.do"};
	
	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) arg0;
		HttpServletResponse response = (HttpServletResponse) arg1;
		String uri = request.getRequestURI();
		int status = LoginInforUtil.loginUserStatus(request.getSession());
		
		if(!isMatcher(uri)){
			if(status == 2 || status == 1){
				request.setAttribute("errorUri", "indexAction.do");
				response.addHeader("custom_code", "302");//用于ajax请求，标识为需要重定向
				if(status == 2){
					request.setAttribute("errorMsg", "该用户在其它地方登录，强制退出。");
				}
				if(status == 1){
					request.setAttribute("errorMsg", "登录超时，请重新登录。");
				}
				request.getRequestDispatcher("/errorRedirect.jsp").forward(request, response);
				return;
			}
		}
		arg2.doFilter(arg0, arg1);
	}

	
	private boolean isMatcher(String reqUri){
		for(String u : FILTER_URI){
			if(reqUri.matches(".*?" + u + "$")){
				return true;
			}
		}
		return false;
	}


	@Override
	public void init(FilterConfig arg0) throws ServletException {
		
	}
}
