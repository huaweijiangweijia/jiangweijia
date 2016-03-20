package com.tl.resource.web.baseInfo.ProductCorrelation.dj;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.common.util.PaginationSupport;
import com.tl.common.util.RegexUtils;
import com.tl.resource.business.baseInfo.ProductToolsService;
import com.tl.resource.business.dto.TreeDto;

public class OrderPriceEditAction extends DispatchAction {
	private ProductToolsService productToolsService;
	public ActionForward productList(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
		if(start == null) start = "0";
		if(limit == null) limit = "20";
		Map<String, Object> parmMap = new HashMap<String, Object>();
		String searchStr = request.getParameter("searchStr");
		if(searchStr != null){
			JSONObject  searchJson = JSONObject.fromObject(searchStr);
			parmMap.put("productName", searchJson.getString("productName"));
			parmMap.put("productCode", searchJson.getString("productCode"));
			parmMap.put("productSortCode", searchJson.getString("sortCode"));
			parmMap.put("brandCode", searchJson.getString("brandCode"));
			parmMap.put("productBrand", searchJson.getString("productBrand"));
			//parmMap.put("productSource", searchJson.getString("productSource"));
		}
		
		String sort = request.getParameter("sort");
		if(sort != null){
			parmMap.put("sort", RegexUtils.toDataBaseColName(sort));
			parmMap.put("dir", request.getParameter("dir"));
		}
		parmMap.put("start", Integer.parseInt(start));
		parmMap.put("limit", Integer.parseInt(limit));
		
		PaginationSupport pageInfor = productToolsService.getProductToolsList(parmMap, Integer.parseInt(start), Integer.parseInt(limit));
		String jsonStr = JSONArray.fromObject(pageInfor.getItems()).toString();
		String resultStr = "{totalProperty : " + pageInfor.getTotalCount() + ", orderPriceHistoryList : "  + jsonStr + "}";
		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();
		return null;
	}
	public ActionForward updateProductOrderPriceInfor(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		String Products = request.getParameter("Products");
		JSONArray arr = JSONArray.fromObject(Products);
		List<TreeDto> toolsDtos = new ArrayList<TreeDto>();
		for (Iterator iterator = arr.iterator(); iterator.hasNext();) {
			JSONObject object = (JSONObject) iterator.next();
			TreeDto proDto = (TreeDto) JSONObject.toBean(object, TreeDto.class);
			toolsDtos.add(proDto);
		}
		productToolsService.updateProductOrderPriceInfor(toolsDtos);
		PrintWriter out = response.getWriter();
		out.flush();
		out.close();
		return null;
	}
	
	public ProductToolsService getProductToolsService() {
		return productToolsService;
	}
	public void setProductToolsService(ProductToolsService productToolsService) {
		this.productToolsService = productToolsService;
	}
	
}
