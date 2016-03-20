package com.tl.resource.web.quotation.generalquo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;
import org.apache.commons.lang.StringUtils;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;
import com.tl.common.SystemConstants;
import com.tl.common.util.LoginInforUtil;
import com.tl.common.util.PaginationSupport;
import com.tl.common.util.RegexUtils;
import com.tl.resource.business.dto.LoginInforDto;
import com.tl.resource.business.quotation.generalquo.GeneralQuoService;
import com.tl.resource.dao.constant.TQuotationInforConstant;
import com.tl.resource.dao.constant.TResourcePurviewConstant;

/**
 * 报价基础列表
 * @author lichicheng
 *
 */
public class GeneralQuotationListAction extends DispatchAction{

	GeneralQuoService generalQuoService;

	public ActionForward list(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String,Object> params = getParams(request);
		PaginationSupport page = generalQuoService.pageQuotationByPageWithPart(params);
		
		String jsonStr = JSONArray.fromObject(page.getItems()).toString();
		String resultStr = "{totalProperty : " + page.getTotalCount() + ", root : "  + jsonStr + "}";
		response.getWriter().append(resultStr);
		response.getWriter().close();
		return null;
	}
	
	private Map<String,Object> getParams(HttpServletRequest request) throws ParseException{
		//t_accessories表中的上传文件类型（5，10，11）分别对应报价单附件，试发申请附件，试发报告上传文件
		Map<String,Object> rst = new HashMap<String, Object>();
		rst.put(SystemConstants.ORDER_KEY, "edit_date desc");
		if(StringUtils.isNotBlank(request.getParameter("sort"))){
			String sort = request.getParameter("sort");
			if("editTimeStr".equals(request.getParameter("sort"))){
				sort = "editDate";
			}
			rst.put(SystemConstants.ORDER_KEY, RegexUtils.toDataBaseColName(sort) + " " +request.getParameter("dir"));
		}
		rst.put(TResourcePurviewConstant.RESOURCE_TYPE, 1);
		rst.put(GeneralQuoService.LOAD_CUSTOMERS_GET_QUOTATION_BY_PAGE_WITH_PART, true);
		rst.put(GeneralQuoService.LOAD_ACCESSORIES_GET_QUOTATION_BY_PAGE_WITH_PART, true);
		rst.put(GeneralQuoService.LOAD_CONTRACT_GET_QUOTATION_BY_PAGE_WITH_PART, true);
		LoginInforDto userInfo = LoginInforUtil.getLoginInfor(request);
		rst.put(TResourcePurviewConstant.USER_ID, userInfo.getUser().getId());
		if(StringUtils.isNotBlank(request.getParameter("quotationType"))){
			rst.put(TQuotationInforConstant.QUOTATION_TYPE, Integer.valueOf(request.getParameter("quotationType")));
		}
		SimpleDateFormat smf = new SimpleDateFormat("yyyy-MM-dd");
		if(StringUtils.isNotBlank(request.getParameter("customerName"))){
			rst.put(TQuotationInforConstant.CUSTOMER_NAME_LIKE, request.getParameter("customerName"));
		}
		if(StringUtils.isNotBlank(request.getParameter("quotationCode"))){
			rst.put(TQuotationInforConstant.QUOTATION_CODE_LIKE, request.getParameter("quotationCode"));
		}
		if(StringUtils.isNotBlank(request.getParameter("startTime"))){
			rst.put(TQuotationInforConstant.EDIT_DATE_GT_EQ, smf.parse(request.getParameter("startTime")));
		}
		if(StringUtils.isNotBlank(request.getParameter("endTime"))){
			rst.put(TQuotationInforConstant.EDIT_DATE_LT_EQ, smf.parse(request.getParameter("endTime")));
		}
		//编制状态
		if(StringUtils.isNotBlank(request.getParameter("status"))){
			rst.put(TQuotationInforConstant.STATUS, Integer.valueOf(request.getParameter("status")));
		}
		//合同负责人
		if(StringUtils.isNotBlank(request.getParameter("userName"))){
			rst.put(TQuotationInforConstant.USER_NAME_LIKE, request.getParameter("userName"));
		}
		//合同编制人
		if(StringUtils.isNotBlank(request.getParameter("editorName"))){
			rst.put(TQuotationInforConstant.EDITOR_NAME_LIKE, request.getParameter("editorName"));
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
	 

	public GeneralQuoService getGeneralQuoService() {
		return generalQuoService;
	}
	public void setGeneralQuoService(GeneralQuoService generalQuoService) {
		this.generalQuoService = generalQuoService;
	}
	
	
}
