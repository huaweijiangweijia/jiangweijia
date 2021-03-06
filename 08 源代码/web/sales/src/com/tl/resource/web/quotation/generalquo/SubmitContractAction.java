package com.tl.resource.web.quotation.generalquo;

import java.io.PrintWriter;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.common.util.LoginInforUtil;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.business.quotation.generalquo.GeneralQuoService;
import com.tl.resource.dao.pojo.TQuotationInfor;

public class SubmitContractAction extends Action {
	private GeneralQuoService generalQuoService;
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		UserDto userDto = null;
		if(LoginInforUtil.getLoginInfor(request) != null) {
			userDto = LoginInforUtil.getLoginInfor(request).getUser();
		}
		
		String quoId = request.getParameter("quoId");
		
		JSONArray jsonArray = JSONArray.fromObject(quoId);
		Iterator<JSONObject> iterator = jsonArray.iterator();
		
		String resultStr = "";
		while(iterator.hasNext()) {
			JSONObject obj = iterator.next();
			String id = obj.getString("id");
			
			TQuotationInfor quoInfo = new TQuotationInfor();
			quoInfo.setId(id);
			quoInfo.setStatus(4);
			generalQuoService.updateQuoStatus(quoInfo);
		}
		
		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();
		return null;
	}
	public GeneralQuoService getGeneralQuoService() {
		return generalQuoService;
	}
	public void setGeneralQuoService(GeneralQuoService generalQuoService) {
		this.generalQuoService = generalQuoService;
	}
	
}
