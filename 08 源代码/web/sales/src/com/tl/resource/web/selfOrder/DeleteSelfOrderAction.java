package com.tl.resource.web.selfOrder;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.selfOrder.SelfOrderService;

public class DeleteSelfOrderAction extends Action{
	
	private SelfOrderService selfOrderService;
	
	/**
	 * 删除合同订单
	 */
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub
		String[] ids = request.getParameterValues("ids");
		selfOrderService.deleteOrder(ids);
		PrintWriter out = response.getWriter();
		out.println(true);
		out.flush();
		out.close();
		return null;
	}

	public SelfOrderService getSelfOrderService() {
		return selfOrderService;
	}

	public void setSelfOrderService(SelfOrderService selfOrderService) {
		this.selfOrderService = selfOrderService;
	}

		
}
