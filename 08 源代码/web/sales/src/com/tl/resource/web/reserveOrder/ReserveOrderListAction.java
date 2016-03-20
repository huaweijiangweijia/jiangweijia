package com.tl.resource.web.reserveOrder;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.common.util.LoginInforUtil;
import com.tl.common.util.PaginationSupport;
import com.tl.common.util.RegexUtils;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.ReserveOrderBean;
import com.tl.resource.business.dto.ReserveOrderDto;
import com.tl.resource.business.dto.TreeDto;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.business.reserveOrder.ReserveOrderService;
import com.tl.resource.dao.pojo.TOrderInfor;

public class ReserveOrderListAction extends Action{
	
	private ReserveOrderService reserveOrderServiceImpl;


/**
 * 储备订单
 */
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		UserDto userDto = null;
		if(LoginInforUtil.getLoginInfor(request) != null) {
			userDto = LoginInforUtil.getLoginInfor(request).getUser();
		}
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=utf-8");		
		String size = request.getParameter("limit") == null?"20":request.getParameter("limit");
		String start = request.getParameter("start") == null?"0":request.getParameter("start");
		int pageSize = Integer.parseInt(size);
		int startIndex = Integer.parseInt(start);
		String orderCode = "";
		String supplierName = "";
		String startTime = "";
		String endTime = "";
		String status = "";
		String supplierOwnContactPerson = "";
		String searchStr = request.getParameter("searchStr");
		if(searchStr != null && !"".equals(searchStr)) {
			JSONObject search = JSONObject.fromObject(searchStr);		
			try {
				orderCode = search.getString("orderCode");
				supplierName = search.getString("supplierName");
				startTime = search.getString("startTime");
				endTime = search.getString("endTime");
				status = search.getString("status");
				if(status!=null&&status.equals("全部"))
				{
					status = null;
				}
				supplierOwnContactPerson = search.getString("supplierOwnContactPerson");
			} catch(Exception e) {
				
			}
		}
		int orderType = 2; //储备订单
		Map<String, Object> parmMap = new HashMap<String, Object>();
		
		String sort = request.getParameter("sort");
		if(sort != null){
			parmMap.put("sort", RegexUtils.toDataBaseColName(sort));
			parmMap.put("dir", request.getParameter("dir"));
		}
		
		parmMap.put("orderCode", orderCode);
		parmMap.put("supplierName", supplierName);
		parmMap.put("startTime", startTime);
		parmMap.put("endTime", endTime);
		parmMap.put("orderType", orderType);
		parmMap.put("status", status);
		parmMap.put("supplierOwnContactPerson", supplierOwnContactPerson);
		parmMap.put("startIndex", startIndex);
		parmMap.put("pageSize", pageSize);
		parmMap.put("userId", userDto.getId());
		int total = reserveOrderServiceImpl.getOrderTotal(parmMap);
		List<TOrderInfor> orderList = reserveOrderServiceImpl.getReserveOrderList(parmMap);	
		PrintWriter out = response.getWriter();
		ReserveOrderBean bean = new ReserveOrderBean();
		bean.setRoot(orderList);
		bean.setTotalProperty(total);
		out.println(JSONObject.fromObject(bean).toString());
		out.flush();
		out.close();
		return null;
	}
	

	public ReserveOrderService getReserveOrderServiceImpl() {
		return reserveOrderServiceImpl;
	}

	public void setReserveOrderServiceImpl(
			ReserveOrderService reserveOrderServiceImpl) {
		this.reserveOrderServiceImpl = reserveOrderServiceImpl;
	}
}
