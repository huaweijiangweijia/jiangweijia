package com.tl.resource.web.contractOrder;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.springframework.web.struts.ActionSupport;
import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.dto.OrderInfoDto;

/**
 * 
 * @author ls
 *	根据订单ID查找合同订单，修改合同界面
 */
public class ContractOrderAction extends ActionSupport{

	private ContractOrderService contractOrderService;
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)    
		throws Exception {    
		response.setContentType("text/html;charset=utf-8");
		String orderId = request.getParameter("orderId");
		OrderInfoDto orderInfor = contractOrderService.getExcelOrderInfor(orderId);
		PrintWriter out = response.getWriter();
		out.println("{aa:"+JSONArray.fromObject(orderInfor).toString()+"}");
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
