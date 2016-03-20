package com.tl.resource.web.contractOrder;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.dao.pojo.TOrderInfor;
/**
 * 
 * @author ls
 *	 删除合同订单详细
 */
public class DeleteContractOrderDetailAction extends Action{
	
	private ContractOrderService contractOrderService;
	
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		// TODO Auto-generated method stub
		String order = request.getParameter("orderInfor");
		JSONObject orderObj = JSONObject.fromObject(order);
		JSONObject orderForm = orderObj.getJSONObject("data");
		TOrderInfor orderInfor = (TOrderInfor) JSONObject.toBean(orderForm,TOrderInfor.class);	
		String[] ids = request.getParameterValues("ids");
		contractOrderService.deleteOrderDetail(ids,orderInfor);
		PrintWriter out = response.getWriter();
		String resultStr = "{success : true, msg : '删除产品成功'}";
		out.println(resultStr);
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
