package com.tl.resource.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.common.util.CheckUser;
import com.tl.common.util.LoginInforUtil;
import com.tl.resource.business.dto.LoginInforDto;

public class IndexAction extends Action{
	
	@Override
	public ActionForward execute(ActionMapping mapping,ActionForm form,HttpServletRequest request,
			HttpServletResponse response) throws IOException{
		int i = LoginInforUtil.loginUserStatus(request.getSession());
		if(i==1 || i==2){
			return new ActionForward("/login.jsp");
		}else{
			request.setAttribute("LoginInfor", JSONObject.fromObject(LoginInforUtil.getLoginInfor(request)));
			/*Boolean isReged = CheckUser.isBindServer();
			request.setAttribute("isReged", isReged);
			if(!isReged){
				request.setAttribute("cpuSign", CheckUser.getCpuSerial());
			}*/
			if("admin".equals(LoginInforUtil.getLoginInfor(request).getUser().getUserName())){
				return mapping.findForward("manageSuccess");
			}else{
				return mapping.findForward("serviceSuccess");
			}
		}
	}

}
