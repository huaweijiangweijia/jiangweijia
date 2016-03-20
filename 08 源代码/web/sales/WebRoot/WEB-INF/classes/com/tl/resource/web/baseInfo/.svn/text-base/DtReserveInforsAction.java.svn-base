package com.tl.resource.web.baseInfo;

import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.resource.business.baseInfo.ReserveInforService;

public class DtReserveInforsAction extends Action {
	private ReserveInforService reserveInforService;
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String productCode = request.getParameter("productCode");
		List<Map<String, Object>> list = reserveInforService.findDtReserveInforByProductCode(productCode );
		String rt = JSONArray.fromObject(list).toString();
		out.println(new StringBuffer(200).append("{root:").append(rt).append("}").toString());
		out.flush();
		out.close();
		return null;
	}
	public ReserveInforService getReserveInforService() {
		return reserveInforService;
	}
	public void setReserveInforService(ReserveInforService reserveInforService) {
		this.reserveInforService = reserveInforService;
	}
	
}
