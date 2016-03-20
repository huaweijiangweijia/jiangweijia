package com.tl.resource.web.reserveOrder;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.resource.business.reserveOrder.ReserveOrderService;
import com.tl.resource.dao.pojo.TOrderInfor;

public class DeleataOrderDetail extends Action{

	private ReserveOrderService reserveOrderServiceImpl;
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub
		String order = request.getParameter("orderInfor");
		JSONObject orderObj = JSONObject.fromObject(order);
		JSONObject orderForm = orderObj.getJSONObject("data");
		TOrderInfor orderInfor = (TOrderInfor) JSONObject.toBean(orderForm,TOrderInfor.class);	
		
		String[] ids = request.getParameterValues("ids");
		reserveOrderServiceImpl.deleteOrderDetailById(ids,orderInfor);
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
