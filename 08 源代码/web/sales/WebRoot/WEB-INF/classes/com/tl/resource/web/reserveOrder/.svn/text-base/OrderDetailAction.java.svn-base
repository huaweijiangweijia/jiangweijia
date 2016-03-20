package com.tl.resource.web.reserveOrder;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.reserveOrder.ReserveOrderService;

public class OrderDetailAction extends Action{

	private ReserveOrderService reserveOrderServiceImpl;
	/**
	 * 无分页
	 */
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub

		response.setContentType("text/html;charset=utf-8");
		String orderId = request.getParameter("orderId");
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("orderId", orderId);
		List<OrderDetialsDto> orderDetail = reserveOrderServiceImpl.getOrderDetailsLists(parmMap);
		try {
			PrintWriter out = response.getWriter();
			out.write("{root:"+JSONArray.fromObject(orderDetail).toString()+"}");
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
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
