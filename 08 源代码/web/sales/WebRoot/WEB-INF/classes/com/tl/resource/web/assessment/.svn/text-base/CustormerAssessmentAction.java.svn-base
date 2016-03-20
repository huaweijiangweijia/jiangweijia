package com.tl.resource.web.assessment;

import java.io.FileInputStream;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.XLSTransformer;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.common.util.GenerateSerial;
import com.tl.common.util.LoginInforUtil;
import com.tl.common.util.PaginationSupport;
import com.tl.common.util.WebUtils;
import com.tl.resource.business.assessment.CustormerAssessmentService;
import com.tl.resource.business.dto.LoginInforDto;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.dao.pojo.TCustormerAssessment;
import com.tl.resource.dao.pojo.TSupplierAssessment;

public class CustormerAssessmentAction extends DispatchAction{
	private CustormerAssessmentService custormerAssessmentService;
	

	public CustormerAssessmentService getCustormerAssessmentService() {
		return custormerAssessmentService;
	}


	public void setCustormerAssessmentService(
			CustormerAssessmentService custormerAssessmentService) {
		this.custormerAssessmentService = custormerAssessmentService;
	}
	
	public ActionForward list(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String resultStr = "";
		try {
			
			LoginInforDto loginInfor = LoginInforUtil.getLoginInfor(request);
			int startIndex = 0;
			int pageSize = 15;
			
			String start = request.getParameter("start");
			String limit = request.getParameter("limit");
			
			try {
				startIndex = Integer.parseInt(start);
				pageSize = Integer.parseInt(limit);
			} catch (Exception e) {
				startIndex = 0;
				pageSize = 15;
			}
			Map<String, Object> params = new HashMap<String, Object>();
			if(loginInfor!=null){
				String formStr = request.getParameter("searchStr");
				if(StringUtils.isNotEmpty(formStr)){
					JSONObject quoObj = JSONObject.fromObject(formStr);
					if(StringUtils.isNotEmpty(quoObj.getString("custormerName"))){
						params.put("custormerName", quoObj.getString("custormerName"));
					}
				}
				PaginationSupport pageInfor = custormerAssessmentService.findCustormerAssessmentList(params, startIndex, pageSize);
				resultStr = JSONObject.fromObject(pageInfor).toString();
			}else{
				resultStr = "{success : false, msg : '请重新登录'}";
			}
		} catch (Exception e) {
			resultStr = "{success : true, msg : '删除客户评估信息失败'}";
			e.printStackTrace();
		}
		out.println(resultStr);
		out.flush();
		out.close();
		return null;
	}
	
	
	public ActionForward add(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String resultStr = "";
		try {
			LoginInforDto loginInfor = LoginInforUtil.getLoginInfor(request);
			
			if(loginInfor!=null){
				UserDto user = loginInfor.getUser();
				String formStr = request.getParameter("assessmentFormInfoPar");
				JSONObject quoObj = JSONObject.fromObject(formStr);
				TCustormerAssessment  assessment = (TCustormerAssessment)JSONObject.toBean(quoObj, TCustormerAssessment.class);
				Date date = new Date();
				assessment.setId(GenerateSerial.getUUID());
				assessment.setCreateTime(date);
				assessment.setLastEditTime(date);
				assessment.setCreateUserId(user.getId());
				assessment.setCreateUserName(user.getUserName());
				assessment.setLastUserId(user.getId());
				assessment.setLastUserName(user.getUserName());
				custormerAssessmentService.addCustormerAssessment(assessment);
				resultStr = "{success : true, msg : '添加客户评估信息成功'}";
			}else{
				resultStr = "{success : false, msg : '请重新登录'}";
			}
			
		} catch (Exception e) {
			resultStr = "{success : false, msg : '添加客户评估信息失败'}";
			e.printStackTrace();
		}
		out.println(resultStr);
		out.flush();
		out.close();
		return null;
	}
	
	public ActionForward update(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String resultStr = "";
		try {
			
			LoginInforDto loginInfor = LoginInforUtil.getLoginInfor(request);
			if(loginInfor!=null){
				UserDto user = loginInfor.getUser();
				String formStr = request.getParameter("assessmentFormInfoPar");
				JSONObject quoObj = JSONObject.fromObject(formStr);
				TCustormerAssessment  assessment = (TCustormerAssessment)JSONObject.toBean(quoObj, TCustormerAssessment.class);
				Date date = new Date();
				assessment.setLastEditTime(date);
				assessment.setLastUserId(user.getId());
				assessment.setLastUserId(user.getUserName());
				custormerAssessmentService.updateCustormerAssessment(assessment);
				resultStr = "{success : true, msg : '修改客户评估信息成功'}";
			}else{
				resultStr = "{success : false, msg : '请重新登录'}";
			}
		} catch (Exception e) {
			resultStr = "{success : true, msg : '修改客户评估信息失败'}";
			e.printStackTrace();
		}
		out.println(resultStr);
		out.flush();
		out.close();
		return null;
	}
	
	public ActionForward delete(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String resultStr = "";
		try {
			
			LoginInforDto loginInfor = LoginInforUtil.getLoginInfor(request);
			if(loginInfor!=null){
				String id = request.getParameter("id");
				
				custormerAssessmentService.deleteCustormerAssessment(id);
				resultStr = "{success : true, msg : '删除客户评估信息成功'}";
			}else{
				resultStr = "{success : false, msg : '请重新登录'}";
			}
		} catch (Exception e) {
			resultStr = "{success : true, msg : '删除客户评估信息失败'}";
			e.printStackTrace();
		}
		out.println(resultStr);
		out.flush();
		out.close();
		return null;
	}
	public ActionForward excel(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/vnd.ms-excel");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("custormerName", request.getParameter("custormerName"));
		PaginationSupport pageInfor = custormerAssessmentService.findCustormerAssessmentList(params, 0, 100000);
	    WebUtils.setDownloadableHeader(response,  "customer_assessment.xls");
	    Map<String, Object> businessData = new HashMap<String, Object>();
	    businessData.put("list", pageInfor.getItems());
	    String path = request.getRealPath("") + "\\upload\\templete\\customer_assessment.xls";
	    FileInputStream fs = new FileInputStream(path);
	    XLSTransformer tf = new XLSTransformer();
	    try {
	      Workbook workbook = tf.transformXLS(fs, businessData);
	      workbook.write(response.getOutputStream());
	    } catch (ParsePropertyException e) {
	      // TODO Auto-generated catch block
	      e.printStackTrace();
	    } catch (InvalidFormatException e) {
	      // TODO Auto-generated catch block
	      e.printStackTrace();
	    }
	    response.getOutputStream().flush();
	    return null;
	}
}
