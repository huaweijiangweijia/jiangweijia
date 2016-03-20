package com.tl.resource.web.contractOrder;

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
import com.tl.resource.business.contract.ContractViewService;
import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.dto.LoginInforDto;
import com.tl.resource.dao.constant.TOrderInforConstant;
import com.tl.resource.dao.constant.TResourcePurviewConstant;

/**
 * 采购订单基础action
 * @author lichicheng
 *
 */
public class ContractOrderCommonAction extends DispatchAction{

	private ContractOrderService contractOrderService;
	
	public ActionForward list(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String searchStr = request.getParameter("searchStr");
		Map<String,Object> params = new HashMap<String, Object>();
		JSONObject search =null;
		if(searchStr != null && !"".equals(searchStr)) {
			search = JSONObject.fromObject(searchStr);
		}else{
			search = JSONObject.fromObject("{}");
		}
		
		params = getParams(search,request);		
		PaginationSupport page = contractOrderService.pageContractOrderWithPart(params);
		String jsonStr = JSONArray.fromObject(page.getItems()).toString();
		String resultStr = "{totalProperty : " + page.getTotalCount() + ", root : "  + jsonStr + "}";
		response.getWriter().append(resultStr);
		response.getWriter().close();
		return null;
	}
	private Map<String,Object> getParams(JSONObject search,HttpServletRequest request) throws ParseException{
		Map<String,Object> rst = new HashMap<String, Object>();
		rst.put(SystemConstants.ORDER_KEY, "edit_date desc");
		rst.put(TResourcePurviewConstant.RESOURCE_TYPE, 3);
		rst.put(ContractViewService.LOAD_ACCESSORIES_GET_CONTRACT_WITH_PART, true);
		LoginInforDto userInfo = LoginInforUtil.getLoginInfor(request);
		rst.put(TResourcePurviewConstant.USER_ID, userInfo.getUser().getId());
		//采购合同类型
		if(StringUtils.isNotBlank(request.getParameter("orderType"))){
			rst.put(TOrderInforConstant.ORDER_TYPE, Integer.valueOf(request.getParameter("orderType")));
		}
			
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
	
	public ContractOrderService getContractOrderService() {
		return contractOrderService;
	}
	public void setContractOrderService(ContractOrderService contractOrderService) {
		this.contractOrderService = contractOrderService;
	}

}
