package com.tl.resource.web.contractOrder;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.reserveOrder.ReserveOrderService;
import com.tl.resource.dao.pojo.TOrderInfor;
/**
 * 
 * @author ls
 *	提交下单
 */
public class PlaceOrderAction extends Action{
	
	private ContractOrderService contractOrderService;

	/**
	 * 提交下单
	 */
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String[] ids = request.getParameterValues("ids");
		if(ids!=null&&ids.length>0)
		{
			for(int i=0;i<ids.length;i++)
			{
				TOrderInfor order = new TOrderInfor();
				order.setId(ids[i]);
				order.setStatus(4);
				contractOrderService.PlaceOrder(order);
			}
		}
		PrintWriter out = response.getWriter();
		out.write("{success : true, msg : '提交下单成功'}");
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
