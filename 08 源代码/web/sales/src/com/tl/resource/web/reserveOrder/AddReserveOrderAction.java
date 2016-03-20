package com.tl.resource.web.reserveOrder;

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

import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.business.manage.BillsCodeDefService;
import com.tl.resource.business.reserveOrder.ReserveOrderService;

import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TSuppliersInfor;

public class AddReserveOrderAction extends Action{
	
	private ReserveOrderService reserveOrderServiceImpl;
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
		String resultStr = null;
		String order = request.getParameter("order");
		JSONObject orderObj = JSONObject.fromObject(order);
		JSONObject orderForm = orderObj.getJSONObject("data");
		String orderDetail = request.getParameter("orderDetail");			
		try {
			//System.out.println(orderForm);
			TOrderInfor orderInfor = (TOrderInfor) JSONObject.toBean(orderForm,TOrderInfor.class);
			TSuppliersInfor supplier = reserveOrderServiceImpl.getSupplierById(orderInfor.getSupplierId());
			orderInfor.setId(GenerateSerial.getUUID());
			orderInfor.setOrderType(2);
			orderInfor.setOrderCode(billsCodeDefService.getBillCode(buildCodeType(orderInfor.getOrderType()), supplier.getSupplierCode(), null,null));  
			orderInfor.setCurrencyName(orderInfor.getCurrencyId());
			orderInfor.setSupplierName(orderInfor.getSupplierId());
			orderInfor.setEditDate(new Date());
			orderInfor.setStatus(0);
			orderInfor.setUserId(userDto.getId());
			orderInfor.setUserName(userDto.getUserName());		
			JSONArray array = JSONArray.fromObject(orderDetail);
			reserveOrderServiceImpl.addOrder(orderInfor, array);
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

	private String buildCodeType(Integer orderType) {
		//(1采购,2储备,3加工,4,材料储备,5预定订单,6试刀订单,7预定加工,8试刀加工)
		String codeType = "";
		switch (orderType) {
			case 1 ://采购
				codeType = "04";
				break;
			case 2 ://储备
				codeType = "11";
				break;
			case 5 :
				codeType = "12";
				break;
			case 6 :
				codeType = "13";
				break;
		
		}
		return codeType;
	}

	public ReserveOrderService getReserveOrderServiceImpl() {
		return reserveOrderServiceImpl;
	}
	
	public void setReserveOrderServiceImpl(
			ReserveOrderService reserveOrderServiceImpl) {
		this.reserveOrderServiceImpl = reserveOrderServiceImpl;
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
