/**
 * 
 */
package com.tl.resource.web.baseInfo;

import java.io.IOException;
import java.io.PrintWriter;
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

import com.tl.common.util.RegexUtils;
import com.tl.resource.business.baseInfo.BaseInfoService;
import com.tl.resource.dao.pojo.TCustomersInfor;

/**
 * @author xtaia
 * 客户信息列表
 */
public class CustomersListAction extends Action {
	


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
		response.setContentType("text/html;charset=utf-8");

		
		String method = request.getParameter("method");
		if("assessment".equals(method)){ //评估信息客户列表
			return getAssessMentCustomerList(request,response);
		}
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
		Map<String, Object> parmMap = new HashMap<String, Object>();
		
		String searchStr = request.getParameter("searchStr");
		
		
		if(searchStr != null){//前段参数是以json格式传过来的时候
			JSONObject  searchJson = JSONObject.fromObject(searchStr);
			parmMap.put("customerName", searchJson.getString("customerName"));
			parmMap.put("customerCode", searchJson.getString("customerCode"));
			//parmMap.put("degreeCode", searchJson.getString("degreeCode"));
			parmMap.put("ownContactPerson", searchJson.getString("ownContactPerson"));
			
			parmMap.put("contactPersonFirst", searchJson.getString("contactPersonFirst"));
			//System.out.println("@@@@@@@@@@@@@========customerName" + searchJson.getString("customerName"));
			//System.out.println("@@@@@@@@@@@@@========contactPersonFirst" + searchJson.getString("contactPersonFirst"));
			//System.out.println(searchJson.getString("degreeCode") + "@@@@@@@@@@@@@" + searchJson.getString("ownContactPerson"));
		}
		
		
		parmMap.put("start", Integer.parseInt(start));
		parmMap.put("limit", Integer.parseInt(limit));
		
		//得到客户的总数
		int total = baseInfoService.getCustomersCount(parmMap);
		
		String sort = request.getParameter("sort");
		if(sort != null){
			parmMap.put("sort", RegexUtils.toDataBaseColName(sort));
			parmMap.put("dir", request.getParameter("dir"));
		}
		
		List<TCustomersInfor> list = baseInfoService.getCustomersList(parmMap);
		
		String jsonStr = JSONArray.fromObject(list).toString();
		String resultStr = "{totalProperty : " + total + ", customersList : "  + jsonStr + "}";
		
		
		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();

		return null;
	}

	private ActionForward getAssessMentCustomerList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("customerName", request.getParameter("customerName"));
		parmMap.put("start", Integer.parseInt(start));
		parmMap.put("limit", Integer.parseInt(limit));
		List<TCustomersInfor> list = baseInfoService.getAssessmentCustomersList(parmMap);
		
		String jsonStr = JSONArray.fromObject(list).toString();
		String resultStr = "{customersList : "  + jsonStr + "}";
		
		
		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();
		return null;
	}



}
