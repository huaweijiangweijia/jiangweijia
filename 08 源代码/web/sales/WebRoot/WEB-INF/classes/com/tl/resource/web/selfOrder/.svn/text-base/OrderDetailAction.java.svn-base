package com.tl.resource.web.selfOrder;

import java.io.PrintWriter;
import java.util.ArrayList;
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
import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.reserveOrder.ReserveOrderService;
import com.tl.resource.business.selfOrder.SelfOrderService;

public class OrderDetailAction extends Action{

	private SelfOrderService selfOrderService;
	
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub

		response.setContentType("text/html;charset=utf-8");
		String orderId = request.getParameter("orderId");
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("orderId", orderId);
		List<OrderDetialsDto> orderDetail = selfOrderService.getOrderDetailsList(parmMap);
		String pageInfoJson = JSONArray.fromObject(orderDetail).toString();
		PrintWriter out = response.getWriter();
		out.write(pageInfoJson);
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
