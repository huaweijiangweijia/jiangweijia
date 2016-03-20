package com.tl.resource.web.planOrder;

import java.io.PrintWriter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.common.util.GenerateSerial;
import com.tl.common.util.LoginInforUtil;
import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.business.manage.BillsCodeDefService;
import com.tl.resource.business.planOrder.PlanOrderService;
import com.tl.resource.business.reserveOrder.ReserveOrderService;
import com.tl.resource.dao.pojo.TOrderDetail;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TProductToolsInfor;
import com.tl.resource.dao.pojo.TQuotationInfor;
import com.tl.resource.dao.pojo.TQuotationProductDetail;
import com.tl.resource.dao.pojo.TSuppliersInfor;

public class AddPlanOrderAction extends Action{
	
	private PlanOrderService planOrderService;
	private BillsCodeDefService billsCodeDefService ;
	private String parId = null;
	


	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		UserDto userDto = null;
		if(LoginInforUtil.getLoginInfor(request) != null) {
			userDto = LoginInforUtil.getLoginInfor(request).getUser();
		}
		
		response.setContentType("text/html;charset=utf-8");
		String resultStr = "{success : true, msg : '创建订单成功'}";
		String[] pId = request.getParameterValues("pId");
		String order = request.getParameter("order");
		JSONObject orderObj = JSONObject.fromObject(order);
		JSONObject orderForm = orderObj.getJSONObject("data");
		
		String orderDetail = request.getParameter("orderDetail");		
		
		try {
			TOrderInfor orderInfor = (TOrderInfor) JSONObject.toBean(orderForm,TOrderInfor.class);
			TSuppliersInfor supplier = planOrderService.getSupplierById(orderInfor.getSupplierId());
			orderInfor.setId(GenerateSerial.getUUID());
			orderInfor.setOrderCode(billsCodeDefService.getBillCode("04", supplier.getSupplierCode(), null,null));  
			orderInfor.setCurrencyName(orderInfor.getCurrencyId());
			orderInfor.setSupplierName(orderInfor.getSupplierId());
			orderInfor.setEditDate(new Date());
			orderInfor.setStatus(0);
			orderInfor.setOrderType(4);
			orderInfor.setUserId(userDto.getId());
			orderInfor.setUserName(userDto.getUserName());

			JSONArray orderDetailObj = JSONArray.fromObject(orderDetail);
			planOrderService.addOrder(orderInfor, orderDetailObj);
		} catch(Exception e) {
			e.printStackTrace();
			resultStr = "{success : false, msg : '创建订单信息失败'}";
		}
		
		PrintWriter out = response.getWriter();
		out.write(resultStr);
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

	public String getParId() {
		return parId;
	}

	public void setParId(String parId) {
		this.parId = parId;
	}

	public BillsCodeDefService getBillsCodeDefService() {
		return billsCodeDefService;
	}

	public void setBillsCodeDefService(BillsCodeDefService billsCodeDefService) {
		this.billsCodeDefService = billsCodeDefService;
	}

	
}
