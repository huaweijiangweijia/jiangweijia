package com.tl.resource.business.quotation.generalquo;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.tl.common.smartupload.Constant;
import com.tl.resource.business.dto.QuotationDto;

/**
 * 报价单列表导出
 * @author ftl
 *
 */
public class QuoListToExcel extends QuoExportExcelAbstract {
	@Override
    public void createTableRow(QuotationDto quoDto,HSSFRow row)   
    {   
    	setCellValue(row, 0, quoDto.getQuotationCode());//单据编号
		setCellValue(row, 1, quoDto.getCustomerName());//客户名称
        setCellValue(row, 2, changeStatus(quoDto.getStatus()));//状态
        setCellValue(row, 3, changeLevel(quoDto.getUrgentLevel()));//紧急程度
        setCellValue(row, 4, quoDto.getContractCode());//合同编号
        setCellValue(row, 5, quoDto.getQuotationDate());//报价时期
        setCellValue(row, 6, quoDto.getUserName());//我方负责人
        setCellValue(row, 7, quoDto.getCurrencyName());//币别
        setCellValue(row, 8, quoDto.getFinalMoney());//最终金额
        setCellValue(row, 9, quoDto.getEditorName());//编制人
        setCellValue(row, 10, quoDto.getEditTimeStr());//编制时间
        setCellValue(row, 11, quoDto.getMemo());//备注
    }
}
