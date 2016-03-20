package com.tl.resource.web.contractOrder;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.resource.business.contractOrder.ContractOrderService;
/**
 * 
 * @author ls
 *	 删除合同订单
 */
public class DeleteContractOrderAction extends Action{
	
	private ContractOrderService contractOrderService;
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub
		String[] ids = request.getParameterValues("ids");
		contractOrderService.deleteOrder(ids);
		PrintWriter out = response.getWriter();
		out.println(true);
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
