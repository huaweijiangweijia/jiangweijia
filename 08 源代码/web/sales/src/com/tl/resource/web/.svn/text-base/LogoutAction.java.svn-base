package com.tl.resource.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.common.util.LoginInforUtil;
import com.tl.resource.business.dto.LoginInforDto;

public class LogoutAction extends DispatchAction{
	
	public ActionForward logout(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		request.getSession().removeAttribute(LoginInforUtil.USER_SESSION_FLAG);
		return new ActionForward("/", true);
	}
	
}
