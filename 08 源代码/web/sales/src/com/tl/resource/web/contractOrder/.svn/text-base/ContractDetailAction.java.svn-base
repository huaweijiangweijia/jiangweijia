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

import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.dto.ContractProductDetailDto;

/**
 * 
 * @author ls
 *	选择合同界面，合同详细列表
 */
public class ContractDetailAction extends Action{

	private ContractOrderService contractOrderService;
	
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		String size = request.getParameter("limit") == null?"15":request.getParameter("limit");
		String start = request.getParameter("start") == null?"0":request.getParameter("start");
		String contractId = request.getParameter("contractId");
		Map<String, Object> parmMap = new HashMap<String, Object>(); 
		parmMap.put("contractId", contractId);
		if(size!=null&&start!=null)
		{
			parmMap.put("startIndex", Integer.parseInt(start));
			parmMap.put("pageSize", Integer.parseInt(size));
		}
		
		int total = contractOrderService.getContractDetailCount(parmMap);
		List<ContractProductDetailDto> contractDetailList = contractOrderService.getContractDetail(parmMap);
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
