package com.tl.resource.web.reserveOrder;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import com.tl.resource.business.reserveOrder.ReserveOrderService;

public class DeleteOrderAction extends Action{

	private ReserveOrderService reserveOrderServiceImpl;
	
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String[] ids = request.getParameterValues("ids");
		reserveOrderServiceImpl.deleteOrder(ids);
		PrintWriter out = response.getWriter();
		out.println(true);
		out.flush();
		out.close();
		return null;
	}

	public ReserveOrderService getReserveOrderServiceImpl() {
		return reserveOrderServiceImpl;
	}

	public void setReserveOrderServiceImpl(
			ReserveOrderService reserveOrderServiceImpl) {
		this.reserveOrderServiceImpl = reserveOrderServiceImpl;
	}
	
	
}
