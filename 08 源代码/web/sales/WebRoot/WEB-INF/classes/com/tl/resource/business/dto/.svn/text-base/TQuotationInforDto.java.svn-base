package com.tl.resource.business.dto;

import com.tl.common.SystemConstants;
import com.tl.resource.dao.pojo.TQuotationInfor;


public class TQuotationInforDto extends TQuotationInfor{
	
	private int slaveFile;
	/**
	 * 试刀申请
	 */
	private int testRequest;
	/**
	 * 试刀报告
	 */
	private int testReport;
	
	private String contractCode;
	private String editTimeStr;
	
	public int getSlaveFile() {
		return slaveFile;
	}
	public void setSlaveFile(int slaveFile) {
		this.slaveFile = slaveFile;
	}
	public int getTestRequest() {
		return testRequest;
	}
	public void setTestRequest(int testRequest) {
		this.testRequest = testRequest;
	}
	public int getTestReport() {
		return testReport;
	}
	public void setTestReport(int testReport) {
		this.testReport = testReport;
	}
	public String getContractCode() {
		return contractCode;
	}
	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}
	public String getEditTimeStr() {
		if(super.getEditDate() != null) {
			editTimeStr = SystemConstants.dfYYYYMMDDHHMM.format(super.getEditDate());
        }
		return editTimeStr;
	}
}
