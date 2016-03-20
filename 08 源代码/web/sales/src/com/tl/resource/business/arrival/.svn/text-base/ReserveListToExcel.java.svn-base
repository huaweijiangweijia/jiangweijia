package com.tl.resource.business.arrival;

import org.apache.poi.hssf.usermodel.HSSFRow;

import com.tl.resource.dao.pojo.TProductArrivalInfor;

/**
 * 预订入库列表导出
 * @author ftl
 *
 */
public class ReserveListToExcel extends ArrListToExcelAbstract {

	@Override
	protected void createTableRow(TProductArrivalInfor quoDto, HSSFRow row) {
		setCellValue(row, 0, quoDto.getArrivalCode());
        setCellValue(row, 1, quoDto.getUserName());
        setCellValue(row, 2, quoDto.getEditDateString());
        setCellValue(row, 3, quoDto.getDeliveryDate());
        setCellValue(row, 4, quoDto.getOrderCode());
        setCellValue(row, 5, quoDto.getSupplierName());
        setCellValue(row, 6, changeStatus(quoDto.getStatus()));
        setCellValue(row, 7, quoDto.getCustomerName());
        setCellValue(row, 8, quoDto.getMemo());
	}

}
