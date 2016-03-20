package com.tl.resource.web.contract;

import java.io.FileInputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.XLSTransformer;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.Region;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.common.util.LoginInforUtil;
import com.tl.common.util.PaginationSupport;
import com.tl.common.util.WebUtils;
import com.tl.resource.business.contractOrder.ContractOrderService;
import com.tl.resource.business.dto.InvoiceDetailDto;
import com.tl.resource.business.dto.InvoiceInforDto;
import com.tl.resource.business.dto.LoginInforDto;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.business.invoice.InvoiceService;
import com.tl.resource.dao.pojo.TCustomersInfor;
import com.tl.resource.dao.pojo.TInvoiceInfo;

public class ContractInvoiceAction extends DispatchAction {
	private InvoiceService invoiceService;
	private static final int sheetMaxRowCount = 60000;
	private static final String[] headers = {"开票日期","销售合同号","已开发票明细（不含税）","","","","采购合同号","对应采购成本明细（不含税）","","","","实际开票信息"};
	public ActionForward list(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String startIndex = request.getParameter("start");
		String pageSize = request.getParameter("limit");
		if (startIndex == null) {
			startIndex = "0";
		}
		if (pageSize == null) {
			pageSize = "20";
		}
		Map<String, String> mparams = new HashMap<String, String>();
		mparams.put("contractInforId", request.getParameter("contractInforId"));
		mparams.put("invoiceType", "0");

		List<TInvoiceInfo> list = invoiceService.getInvoiceList(mparams,
				Integer.valueOf(startIndex), Integer.valueOf(pageSize));
		request.setAttribute("list", list);

		return mapping.findForward("success");
	}

	public ActionForward excel(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/vnd.ms-excel;charset=UTF-8");
		response.setHeader("Content-Disposition",
				"attachment; filename=iinvoice.xls");
		String startIndex = request.getParameter("start");
		String pageSize = request.getParameter("limit");
		if (startIndex == null) {
			startIndex = "0";
		}
		if (pageSize == null) {
			pageSize = "20";
		}
		Map<String, String> mparams = new HashMap<String, String>();
		mparams.put("contractInforId", request.getParameter("contractInforId"));
		mparams.put("invoiceType", "0");

		List<TInvoiceInfo> list = invoiceService.getInvoiceList(mparams,Integer.valueOf(startIndex), Integer.valueOf(pageSize));

		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet();
		HSSFRow r = sheet.createRow(0);
		for (int i = 0; i < headers.length; i++) {
			HSSFCell cell = r.createCell(i);
			cell.setCellValue(headers[i]);
		}
		HSSFRow r2 = sheet.createRow(1);
		for (int i = 0; i < headers.length; i++) {
			HSSFCell cell = r2.createCell(i);
		}
		HSSFCell cell = r2.createCell(2);
		cell.setCellValue("型号");
		cell = r2.createCell(3);
		cell.setCellValue("数量");
		cell = r2.createCell(4);
		cell.setCellValue("单价(不含税)");
		cell = r2.createCell(5);
		cell.setCellValue("合计");
		cell = r2.createCell(7);
		cell.setCellValue("型号");
		cell = r2.createCell(8);
		cell.setCellValue("数量");
		cell = r2.createCell(9);
		cell.setCellValue("单价(不含税)");
		cell = r2.createCell(10);
		cell.setCellValue("合计");
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 0));
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 1, 1));
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 5));
		sheet.addMergedRegion(new CellRangeAddress(0, 1, 6, 6));
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 10));
		
		int rowCount = 2;
		for (Iterator<TInvoiceInfo> iterator = list.iterator(); iterator.hasNext();) {
			r = sheet.createRow(rowCount);
			TInvoiceInfo t = iterator.next();
			
		}
		response.setContentType("application/vnd.ms-excel");
		WebUtils.setDownloadableHeader(response, "contractList.xls");
		workbook.write(response.getOutputStream());
		response.getOutputStream().flush();
		return  null;
	}

	public InvoiceService getInvoiceService() {
		return invoiceService;
	}

	public void setInvoiceService(InvoiceService invoiceService) {
		this.invoiceService = invoiceService;
	}

}
