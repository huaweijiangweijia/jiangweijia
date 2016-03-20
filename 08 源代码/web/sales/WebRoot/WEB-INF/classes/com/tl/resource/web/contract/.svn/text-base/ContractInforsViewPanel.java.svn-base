package com.tl.resource.web.contract;

import java.io.PrintWriter;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;
import com.tl.common.SystemConstants;
import com.tl.common.util.LoginInforUtil;
import com.tl.common.util.PaginationSupport;
import com.tl.common.util.RegexUtils;
import com.tl.resource.business.contract.ContractViewService;
import com.tl.resource.business.dto.LoginInforDto;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.business.quotation.generalquo.GeneralQuoService;
import com.tl.resource.dao.constant.TResourcePurviewConstant;

public class ContractInforsViewPanel extends DispatchAction {
	private ContractViewService contractViewService = null;
	public ActionForward contractList(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		PrintWriter out = response.getWriter();
		String startIndex = request.getParameter("start");
		String pageSize = request.getParameter("limit");
		if(startIndex == null){
			startIndex = "0";
		}
		if(pageSize == null){
			pageSize = "10";
		}
		Map<String, String> mparams = initParams(request);
		PaginationSupport pageInfor = contractViewService.findContractViewPanelInfors(mparams , Integer.valueOf(startIndex), Integer.valueOf(pageSize));
		String rt = JSONObject.fromObject(pageInfor).toString();
		
		out.println(rt);
		out.flush();
		out.close();
		return null;
	}
	
	public ActionForward baseContractList(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String,Object> params = getParams(request);
		params.put(SystemConstants.ORDER_KEY, "edit_date desc");
		PaginationSupport paginationSupport = contractViewService.pageContractWithPart(params);
		String jsonStr = JSONArray.fromObject(paginationSupport.getItems()).toString();
		String resultStr = "{totalCount : " + paginationSupport.getTotalCount() + ", items : "  + jsonStr + "}";
		response.getWriter().append(resultStr);
		response.getWriter().close();
		return null;
	}
	
	private Map<String,Object> getParams(HttpServletRequest request) throws ParseException{
		Map<String,Object> rst = new HashMap<String, Object>();
		rst.put(SystemConstants.ORDER_KEY, "edit_date desc");
		rst.put(TResourcePurviewConstant.RESOURCE_TYPE, 1);
		rst.put(ContractViewService.LOAD_ACCESSORIES_GET_CONTRACT_WITH_PART, true);
		LoginInforDto userInfo = LoginInforUtil.getLoginInfor(request);
		rst.put(TResourcePurviewConstant.USER_ID, userInfo.getUser().getId());
		if(StringUtils.isNotBlank(request.getParameter("start"))){
			rst.put(SystemConstants.START_INDEX_KEY, Integer.valueOf(request.getParameter("start")));
		}else{
			rst.put(SystemConstants.START_INDEX_KEY, 0);
		}
		if(StringUtils.isNotBlank(request.getParameter("limit"))){
			rst.put(SystemConstants.PAGE_SIZE_KEY, Integer.valueOf(request.getParameter("limit")));
		}else{
			rst.put(SystemConstants.PAGE_SIZE_KEY, SystemConstants.PAGE_SIZE);
		}
		return rst;
	}
	
	private Map<String, String> initParams(HttpServletRequest request) {
		Map<String,String> mparams = new HashMap<String,String>();
		mparams.put("contractCode", request.getParameter("contractCode"));
		mparams.put("customerName", request.getParameter("customerName"));
		if(!"-2".equals(request.getParameter("status"))){
			mparams.put("status", request.getParameter("status"));
		}
		mparams.put("startDate", request.getParameter("startDate"));
		mparams.put("endDate", request.getParameter("endDate"));
		
		mparams.put("invoiceStartDate", request.getParameter("invoiceStartDate"));
		mparams.put("invoiceEndDate", request.getParameter("invoiceEndDate"));
		
		mparams.put("accountStartDate", request.getParameter("accountStartDate"));
		mparams.put("accountEndDate", request.getParameter("accountEndDate"));
		
		mparams.put("userName", request.getParameter("userName"));
		mparams.put("orderStatus", request.getParameter("orderStatus"));
		mparams.put("orderArrivalStatus", request.getParameter("orderArrivalStatus"));
		mparams.put("allArrivalStatus", request.getParameter("allArrivalStatus"));
		mparams.put("deliveryStatus", request.getParameter("deliveryStatus"));
		mparams.put("contractAccountStatus", request.getParameter("contractAccountStatus"));
		mparams.put("invoiceStatus", request.getParameter("invoiceStatus"));
		mparams.put("ownContactPerson", request.getParameter("ownContactPerson"));
		
		String sort = request.getParameter("sort");
		if(sort != null){
			if("editDateString".equals(sort)){
				sort = "editDate";
			}
			mparams.put("sort", RegexUtils.toDataBaseColName(sort));
			mparams.put("dir", request.getParameter("dir"));
		}
		LoginInforDto loginInfor = LoginInforUtil.getLoginInfor(request);
		UserDto user = loginInfor.getUser();
		mparams.put("currUserId", user.getId());
		return mparams;
	}
	public ActionForward getContractTotalInfor(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		Map<String, String> mparams = initParams(request);
		Map totalData = contractViewService.getContractTotalInfor(mparams);
		String rt = JSONObject.fromObject(totalData).toString();
		out.print(rt);
		out.flush();
		out.close();
		return null;
	}
	public ContractViewService getContractViewService() {
		return contractViewService;
	}
	public void setContractViewService(ContractViewService contractViewService) {
		this.contractViewService = contractViewService;
	}
	
}
