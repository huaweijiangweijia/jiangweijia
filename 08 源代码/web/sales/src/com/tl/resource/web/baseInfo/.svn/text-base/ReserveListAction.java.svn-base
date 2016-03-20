/**
 * 
 */
package com.tl.resource.web.baseInfo;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.XLSTransformer;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.tl.common.util.RegexUtils;
import com.tl.common.util.WebUtils;
import com.tl.resource.business.baseInfo.BaseInfoService;
import com.tl.resource.dao.pojo.TReserveInfor;

/**
 * @author xtaia
 * 库存信息
 */
public class ReserveListAction extends Action {

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
		
		if("export".equals(request.getParameter("op"))){//某些特定版本增加了导出库存列表操作。 在这里加一个参数来判断
			export(request,response);
			return null;
		}
		
		Map<String, Object> parmMap = new HashMap<String, Object>();
		
		String searchStr = request.getParameter("searchStr");
		if(searchStr != null && !"".equals(searchStr)){
			JSONObject  searchJson = JSONObject.fromObject(searchStr);
			if(searchJson.has("productName"))parmMap.put("productName", searchJson.getString("productName"));
			if(searchJson.has("productCode"))parmMap.put("productCode", searchJson.getString("productCode"));
			if(searchJson.has("productSort"))parmMap.put("productSort", searchJson.getString("sortCode"));
			if(searchJson.has("brandCode"))parmMap.put("brandCode", searchJson.getString("brandCode"));
			if(searchJson.has("productBrand"))parmMap.put("productBrand", searchJson.getString("productBrand"));
			if(searchJson.has("productSource"))parmMap.put("productSource", searchJson.getString("productSource"));
		}
		
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
		
		parmMap.put("start", Integer.parseInt(start));
		parmMap.put("limit", Integer.parseInt(limit));
		
		int total = baseInfoService.getReserveTotal(parmMap);
		DecimalFormat  df  =  new  DecimalFormat("0.00");
		double totalPrice = baseInfoService.getReserveTotalPrice(parmMap);
		
		String sort = request.getParameter("sort");
		if(sort != null){
			parmMap.put("sort", RegexUtils.toDataBaseColName(sort));
			parmMap.put("dir", request.getParameter("dir"));
		}
		
		
		
		List<com.tl.resource.business.dto.ReserveInforDto> list = baseInfoService.getReserveByPage(parmMap);
		
		String jsonStr = JSONArray.fromObject(list).toString();
		String resultStr = "{totalProperty : " + total + ", reserveList : "  + jsonStr + ",totalPrice:"+df.format(totalPrice)+"}";
		
		System.out.println(resultStr);
		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();

		return null;
	}

	/**
	 * 导出操作
	 * @param request
	 */
	private void export(HttpServletRequest request ,HttpServletResponse response) {
		 // 输出Excel文件.
		try {
			String path = request.getSession().getServletContext().getRealPath(java.io.File.separator) + "upload/templete/reserve_list_Templete.xls";
			FileInputStream fs = new FileInputStream(path);
		    response.setContentType("application/vnd.ms-excel");
		    WebUtils.setDownloadableHeader(response,  "reserve.xls");
		    Map<String, Object> parmMap = new HashMap<String, Object>();
			String searchStr = request.getParameter("searchStr");
			if(searchStr != null && !"".equals(searchStr)){
				JSONObject  searchJson = JSONObject.fromObject(searchStr);
				if(searchJson.has("productName"))parmMap.put("productName", searchJson.getString("productName"));
				if(searchJson.has("productCode"))parmMap.put("productCode", searchJson.getString("productCode"));
				if(searchJson.has("productSort"))parmMap.put("productSort", searchJson.getString("sortCode"));
				if(searchJson.has("brandCode"))parmMap.put("brandCode", searchJson.getString("brandCode"));
				if(searchJson.has("productBrand"))parmMap.put("productBrand", searchJson.getString("productBrand"));
				if(searchJson.has("productSource"))parmMap.put("productSource", searchJson.getString("productSource"));
			}
			parmMap.put("start", 0);
			parmMap.put("limit", 100000);
			List<com.tl.resource.business.dto.ReserveInforDto> list = baseInfoService.getReserveByPage(parmMap);
			Map<String, Object> businessData = new HashMap<String, Object>();
		    businessData.put("list", list);
		    XLSTransformer tf = new XLSTransformer();
	    
	      Workbook workbook = tf.transformXLS(fs, businessData);
	      workbook.write(response.getOutputStream());
	      response.getOutputStream().flush();
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	}

}
