package com.tl.resource.web.contractOrder;

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
/**
 * 
 * @author ls
 *	修改合同订单页面订单详细
 */
public class OrderDetailAction extends Action{

	private ContractOrderService contractOrderService;
	
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub

		response.setContentType("text/html;charset=utf-8");
		String orderId = request.getParameter("orderId");
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("orderId", orderId);
		List<OrderDetialsDto> orderDetail = contractOrderService.getOrderDetailsList(parmMap);
		String pageInfoJson = JSONArray.fromObject(orderDetail).toString();
		PrintWriter out = response.getWriter();
		out.write("{root:"+pageInfoJson+"}");
		out.flush();
		out.close();
		return null;
	}

	public ContractOrderService getContractOrderService() {
		return contractOrderService;
	}

	public void setContractOrderService(ContractOrderService contractOrderService) {
		this.contractOrderService = contractOrderService;
	}
	

}
