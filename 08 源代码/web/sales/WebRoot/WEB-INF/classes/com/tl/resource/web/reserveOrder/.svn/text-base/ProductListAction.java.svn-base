package com.tl.resource.web.reserveOrder;

import java.io.PrintWriter;
import java.util.ArrayList;
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
import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.TreeDto;
import com.tl.resource.business.reserveOrder.ReserveOrderService;

public class ProductListAction extends Action{

	private ReserveOrderService reserveOrderServiceImpl;
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		String size = request.getParameter("limit") == null?"20":request.getParameter("limit");
		String start = request.getParameter("start") == null?"0":request.getParameter("start");
		int pageSize = Integer.parseInt(size);
		int startIndex = Integer.parseInt(start);
		//搜索字符串
		String searchStr = request.getParameter("searchStr");
		
		String productCode = "";
		String brandCode = request.getParameter("brandCode");
		String productName = "";
		String supplierId = "";
		String brand = "";
		String salePriceDate = "";
		if(request.getParameter("supplierId")!=null)
		{
			supplierId = request.getParameter("supplierId");
		}
		if(searchStr != null && !"".equals(searchStr)) {
			
			JSONObject search = JSONObject.fromObject(searchStr);		
			try {
				if(search.has("productCode"))productCode = search.getString("productCode");
				if(search.has("brandCode"))brandCode = search.getString("brandCode");
				if(search.has("productName"))productName = search.getString("productName");
				
				if(search.has("brand"))
					brand = search.getString("brand");
				if(search.has("salePriceDate"))
					salePriceDate = search.getString("salePriceDate");
			} catch(Exception e) {
				
			}
		}
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("productCode", productCode);
		parmMap.put("brandCode", brandCode);
		parmMap.put("productName", productName);
		parmMap.put("supplierId", supplierId);	
		parmMap.put("startIndex", startIndex);
		parmMap.put("pageSize", pageSize);
		
		parmMap.put("brand", brand);
		parmMap.put("salePriceDate", salePriceDate);
		System.out.println("test...1");
		int total = reserveOrderServiceImpl.getProToolsTotal(parmMap);
		System.out.println("test...2");
		List<TreeDto> proList = reserveOrderServiceImpl.getOrderProToolsList(parmMap);
		System.out.println("test...3");
		PrintWriter out = response.getWriter();
		out.write("{root:"+JSONArray.fromObject(proList).toString()+",totalProperty:"+total+"}");
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
