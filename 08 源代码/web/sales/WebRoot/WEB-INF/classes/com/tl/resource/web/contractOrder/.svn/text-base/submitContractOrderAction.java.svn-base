package com.tl.resource.web.contractOrder;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.common.util.LoginInforUtil;
import com.tl.resource.audit.IAuditService;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.business.reserveOrder.ReserveOrderService;
/**
 * 
 * @author ls
 *	提交审批
 */
public class submitContractOrderAction extends Action{
	
	private IAuditService auditService;

	public IAuditService getAuditService() {
		return auditService;
	}

	public void setAuditService(IAuditService auditService) {
		this.auditService = auditService;
	}

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		UserDto userDto = null;
		if(LoginInforUtil.getLoginInfor(request) != null) {
			userDto = LoginInforUtil.getLoginInfor(request).getUser();
		}
		
		String[] ids = request.getParameterValues("ids");
		String resultStr = null;
		if(ids!=null&&ids.length>0)
		{
			for(int i=0;i<ids.length;i++)
			{
				resultStr = auditService.submitBusiness("005", ids[i], userDto);
			}
		}
		PrintWriter out = response.getWriter();
		out.write(resultStr == null ? "" : resultStr);
		out.flush();
		out.close();
		return null;
	}
	
	
}
