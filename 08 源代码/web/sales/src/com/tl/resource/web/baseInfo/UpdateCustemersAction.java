/**
 * 
 */
package com.tl.resource.web.baseInfo;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.resource.business.baseInfo.BaseInfoService;
import com.tl.resource.dao.pojo.TCustomersDegree;
import com.tl.resource.dao.pojo.TCustomersInfor;

/**
 * @author xtaia
 *
 */
public class UpdateCustemersAction extends Action {


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
		String resultStr = "{success : true, msg : '修改客户信息成功'}";

		String updateCustomersInfoPar = request.getParameter("customersFormInfoPar");
		JSONObject customersObj = JSONObject.fromObject(updateCustomersInfoPar);
		//是否锁定
		try {
			TCustomersInfor customersInfo = (TCustomersInfor)JSONObject.toBean(customersObj, TCustomersInfor.class);
			String customserDegreeId = customersInfo.getDegreeCode();
			TCustomersDegree tcd = baseInfoService.getCustomersDegreeById(customserDegreeId);
			if(tcd != null){
				customersInfo.setDegreeCode(tcd.getDegreeCode());
				customersInfo.setCustomerDegreeId(tcd.getId());
			}
			
			baseInfoService.updateCustomers(customersInfo);
		} catch (Exception e) {
			e.printStackTrace();
			resultStr = "{success : false, msg : '" + e.getMessage() + ",修改客户信息失败'}";
		}
		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();

		return null;
	}



}
