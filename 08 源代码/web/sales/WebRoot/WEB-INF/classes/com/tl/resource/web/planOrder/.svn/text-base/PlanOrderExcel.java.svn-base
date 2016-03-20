package com.tl.resource.web.planOrder;

import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.springframework.web.struts.ActionSupport;
import com.tl.common.OrderExcel.orderExcel;
import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.dto.AccessoriesDto;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.OrderInfoDto;
import com.tl.resource.business.planOrder.PlanOrderService;
import com.tl.resource.business.reserveOrder.ReserveOrderService;

public class PlanOrderExcel extends ActionSupport{

	private PlanOrderService planOrderService;
	private orderExcel orderExcelImp;
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)    
		throws Exception {    
		response.setContentType("text/html;charset=utf-8");
		String orderId = request.getParameter("orderId");
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("orderId", orderId);
		List<OrderDetialsDto> orderDetail = planOrderService.getOrderDetailsList(parmMap);
		OrderInfoDto order = planOrderService.getExcelOrderInfor(orderId);
		Map<String, Object> parm1 = new HashMap<String, Object>();
		parm1.put("busId", order.getCompanyId());
		parm1.put("busType", 3);
		Map<String, Object> parm2 = new HashMap<String, Object>();
		parm2.put("busId", order.getCompanyId());
		parm2.put("busType", 4);
		AccessoriesDto acc1 = null;
		AccessoriesDto acc2 = null;
		List<AccessoriesDto> list1 = planOrderService.getAccessoriesByBussinesId(parm1);
		List<AccessoriesDto> list2 = planOrderService.getAccessoriesByBussinesId(parm2);
		if(list1!=null&&list1.iterator().hasNext())
		{
			acc1 = list1.get(0);
		}
		if(list2!=null&&list2.iterator().hasNext())
		{
			acc2 = list2.get(0);
		}
		
		try{    
			String fname = order.getOrderCode();//excel文件名    
			OutputStream os = response.getOutputStream();//取得输出流    
			response.reset();//清空输出流    
			response.setHeader("content-disposition", "attachment; filename=" + fname + ".xls");//设定输出文件头    
			response.setContentType("application/msexcel");//定义输出类型    
			
			orderExcelImp.orderExcel("储备计划订单",acc1.getPath(),acc2.getPath(),order,orderDetail,os,request.getRealPath("/"));
		}catch(Exception e){    
			//System.out.println(e);    
		}    
	return null;  
	}

	public PlanOrderService getPlanOrderService() {
		return planOrderService;
	}

	public void setPlanOrderService(PlanOrderService planOrderService) {
		this.planOrderService = planOrderService;
	}

	public orderExcel getOrderExcelImp() {
		return orderExcelImp;
	}

	public void setOrderExcelImp(orderExcel orderExcelImp) {
		this.orderExcelImp = orderExcelImp;
	}

	
	
}
