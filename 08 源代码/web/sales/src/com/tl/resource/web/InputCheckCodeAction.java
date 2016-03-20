package com.tl.resource.web;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.common.util.CheckUser;
import com.tl.common.util.rsa.CheckSNCode;
import com.tl.common.util.rsa.SnPropertiesUtil;

public class InputCheckCodeAction extends DispatchAction {
	public ActionForward input(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		String code = request.getParameter("code");
		boolean rt = CheckUser.bindServer(code);
		PrintWriter out = response.getWriter();
		out.print(rt);
		out.flush();
		out.close();
		return null;
	}
}
