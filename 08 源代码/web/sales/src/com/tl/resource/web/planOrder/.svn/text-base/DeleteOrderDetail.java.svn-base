package com.tl.resource.web.planOrder;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.resource.business.planOrder.PlanOrderService;
import com.tl.resource.business.reserveOrder.ReserveOrderService;

public class DeleteOrderDetail extends Action{

	private PlanOrderService planOrderService;
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub
		String[] ids = request.getParameterValues("ids");
		planOrderService.deleteOrderDetailById(ids);
		PrintWriter out = response.getWriter();
		out.println(true);
		out.flush();
		out.close();
		return null;
	}
	public PlanOrderService getPlanOrderService() {
		return planOrderService;
	}
	public void setPlanOrderService(PlanOrderService planOrderService) {
		this.planOrderService = planOrderService;
	}
	
	
	
}
