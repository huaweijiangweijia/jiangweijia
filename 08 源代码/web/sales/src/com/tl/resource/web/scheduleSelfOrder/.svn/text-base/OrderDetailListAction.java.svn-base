package com.tl.resource.web.scheduleSelfOrder;

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
import com.tl.resource.business.scheduleOrder.ScheduleOrderService;
import com.tl.resource.business.scheduleSelfOrder.ScheduleSelfOrderService;

public class OrderDetailListAction extends Action{
	
	private ScheduleSelfOrderService scheduleSelfOrderService;

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=utf-8");
		String size = request.getParameter("limit") == null?"15":request.getParameter("limit");
		String start = request.getParameter("start") == null?"0":request.getParameter("start");
		int pageSize = Integer.parseInt(size);
		int startIndex = Integer.parseInt(start);
		String orderId = request.getParameter("orderId");
		String outStockType = request.getParameter("outStockType");
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("orderId", orderId);
		parmMap.put("outStockType", outStockType);
		parmMap.put("startIndex", startIndex);
		parmMap.put("pageSize", pageSize);
		int total = scheduleSelfOrderService.getSSOrderDetailsListCount(parmMap);
		List<OrderDetialsDto> orderDetail = scheduleSelfOrderService.getSSOrderDetailsList(parmMap);
		PaginationSupport pageInfo  = new PaginationSupport(orderDetail,total,pageSize,startIndex);
		String pageInfoJson = JSONObject.fromObject(pageInfo).toString();
		PrintWriter out = response.getWriter();
		out.write(pageInfoJson);
		out.flush();
		out.close();
		return null;
	}

	public ScheduleSelfOrderService getScheduleSelfOrderService() {
		return scheduleSelfOrderService;
	}

	public void setScheduleSelfOrderService(
			ScheduleSelfOrderService scheduleSelfOrderService) {
		this.scheduleSelfOrderService = scheduleSelfOrderService;
	}

	
	
}
