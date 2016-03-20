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
import com.tl.resource.business.reserveOrder.ReserveOrderService;
import com.tl.resource.dao.pojo.TOrderInfor;

public class updateReservOrderAction extends Action{

	
	private ReserveOrderService reserveOrderServiceImpl;
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
		String resultStr = "{success : true, msg : '修改订单成功'}";
		String order = request.getParameter("update_order");
		JSONObject orderObj = JSONObject.fromObject(order);
		JSONObject orderForm = orderObj.getJSONObject("data");
		String orderDetail = request.getParameter("update_orderDetail");	
		String[] ids = request.getParameterValues("ids");
		try {
			TOrderInfor orderInfor = (TOrderInfor) JSONObject.toBean(orderForm,TOrderInfor.class);	
			JSONArray array = JSONArray.fromObject(orderDetail);
			reserveOrderServiceImpl.updateOrder(orderInfor, array,ids);
		} catch(Exception e) {
			e.printStackTrace();
			resultStr = "{success : false, msg : '修改订单信息失败'}";
		}
		
		PrintWriter out = response.getWriter();
		out.write(resultStr);
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
	
	public String getParId() {
		return parId;
	}

	public void setParId(String parId) {
		this.parId = parId;
	}

}

