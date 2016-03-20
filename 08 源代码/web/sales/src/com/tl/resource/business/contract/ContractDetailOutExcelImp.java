package com.tl.resource.business.contract;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.tl.common.util.WebUtils;
import com.tl.resource.business.dto.ContractInforDto;
import com.tl.resource.business.dto.ContractProductDetailDto;
import com.tl.resource.business.dto.ContractProductSortDto;

public class ContractDetailOutExcelImp implements ContractDetailOutExcel{
    private ContractEditService contractEditService;
	@Override
	public void exportExcel(String conId, HttpServletResponse response,
			HttpServletRequest request) throws IOException {
		HSSFWorkbook workbook = new HSSFWorkbook();
		ContractInforDto infor = contractEditService.getContractInforById(conId);
		List<ContractProductSortDto> sorts = infor.getContractProductSorts();
		for (Iterator iterator = sorts.iterator(); iterator.hasNext();) {
			ContractProductSortDto contractProductSortDto = (ContractProductSortDto) iterator.next();
			HSSFSheet sheet = workbook.createSheet(contractProductSortDto.getName());
			HSSFRow r = sheet.createRow(0);
			String [] titles = {"项目编号","序号","工具牌号","名称","数量","计量单位","单价",
					"毛利率","净价","金额","含税净价","含税金额","品牌","交货期限","采购数量","已到数量","已交数量"};
		    for (int i = 0; i < titles.length; i++) {
		    	HSSFCell c = r.createCell(i);
		    	c.setCellValue(titles[i]);
			}
			
		    int rownum = 1;
			List<ContractProductDetailDto> list = contractProductSortDto.getConProductDetail();
			for (Iterator iterator2 = list.iterator(); iterator2.hasNext();) {
				ContractProductDetailDto contractProductDetailDto = (ContractProductDetailDto) iterator2.next();
				r = sheet.createRow(rownum++ );
				HSSFCell c = r.createCell(0);
				c.setCellValue(contractProductDetailDto.getProjectCode());
				c = r.createCell(1);
				c.setCellValue(contractProductDetailDto.getSerialNumber());
				c = r.createCell(2);
				c.setCellValue(contractProductDetailDto.getBrandCode());
				c = r.createCell(3);
				c.setCellValue(contractProductDetailDto.getProductName());
				c = r.createCell(4);
				c.setCellValue(contractProductDetailDto.getAmount().doubleValue());
				c = r.createCell(5);
				c.setCellValue(contractProductDetailDto.getProductUnit());
				c = r.createCell(6);
				c.setCellValue(contractProductDetailDto.getPrice().doubleValue());
				c = r.createCell(7);
				c.setCellValue(contractProductDetailDto.getRebate().doubleValue());
				c = r.createCell(8);
				c.setCellValue(contractProductDetailDto.getNetPrice().doubleValue());
				c = r.createCell(9);
				c.setCellValue(contractProductDetailDto.getMoney().doubleValue());
				c = r.createCell(10);
				c.setCellValue(contractProductDetailDto.getTaxNetPrice().doubleValue());
				c = r.createCell(11);
				c.setCellValue(contractProductDetailDto.getTaxMoney().doubleValue());
				c = r.createCell(12);
				c.setCellValue(contractProductDetailDto.getProductBrand());
				c = r.createCell(13);
				c.setCellValue(contractProductDetailDto.getDeliveryDate());
				c = r.createCell(14);
				c.setCellValue(contractProductDetailDto.getOrderAmount().doubleValue());
				c = r.createCell(15);
				c.setCellValue(contractProductDetailDto.getArrivalAmount().doubleValue());
				c = r.createCell(16);
				c.setCellValue(contractProductDetailDto.getDeliveryAmount().doubleValue());
			}
		}
		response.setContentType("application/vnd.ms-excel");
		WebUtils.setDownloadableHeader(response, infor.getContractCode() + ".xls");
		workbook.write(response.getOutputStream());
		response.getOutputStream().flush();
	}
	public ContractEditService getContractEditService() {
		return contractEditService;
	}
	public void setContractEditService(ContractEditService contractEditService) {
		this.contractEditService = contractEditService;
	}

}
