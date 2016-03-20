package com.tl.resource.web;

import java.io.PrintWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;
import com.tl.common.util.LoginInforUtil;
import com.tl.common.util.PaginationSupport;
import com.tl.common.util.rsa.CheckSNCode;
import com.tl.resource.business.WaitWorksInforService;
import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.dto.LoginInforDto;

public class WaitWorksInforAction extends DispatchAction {
	private WaitWorksInforService waitWorksInforService;
	private ContractOrderService contractOrderService;
	//private SysTryManage sysTryManage;
	public ActionForward requestInfos(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		PrintWriter out = response.getWriter();
		LoginInforDto loginInfor = LoginInforUtil.getLoginInfor(request);
		//int waitAuditCount = waitWorksInforService.findWaitAuditInfors(loginInfor);
		int waitorderConCount = waitWorksInforService.findWaitContract2OrderCount(loginInfor,1);
		int waitSelfOrderConCount = waitWorksInforService.findWaitContract2OrderCount(loginInfor,0);
		int waitContractQuoCount = waitWorksInforService.findWaitQuotation2ContractCount(loginInfor);
		int waitExpectedQuoCount = waitWorksInforService.findWaitExpectedQuotation2OrderCount(loginInfor);
		int waitExpectedQuo4SelfOrderCount = waitWorksInforService.findWaitExpectedQuotation2SelfOrderCount(loginInfor);
		int waitTryToolsQuoCount = waitWorksInforService.findWaitTryToolsQuotation2OrderCount(loginInfor);
		int waitTryToolsQuo4SelfOrderCount = waitWorksInforService.findWaitTryToolsQuotation2SelfOrderCount(loginInfor);
		int contractCountCouldUploadFile = waitWorksInforService.getContractCountCouldUploadFile(loginInfor);
		int expectedQuo2QuoCount = waitWorksInforService.getExpectedQuo2QuoCount(loginInfor);
		int tryTools2DeliveryCount = waitWorksInforService.getTryTools2DeliveryCount(loginInfor);
		int tryTools2UploadReportCount = waitWorksInforService.getTryTools2UploadReportCount(loginInfor);
		
		Boolean isReged = true;
		
		//if(!sysTryManage.validSystemTryDate()){//if try date over
		String path = request.getSession().getServletContext().getRealPath("");
			CheckSNCode csnc = new CheckSNCode();
			//isReged = csnc.check(path);
		//}
		
		HashMap<String,Object> h = new HashMap<String,Object>();
		//h.put("waitAuditCount", waitAuditCount);
		h.put("waitorderConCount", waitorderConCount);
		h.put("waitContractQuoCount",waitContractQuoCount);
		h.put("waitExpectedQuoCount",waitExpectedQuoCount);
		h.put("waitExpectedQuo4SelfOrderCount",waitExpectedQuo4SelfOrderCount);
		h.put("waitTryToolsQuoCount",waitTryToolsQuoCount);
		h.put("waitTryToolsQuo4SelfOrderCount",waitTryToolsQuo4SelfOrderCount);
		h.put("contractCountCouldUploadFile",contractCountCouldUploadFile);
		h.put("expectedQuo2QuoCount",expectedQuo2QuoCount);
		h.put("tryTools2DeliveryCount",tryTools2DeliveryCount);
		h.put("tryTools2UploadReportCount",tryTools2UploadReportCount);
		h.put("waitSelfOrderConCount",waitSelfOrderConCount);
		h.put("willReg", isReged ? 0 : 1);
		//h.put("cupCode", Extension.GetCPUID());  64位
		out.println(JSONObject.fromObject(h));
		out.flush();
		out.close();
		return null;
	}
	
	public ActionForward unPayment(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		LoginInforDto loginInfor = LoginInforUtil.getLoginInfor(request);
		
		List<String> unPaymentContracts = waitWorksInforService.getUnPaymentContracts(loginInfor);
		StringBuffer unPaymentContractStr = new StringBuffer();
		if(unPaymentContracts!=null && unPaymentContracts.size()>0){
			for(int i=0; i<unPaymentContracts.size();i++){
				if(i==unPaymentContracts.size()-1) 
					unPaymentContractStr.append(unPaymentContracts.get(i));
				else 
					unPaymentContractStr.append(unPaymentContracts.get(i)).append(",");
			}
		}
		Boolean isReged = true;
		
		//if(!sysTryManage.validSystemTryDate()){//if try date over
		String path = request.getSession().getServletContext().getRealPath("");
			CheckSNCode csnc = new CheckSNCode();
			//isReged = csnc.check(path);
		//}
		
		HashMap<String,Object> h = new HashMap<String,Object>();
		//h.put("waitAuditCount", waitAuditCount);
		h.put("unPaymentContracts",unPaymentContractStr.toString());
		h.put("willReg", isReged ? 0 : 1);
		//h.put("cupCode", Extension.GetCPUID());  64位
		out.println(JSONObject.fromObject(h));
		out.flush();
		out.close();
		return null;
	}
	
	public ActionForward findWaitContract2OrderInfors(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		String startIndex = request.getParameter("startIndex");
		String pageSize = request.getParameter("pageSize");
		
		if(startIndex == null){
			startIndex = "0";
		}
		if(pageSize == null){
			pageSize = "10";
		}
		String orderTypep = request.getParameter("orderType");
		orderTypep = orderTypep == null ? "0" : orderTypep;//0 加工，1采购
		
		PrintWriter out = response.getWriter();
		LoginInforDto loginInfor = LoginInforUtil.getLoginInfor(request);
		if(loginInfor != null){
			
			PaginationSupport pageInfor = waitWorksInforService.findWaitContract2OrderInfors(loginInfor, Integer.valueOf(startIndex), Integer.valueOf(pageSize),Integer.valueOf(orderTypep));
			if(pageInfor == null) return null;
			out.println(JSONObject.fromObject(pageInfor).toString());
			out.flush();
			out.close();
		}else{
			
		}
		return null;
	}
	
	public ActionForward findWaitQuotation2ContractInfors(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		String startIndex = request.getParameter("startIndex");
		String pageSize = request.getParameter("pageSize");
		if(startIndex == null){
			startIndex = "0";
		}
		if(pageSize == null){
			pageSize = "10";
		}
		PrintWriter out = response.getWriter();
		LoginInforDto loginInfor = LoginInforUtil.getLoginInfor(request);
		
		if(loginInfor != null){
			PaginationSupport pageInfor = waitWorksInforService.findWaitQuotation2ContractInfors(loginInfor, Integer.valueOf(startIndex), Integer.valueOf(pageSize));
			if(pageInfor == null) return null;
			out.println(JSONObject.fromObject(pageInfor).toString());
			out.flush();
			out.close();
		}else{
			
		}
		return null;
	}
	
	public WaitWorksInforService getWaitWorksInforService() {
		return waitWorksInforService;
	}
	public void setWaitWorksInforService(WaitWorksInforService waitWorksInforService) {
		this.waitWorksInforService = waitWorksInforService;
	}

	public ContractOrderService getContractOrderService() {
		return contractOrderService;
	}

	public void setContractOrderService(ContractOrderService contractOrderService) {
		this.contractOrderService = contractOrderService;
	}

//	public SysTryManage getSysTryManage() {
//		return sysTryManage;
//	}
//
//	public void setSysTryManage(SysTryManage sysTryManage) {
//		this.sysTryManage = sysTryManage;
//	}
	
}
