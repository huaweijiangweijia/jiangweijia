package com.tl.resource.web.contractOrder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.common.util.MoneyUtil;
import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.OrderInfoDto;

/**
 * 打印预览
 * @author Administrator
 *
 */
public class PrintViewAction extends DispatchAction{
	private java.text.DecimalFormat   df   = new   java.text.DecimalFormat("#.00");
	public static final int pagesize = 38;//预览详细页面每页记录条数
	private ContractOrderService contractOrderService;
	OrderInfoDto order = new OrderInfoDto();
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		String orderInforId = request.getParameter("id");
		//订单信息
		order = contractOrderService.getExcelOrderInfor(orderInforId);
		//订单详细产品数量
//		int detailCount = contractOrderService.getOrderDetailsListCount(orderInforId);
		//订单详细列表
		List<OrderDetialsDto> orderDetail = null;
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("orderId", orderInforId);
		orderDetail = contractOrderService.getOrderDetailForPrint(parmMap);
		request.setAttribute("order", order);
		request.setAttribute("orderDetail", orderDetail);
		request.setAttribute("orderDetailCount", orderDetail.size());
		request.setAttribute("bigWrite", MoneyUtil.CNValueOf(df.format(order.getTotalMoney().doubleValue())));//大写金额
		request.setAttribute("buyInfor", contractOrderService.getCompanyInfor(order.getCompanyId()));// 买方信息
		request.setAttribute("salesInfor", contractOrderService.getSuppliersInfor(order.getSupplierId()));//卖方信息
		if(orderDetail!=null&&orderDetail.size()>6)
		{
			request.setAttribute("pageCount", orderDetail.size()%pagesize==0?orderDetail.size()/pagesize:orderDetail.size()/pagesize+1);
		}
		else
		{
			request.setAttribute("pageCount", 0);
		}
		request.setAttribute("pagesize", pagesize);
		return mapping.findForward("success");
	}

	public ContractOrderService getContractOrderService() {
		return contractOrderService;
	}

	public void setContractOrderService(ContractOrderService contractOrderService) {
		this.contractOrderService = contractOrderService;
	}

	public OrderInfoDto getOrder() {
		return order;
	}

	public void setOrder(OrderInfoDto order) {
		this.order = order;
	}
	
	public static void main(String[] args)
	{
		System.out.println(10/3);
		System.out.println(10%3);
	}
	
}
