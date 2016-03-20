package com.tl.resource.web.contractOrder;

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

import com.tl.common.util.LoginInforUtil;
import com.tl.common.util.PaginationSupport;
import com.tl.common.util.RegexUtils;
import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.dto.ContractInforDto;
import com.tl.resource.business.dto.LoginInforDto;
import com.tl.resource.business.dto.ReserveOrderBean;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.dao.pojo.TContractInfor;
import com.tl.resource.dao.pojo.TOrderInfor;
/**
 * 
 * @author ls
 *	选择合同界面，合同列表
 */
public class ContractListAction extends Action{

	private ContractOrderService contractOrderService;
	
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");		
		String size = request.getParameter("limit") == null?"15":request.getParameter("limit");
		String start = request.getParameter("start") == null?"0":request.getParameter("start");
		int pageSize = Integer.parseInt(size);
		int startIndex = Integer.parseInt(start);
		String searchStr = request.getParameter("searchStr");
		String contractCode = "";
		String customerName = "";
		String startTime = "";
		String endTime = "";
		if(searchStr != null && !"".equals(searchStr)) {
			JSONObject search = JSONObject.fromObject(searchStr);
			try {
				contractCode = search.getString("contractCode");
				customerName = search.getString("customerName");
				startTime = search.getString("startTime");
				if(startTime.length()>1)
				{
					startTime = startTime.substring(0, 10);
				}
				endTime = search.getString("endTime");
				if(endTime.length()>1)
				{
					endTime = endTime.substring(0, 10);
				}
			} catch(Exception e) {
				
			}
		}
		
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("status", 4);
		parmMap.put("contractCode", contractCode);
		parmMap.put("customerName", customerName);
		
		parmMap.put("startTime", startTime);
		parmMap.put("endTime", endTime);
		parmMap.put("startIndex", startIndex);
		parmMap.put("pageSize", pageSize);
		
		LoginInforDto loginInfor = LoginInforUtil.getLoginInfor(request);
		UserDto user = loginInfor.getUser();
		parmMap.put("currUserId", user.getId());
		parmMap.put("conType", request.getParameter("conType"));
		parmMap.put("leaf", request.getParameter("leaf"));
		//System.out.println(request.getParameter("conType"));
		String sort = request.getParameter("sort");
		if(sort != null){
			if("editDateString".equals(sort)){
				sort = "editDate";
			}
			parmMap.put("sort", RegexUtils.toDataBaseColName(sort));
			parmMap.put("dir", request.getParameter("dir"));
		}
		int total = contractOrderService.getContractListCount(parmMap);
		List<ContractInforDto> contractList = contractOrderService.getContractList(parmMap);	
		PrintWriter out = response.getWriter();
		out.println("{root:"+JSONArray.fromObject(contractList).toString()+",totalProperty:"+total+"}");
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
