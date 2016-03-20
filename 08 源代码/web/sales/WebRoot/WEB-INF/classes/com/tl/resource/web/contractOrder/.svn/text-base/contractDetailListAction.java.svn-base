package com.tl.resource.web.contractOrder;

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
import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.dto.ContractProductDetailDto;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.TreeDto;
/**
 * 
 * @author ls
 *	合同订单编制界面订单详细，产品添加界面产品列表
 */
public class contractDetailListAction extends Action{
		
	private ContractOrderService contractOrderService;

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=utf-8");
		String size = request.getParameter("limit");
		String start = request.getParameter("start");
		String contractCode = request.getParameter("contractCode");
		String supplierId = request.getParameter("supplierId");
		String productBrand = request.getParameter("productBrand");
		//搜索字符串
		String searchStr = request.getParameter("searchStr");
		String contractProjectSortId = "";
		String brandCode = "";
		String productName = "";
		if(searchStr != null && !"".equals(searchStr)) {
			JSONObject search = JSONObject.fromObject(searchStr);
			try {
				contractProjectSortId = search.getString("id");
				brandCode = search.getString("brandCode");
				productName = search.getString("productName");
			} catch(Exception e) {
				//System.out.println(e);
			}
		}	
		Map<String, Object> parmMap = new HashMap<String, Object>(); 
		parmMap.put("contractCode", contractCode);
		parmMap.put("supplierId", supplierId);		
		parmMap.put("contractProjectSortId", contractProjectSortId);
		parmMap.put("brandCode", brandCode);
		parmMap.put("productName", productName);
		if(size!=null&&start!=null)
		{
			parmMap.put("startIndex", Integer.parseInt(start));
			parmMap.put("pageSize", Integer.parseInt(size));
		}
		parmMap.put("productBrand", productBrand);
		int total = contractOrderService.getContractDetailListCount(parmMap);
		List<OrderDetialsDto> contractDetailList = contractOrderService.getContractDetailList(parmMap);
		PrintWriter out = response.getWriter();
		out.println("{root:"+JSONArray.fromObject(contractDetailList).toString()+",totalProperty:"+total+"}");
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
