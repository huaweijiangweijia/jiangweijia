package com.tl.resource.web.contractOrder;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.resource.business.contractOrder.OrderExcel;
/**
 * 
 * @author ls
 *	导出订单列表的Excel报表
 */
public class OrderListExcelAction extends Action{

	private OrderExcel orderExcelServcie;
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String orderType = request.getParameter("orderType");
		String searchForm = request.getParameter("searchForm");
		JSONObject searchFormObj = JSONObject.fromObject(searchForm);
		JSONObject orderForm = searchFormObj.getJSONObject("data");
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("orderCode", orderForm.getString("orderCode"));
		parmMap.put("contractCode", orderForm.getString("contractCode"));
		parmMap.put("quotationCode", orderForm.getString("quotationCode"));
		parmMap.put("supplierName", orderForm.getString("supplierName"));
		parmMap.put("status", orderForm.getString("status").equals("全部")?null:orderForm.getString("status"));
		parmMap.put("customerName", orderForm.getString("customerName"));
		parmMap.put("orderType",orderForm.getString("orderType"));
		parmMap.put("ownContactPerson", orderForm.getString("ownContactPerson"));	
		parmMap.put("supplierOwnContactPerson", orderForm.getString("supplierOwnContactPerson"));	
		parmMap.put("userName", orderForm.getString("userName"));	
		parmMap.put("startTime", orderForm.getString("startTime"));	
		parmMap.put("endTime", orderForm.getString("endTime"));	
		
		orderExcelServcie.orderListExcel(parmMap, response,request);
		return null;  
	}
	public OrderExcel getOrderExcelServcie() {
		return orderExcelServcie;
	}
	public void setOrderExcelServcie(OrderExcel orderExcelServcie) {
		this.orderExcelServcie = orderExcelServcie;
	}
	
	
}
