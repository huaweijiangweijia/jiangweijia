package com.tl.common.filter;

import java.io.IOException;
import java.util.Enumeration;
import java.util.Map;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

/**
 * 重置请求参数
 * @author lichicheng
 *
 */
public class ParameterResetFilter implements Filter{

	public void destroy() {
		
	}
	
	//是否清空参数首尾空格
	boolean trim = true;

	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		HttpServletRequest reqWrapper = (HttpServletRequest) arg0;
		if(trim){
			reqWrapper = new HttpServletRequestWrapper(reqWrapper){
	
				@Override
				public String getParameter(String name) {
					return super.getParameter(name) == null ? null : super.getParameter(name).trim();
				}
	
				@Override
				public Map<String, String[]> getParameterMap() {
					Map<String, String[]> map = super.getParameterMap();
					int i=0;
					for(String k : map.keySet()){
						for(String v : map.get(k)){
							map.get(k)[i] = v.trim();
							i++;
						}
						i=0;
					}
					return map;
				}
	
				@Override
				public String[] getParameterValues(String name) {
					String[] rst = super.getParameterValues(name);
					if(rst != null){
						for(int i=0;i<rst.length;i++){
							rst[i] = rst[i].trim();
						}
					}
					return rst;
				}
				
			};
		}
		arg2.doFilter(reqWrapper, arg1);
		
	}
	
	

	public void init(FilterConfig arg0) throws ServletException {
		if(arg0.getInitParameter("trim") != null){
			trim = Boolean.valueOf(arg0.getInitParameter("trim"));
		}
	}

}
