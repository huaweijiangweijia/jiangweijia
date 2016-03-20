package com.tl.resource.web.selfOrder;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.selfOrder.SelfOrderService;
import com.tl.resource.dao.pojo.TOrderInfor;

public class DeleteSelfOrderDetailAction extends Action{
	
	private SelfOrderService selfOrderService;
	
	/**
	 * 删除合同订单
	 */
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub
		String order = request.getParameter("orderInfor");
		JSONObject orderObj = JSONObject.fromObject(order);
		JSONObject orderForm = orderObj.getJSONObject("data");
		TOrderInfor orderInfor = (TOrderInfor) JSONObject.toBean(orderForm,TOrderInfor.class);	
		
		String contractDetailId = request.getParameter("id");
		boolean isExit = false;
		if(contractDetailId!=null&&!("").equals(contractDetailId))
		{
			isExit = selfOrderService.deleteOrderDetailById(contractDetailId,orderInfor);
		}
		PrintWriter out = response.getWriter();
		out.write("{success : "+isExit+"}");
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

		
}
