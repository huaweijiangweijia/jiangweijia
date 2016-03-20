package com.tl.resource.web.selfOrder;

import java.io.PrintWriter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;

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
import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.business.manage.BillsCodeDefService;
import com.tl.resource.business.selfOrder.SelfOrderService;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TSuppliersInfor;

public class AddSelfOrderAction extends Action{

	private SelfOrderService selfOrderService;
	private BillsCodeDefService billsCodeDefService ;
	
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
		String resultStr = null;//返回值
		String order = request.getParameter("order");
		JSONObject orderObj = JSONObject.fromObject(order);
		JSONObject orderForm = orderObj.getJSONObject("data");
		String orderDetail = request.getParameter("orderDetail");
		String orderType = request.getParameter("orderType");
		try {
			TOrderInfor orderInfor = (TOrderInfor) JSONObject.toBean(orderForm,TOrderInfor.class);
			TSuppliersInfor supplier = selfOrderService.getSupplierById(orderInfor.getSupplierId());
			orderInfor.setId(GenerateSerial.getUUID());
			orderInfor.setOrderCode(billsCodeDefService.getBillCode("04", supplier.getSupplierCode(), null,null));  
			orderInfor.setCurrencyName(orderInfor.getCurrencyId());
			orderInfor.setSupplierName(orderInfor.getSupplierId());
			orderInfor.setEditDate(new Date());
			orderInfor.setStatus(0);
			orderInfor.setOrderType(Integer.parseInt(orderType));
			orderInfor.setUserId(userDto.getId());
			orderInfor.setUserName(userDto.getUserName());

			JSONObject orderDetailObj = JSONObject.fromObject(orderDetail);
			JSONArray array = orderDetailObj.getJSONArray("children");
			selfOrderService.addOrder(orderInfor, array);
			resultStr = "{success : true, msg : '创建订单成功',orderInforId:'"+orderInfor.getId()+"',orderCode:'"+orderInfor.getOrderCode()+"'}";//订单添加成功时将订单的ID返回到页面
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
	

	public SelfOrderService getSelfOrderService() {
		return selfOrderService;
	}

	public void setSelfOrderService(SelfOrderService selfOrderService) {
		this.selfOrderService = selfOrderService;
	}


	public BillsCodeDefService getBillsCodeDefService() {
		return billsCodeDefService;
	}


	public void setBillsCodeDefService(BillsCodeDefService billsCodeDefService) {
		this.billsCodeDefService = billsCodeDefService;
	}

	
	
}
