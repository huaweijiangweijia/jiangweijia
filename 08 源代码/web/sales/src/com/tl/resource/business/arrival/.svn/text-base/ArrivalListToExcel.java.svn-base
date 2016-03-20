package com.tl.resource.business.arrival;

import org.apache.poi.hssf.usermodel.HSSFRow;
import com.tl.resource.dao.pojo.TProductArrivalInfor;

public class ArrivalListToExcel extends ArrListToExcelAbstract {
    /**  
     * 创建行  
     * @param cells  
     * @param rowIndex  
     */
	@Override
    public void createTableRow(TProductArrivalInfor quoDto,HSSFRow row)   
    {   
        setCellValue(row, 0, quoDto.getArrivalCode());
        setCellValue(row, 1, quoDto.getUserName());
        setCellValue(row, 2, quoDto.getEditDateString());
        setCellValue(row, 3, quoDto.getDeliveryDate());
        setCellValue(row, 4, quoDto.getOrderCode());
        setCellValue(row, 5, quoDto.getSupplierName());
        setCellValue(row, 6, quoDto.getContractCode());
        setCellValue(row, 7, changeStatus(quoDto.getStatus()));
        setCellValue(row, 8, quoDto.getCustomerName());
        setCellValue(row, 9, quoDto.getMemo());
    }
	
}
