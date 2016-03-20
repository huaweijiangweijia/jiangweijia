package com.tl.resource.business.arrival;

import org.apache.poi.hssf.usermodel.HSSFRow;

import com.tl.resource.dao.pojo.TProductArrivalInfor;

public class DirectListToExcel extends ArrListToExcelAbstract {

	@Override
	protected void createTableRow(TProductArrivalInfor quoDto, HSSFRow row) {
		setCellValue(row, 0, quoDto.getArrivalCode());
        setCellValue(row, 1, quoDto.getUserName());
        setCellValue(row, 2, quoDto.getEditDateString());
        setCellValue(row, 3, quoDto.getDeliveryDate());
        setCellValue(row, 4, quoDto.getSupplierName());
        setCellValue(row, 5, changeStatus(quoDto.getStatus()));
        setCellValue(row, 6, quoDto.getMemo());
	}

}
