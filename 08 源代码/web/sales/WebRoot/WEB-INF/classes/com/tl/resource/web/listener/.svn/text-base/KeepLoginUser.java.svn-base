package com.tl.resource.web.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.tl.common.util.LoginInforUtil;

public class KeepLoginUser implements HttpSessionListener{

	@Override
	public void sessionCreated(HttpSessionEvent arg0) {
		
	}

	/**
	 * 删除用户登录记录
	 */
	@Override
	public void sessionDestroyed(HttpSessionEvent arg0) {
		LoginInforUtil.removeLoginInfo(arg0.getSession().getId());
	}

}
