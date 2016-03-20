/**
 * 
 */
package com.tl.resource.web.baseInfo;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.common.util.RegexUtils;
import com.tl.resource.business.baseInfo.BaseInfoService;
import com.tl.resource.dao.pojo.TSuppliersInfor;
import com.tl.resource.dao.pojo.TSuppliersInforExample;

/**
 * @author xtaia
 * 供应商信息列表
 */
public class SupplierListAction extends Action {

	private BaseInfoService baseInfoService;

	public BaseInfoService getBaseInfoService() {
		return baseInfoService;
	}

	public void setBaseInfoService(BaseInfoService baseInfoService) {
		this.baseInfoService = baseInfoService;
	}

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
		
		TSuppliersInforExample suppliersInforExample = new TSuppliersInforExample();
		TSuppliersInforExample.Criteria suppliersInforCriteria = suppliersInforExample.createCriteria();
		String searchStr = request.getParameter("searchStr");
		if(searchStr != null){
			
			JSONObject  searchJson = JSONObject.fromObject(searchStr);
			if(StringUtils.isNotBlank(searchJson.getString("supplierName"))){
				suppliersInforCriteria.andSupplierNameLike("%"+searchJson.getString("supplierName")+"%");
			}
			if(StringUtils.isNotBlank(searchJson.getString("supplierCode"))){
				suppliersInforCriteria.andSupplierCodeLike("%"+searchJson.getString("supplierCode")+"%");
			}
		}
		int total = baseInfoService.countSuppliersByExample(suppliersInforExample);
		
		String sort = request.getParameter("sort");
		if(sort != null){
			suppliersInforExample.setOrderByClause(RegexUtils.toDataBaseColName(sort) + " " +request.getParameter("dir"));
			
		}
		
		List<TSuppliersInfor> list = baseInfoService.getSuppliersByExample(suppliersInforExample, Integer.parseInt(start), Integer.parseInt(limit));
		
		String jsonStr = JSONArray.fromObject(list).toString();
		String resultStr = "{totalProperty : " + total + ", supplierList : "  + jsonStr + "}";
		
		
		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();

		return null;
	}


	
	
	

}
