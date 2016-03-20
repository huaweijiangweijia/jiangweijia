package com.tl.resource.web.selfOrder;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.springframework.web.struts.ActionSupport;

import com.tl.resource.business.contractOrder.OrderExcel;

public class SelfOrderExcel extends ActionSupport{

//	private SelfOrderService selfOrderService;
//	private orderExcel orderExcelImp;
	private OrderExcel orderExcelServcie;
	
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)    
		throws Exception {    
		response.setContentType("text/html;charset=utf-8");
		String orderId = request.getParameter("orderId");
		orderExcelServcie.exportExcel(orderId, response,request);
//		Map<String, Object> parmMap = new HashMap<String, Object>();
//		parmMap.put("orderId", orderId);
//		List<OrderDetialsDto> orderDetail = selfOrderService.getExcelOrderDetail(parmMap);
//		OrderInfoDto order = selfOrderService.getExcelOrderInfor(orderId);
//		Map<String, Object> parm1 = new HashMap<String, Object>();
//		parm1.put("busId", order.getCompanyId());
//		parm1.put("busType", 3);
//		Map<String, Object> parm2 = new HashMap<String, Object>();
//		parm2.put("busId", order.getCompanyId());
//		parm2.put("busType", 4);
//		AccessoriesDto acc1 = null;
//		AccessoriesDto acc2 = null;
//		List<AccessoriesDto> list1 = selfOrderService.getAccessoriesByBussinesId(parm1);
//		List<AccessoriesDto> list2 = selfOrderService.getAccessoriesByBussinesId(parm2);
//		if(list1!=null&&list1.iterator().hasNext())
//		{
//			acc1 = list1.get(0);
//		}
//		if(list2!=null&&list2.iterator().hasNext())
//		{
//			acc2 = list2.get(0);
//		}
//		try{    
//			String fname = order.getOrderCode();//excel文件名    
//			OutputStream os = response.getOutputStream();//取得输出流    
//			response.reset();//清空输出流    
//			response.setHeader("content-disposition", "attachment; filename=" + fname + ".xls");//设定输出文件头    
//			response.setContentType("application/msexcel");//定义输出类型   
//			String realPath = request.getRealPath("/");
//			//System.out.println(acc1.getPath());
//			//System.out.println(acc2.getPath());
//			System.out.println(order.getOrderCode());
//			System.out.println(realPath);
//			orderExcelImp.orderExcel("加工品订单",acc1.getPath(),acc2.getPath(),order,orderDetail,os,realPath);
//		}catch(Exception e){    
//			System.out.println(e);    
//		}    
		return null;  
	}

	public OrderExcel getOrderExcelServcie() {
		return orderExcelServcie;
	}

	public void setOrderExcelServcie(OrderExcel orderExcelServcie) {
		this.orderExcelServcie = orderExcelServcie;
	}

//	public SelfOrderService getSelfOrderService() {
//		return selfOrderService;
//	}
//
//	public void setSelfOrderService(SelfOrderService selfOrderService) {
//		this.selfOrderService = selfOrderService;
//	}
//
//	public orderExcel getOrderExcelImp() {
//		return orderExcelImp;
//	}
//
//	public void setOrderExcelImp(orderExcel orderExcelImp) {
//		this.orderExcelImp = orderExcelImp;
//	}

	
	
}
