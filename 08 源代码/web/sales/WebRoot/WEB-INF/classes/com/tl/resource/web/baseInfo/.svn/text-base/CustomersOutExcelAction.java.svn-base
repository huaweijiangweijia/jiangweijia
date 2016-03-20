/**
 * 
 */
package com.tl.resource.web.baseInfo;

import java.io.FileInputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.common.util.RegexUtils;
import com.tl.common.util.WebUtils;
import com.tl.resource.business.baseInfo.BaseInfoService;
import com.tl.resource.dao.pojo.TCustomersInfor;
import com.tl.resource.dao.pojo.TOrderInfor;

/**
 * @author xtaia 客户信息列表
 */
public class CustomersOutExcelAction extends Action {

	private BaseInfoService baseInfoService;

	public BaseInfoService getBaseInfoService() {
		return baseInfoService;
	}

	public void setBaseInfoService(BaseInfoService baseInfoService) {
		this.baseInfoService = baseInfoService;
	}

	private HSSFSheet dataSheet;

	private HSSFWorkbook workbook;

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");

		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("start", 0);
		parmMap.put("limit", 10000);
		if(request.getParameter("customerName")!=null &&!"".equals(request.getParameter("customerName"))){
			parmMap.put("customerName", request.getParameter("customerName"));
		}
		if(request.getParameter("customerCode")!=null &&!"".equals(request.getParameter("customerCode"))){
			parmMap.put("customerCode", request.getParameter("customerCode"));
		}
		if(request.getParameter("ownContactPerson")!=null &&!"".equals(request.getParameter("ownContactPerson"))){
			parmMap.put("ownContactPerson", request.getParameter("ownContactPerson"));
		}
		System.out.println(parmMap);
		List<TCustomersInfor> list = baseInfoService.getCustomersList(parmMap);
		String path = "\\upload\\templete\\customer_list_templete.xls";
		;

		FileInputStream fs = new FileInputStream(request.getRealPath("/")
				+ path);
		workbook = new HSSFWorkbook(fs);
		dataSheet = workbook.getSheetAt(0);
		writeCustomerList(dataSheet, list);
		response.setContentType("text/html;charset=utf-8");
		response.setContentType("application/vnd.ms-excel");
		WebUtils.setDownloadableHeader(response, java.net.URLEncoder.encode(
				"客户信息" + ".xls", "UTF-8"));
		workbook.write(response.getOutputStream());
		response.getOutputStream().flush();
		
		return null;
	}

	private void writeCustomerList(HSSFSheet dataSheet,
			List<TCustomersInfor> list) {
		int index = 0;
		for (int j = 0; j < list.size(); j++, index = j) {
			TCustomersInfor infor = list.get(j);
			HSSFRow detailRow = dataSheet.createRow((1 + j));
			String[] inforHeader = {
				infor.getCustomerName(),
				infor.getCustomerCode(),
				infor.getCustomerShortName(),
				infor.getDegreeCode(),
				infor.getLockStatus()==0?"锁定":"正常",
				infor.getClosingAccountMode(),
				infor.getContactPersonFirst(),
				infor.getPhoneFirst(),
				infor.getFaxFirst(),
				infor.getContactPersonSec(),
				infor.getPhoneSec(),
				infor.getFaxSec(),
				infor.getOwnContactPerson(),
				infor.getContractAddress(),
				infor.getBank(),
				infor.getAccountNumber(),
				infor.getTaxCode(),
				infor.getEmail(),
				infor.getMemo(),
					
			};
			for (int i = 0; i < inforHeader.length; i++) {
				HSSFCell headerCell = detailRow.createCell(i);
				headerCell.setCellValue(inforHeader[i]);
			}

		}

	}
	

}
