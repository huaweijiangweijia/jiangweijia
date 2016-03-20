package com.tl.resource.business.contract;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.tl.common.util.PaginationSupport;
import com.tl.common.util.WebUtils;
import com.tl.resource.business.dto.ContractProductDetailDto;
import com.tl.resource.dao.TContractInforDAO;
import com.tl.resource.dao.TContractProductDetailDAO;

public class ContractListOutExcelImp implements ContractListOutExcel {
	private TContractInforDAO contractInforDAO;
	private TContractProductDetailDAO contractProductDetailDAO; 
	private static final int sheetMaxRowCount = 60000;
	private static final String[] headers = {"合同编号","客户名称","合同状态","我方负责人","最终金额","备注","合同附件","编制人","编制时间","名称","牌号","数量","计量单位","单价","毛利率","净价","金额","含税净价","含税金额","品牌","交货期限","采购数量","已到数量","已交数量","含税总金额"};
	
	@Override
	public void exportExcel(Map<String,Object> mparams, HttpServletResponse response,
			HttpServletRequest request) throws IOException {
		PaginationSupport page = contractInforDAO.findContractViewPanelInfors(mparams,0,Integer.MAX_VALUE);
		List list = page.getItems();
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet();
		HSSFRow r = sheet.createRow(0);
		for (int i = 0; i < headers.length; i++) {
			HSSFCell cell = r.createCell(i);
			cell.setCellValue(headers[i]);
		}
		int rowCount = 1;
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			com.tl.resource.business.dto.ContractViewPanelDto c = (com.tl.resource.business.dto.ContractViewPanelDto) iterator.next();
			if(rowCount > sheetMaxRowCount){
				rowCount = 1;
				sheet = workbook.createSheet();
			}
			HSSFRow row = sheet.createRow(rowCount);
			HSSFCell cell = row.createCell(0);
			cell.setCellValue(c.getContractCode());
		
			cell = row.createCell(1);
			cell.setCellValue(c.getCustomerName());
				
		    cell = row.createCell(2);
			cell.setCellValue(getStatusText(c.getStatus()));
				
			cell = row.createCell(3);
			cell.setCellValue(c.getOwnContactPerson());
				
			cell = row.createCell(4);
			cell.setCellValue(c.getFinalMoney().doubleValue());
				
			cell = row.createCell(5);
			cell.setCellValue(c.getMemo());
				
			cell = row.createCell(6);
			cell.setCellValue(c.getFileCount() > 0 ? "已传附件" : "未传附件");
				
			cell = row.createCell(7);
			cell.setCellValue(c.getUserName());
				
			cell = row.createCell(8);
			cell.setCellValue(c.getEditDateString());
			
			List<ContractProductDetailDto> infor = contractProductDetailDAO.getProductDetailConId(c.getId());
			int rowCount2 = 1;
			double countMoney = 0.0;
			for (ContractProductDetailDto contractProductDetailDto : infor) {
				HSSFRow row2 = row;
				if(rowCount2 > 1) {
					row2 = sheet.createRow(rowCount);
				}
				/*HSSFCell cell2 = row2.createCell(9);
				cell2.setCellValue(contractProductDetailDto.getProductCode());//项目编号
				cell2 = row2.createCell(10);
				cell2.setCellValue(contractProductDetailDto.getSerialNumber());//序号*/				
				HSSFCell cell2 = row2.createCell(9);
				cell2.setCellValue(contractProductDetailDto.getProductName());//名称
				cell2 = row2.createCell(10);
				cell2.setCellValue(contractProductDetailDto.getBrandCode());//工具牌号
				cell2 = row2.createCell(11);
				cell2.setCellValue(contractProductDetailDto.getAmount().doubleValue());//数量
				cell2 = row2.createCell(12);
				cell2.setCellValue(contractProductDetailDto.getProductUnit());//计量单位
				cell2 = row2.createCell(13);
				cell2.setCellValue(contractProductDetailDto.getPrice().doubleValue());//单价
				cell2 = row2.createCell(14);
				cell2.setCellValue(contractProductDetailDto.getRebate().doubleValue());//毛利率
				cell2 = row2.createCell(15);
				cell2.setCellValue(contractProductDetailDto.getNetPrice().doubleValue());//净价
				cell2 = row2.createCell(16);
				cell2.setCellValue(contractProductDetailDto.getMoney().doubleValue());//金额
				cell2 = row2.createCell(17);
				cell2.setCellValue(contractProductDetailDto.getTaxNetPrice().doubleValue());//含税净价
				cell2 = row2.createCell(18);
				cell2.setCellValue(contractProductDetailDto.getTaxMoney().doubleValue());//含税金额
				cell2 = row2.createCell(19);
				cell2.setCellValue(contractProductDetailDto.getProductBrand());//品牌
				cell2 = row2.createCell(20);
				cell2.setCellValue(contractProductDetailDto.getDeliveryDate());//交货期限
				cell2 = row2.createCell(21);
				cell2.setCellValue(contractProductDetailDto.getOrderAmount().doubleValue());//采购数量
				cell2 = row2.createCell(22);
				cell2.setCellValue(contractProductDetailDto.getArrivalAmount().doubleValue());//已到数量
				cell2 = row2.createCell(23);
				cell2.setCellValue(contractProductDetailDto.getDeliveryAmount().doubleValue());//已交数量
				countMoney = countMoney + contractProductDetailDto.getTaxMoney().doubleValue();
				/*System.out.println("项目编号"+contractProductDetailDto.getProductCode());
				System.out.println("序号"+contractProductDetailDto.getSerialNumber());
				System.out.println("工具牌号"+contractProductDetailDto.getBrandCode());
				System.out.println("名称"+contractProductDetailDto.getProductName());
				System.out.println("数量"+contractProductDetailDto.getAmount().doubleValue());
				System.out.println("计量单位"+contractProductDetailDto.getProductUnit());
				System.out.println("单价"+contractProductDetailDto.getPrice().doubleValue());
				System.out.println("毛利率"+contractProductDetailDto.getRebate().doubleValue());
				System.out.println("净价"+contractProductDetailDto.getNetPrice().doubleValue());
				System.out.println("金额"+contractProductDetailDto.getMoney().doubleValue());
				System.out.println("含税净价"+contractProductDetailDto.getTaxNetPrice().doubleValue());
				System.out.println("含税金额"+contractProductDetailDto.getTaxMoney().doubleValue());
				System.out.println("品牌"+contractProductDetailDto.getProductBrand());
				System.out.println("交货期限"+contractProductDetailDto.getDeliveryDate());
				System.out.println("采购数量"+contractProductDetailDto.getOrderAmount());
				System.out.println("已到数量"+contractProductDetailDto.getArrivalAmount());
				System.out.println("已交数量"+contractProductDetailDto.getDeliveryAmount());
				System.out.println("---------------------------------------------------------------------");*/
				rowCount2++;
				rowCount++;
			}
			cell = row.createCell(24);
			cell.setCellValue(countMoney);
		}
		
		response.setContentType("application/vnd.ms-excel");
		WebUtils.setDownloadableHeader(response, "contractList.xls");
		workbook.write(response.getOutputStream());
		response.getOutputStream().flush();
	}
	private String getStatusText(Integer status) {
		String rt = "";
		switch (status) {
		case 0:
			rt = "编制";
			break;
		case 1:
			rt = "待审批";
			break;
	    case 2:
			rt = "审批通过";
			break;
		case 3:
			rt = "审批退回";
			break;
		case 4:
			rt = "执行";
			break;
		case 5:
			rt = "终结";
			break;
		case -1:
			rt = "作废";
			break;
		default:
			break;
		}
		return rt;
	}
	public TContractInforDAO getContractInforDAO() {
		return contractInforDAO;
	}
	public void setContractInforDAO(TContractInforDAO contractInforDAO) {
		this.contractInforDAO = contractInforDAO;
	}
	public TContractProductDetailDAO getContractProductDetailDAO() {
		return contractProductDetailDAO;
	}
	public void setContractProductDetailDAO(
			TContractProductDetailDAO contractProductDetailDAO) {
		this.contractProductDetailDAO = contractProductDetailDAO;
	}
}
