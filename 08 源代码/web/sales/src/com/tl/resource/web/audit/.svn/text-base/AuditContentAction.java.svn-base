package com.tl.resource.web.audit;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.resource.audit.IAuditContentService;
import com.tl.resource.audit.dto.TAuditContentDefDto;

public class AuditContentAction extends DispatchAction{
	private IAuditContentService auditContentService;
	public ActionForward findAuditDetailAuditContentList(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String auditDetailId = request.getParameter("auditDetailId");
		List<TAuditContentDefDto> list = auditContentService.findAuditDetailAuditContentList(auditDetailId);
		out.println(JSONArray.fromObject(list).toString());
		out.flush();
		out.close();
		return null;
	}
	public ActionForward findAllContentList(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		List<TAuditContentDefDto> list = auditContentService.findAllAuditContentList();
		out.println(JSONArray.fromObject(list).toString());
		out.flush();
		out.close();
		return null;
	}
	public ActionForward saveAuditDetailAuditContent(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String auditDetailId = request.getParameter("auditDetailId");
		String[] idsArr = request.getParameterValues("ids");
		
		List<String> ids = new ArrayList<String>();
		if(idsArr != null){
			for (int i = 0; i < idsArr.length; i++) {
			    ids.add(idsArr[i]);	
			}
		}
		auditContentService.saveAuditDetailAuditContent(auditDetailId, ids);
		out.print(true);
		out.flush();
		out.close();
		return null;
	}
	public IAuditContentService getAuditContentService() {
		return auditContentService;
	}
	public void setAuditContentService(IAuditContentService auditContentService) {
		this.auditContentService = auditContentService;
	}
	
}
