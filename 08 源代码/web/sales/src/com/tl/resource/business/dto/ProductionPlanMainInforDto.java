package com.tl.resource.business.dto;

public class ProductionPlanMainInforDto {
	private String planCode;
	private String productCode;
	private String count;
	private String status;
	private String category;
	private String bacthNo;
	private int totalCount;
	
	public String getPlanCode() {
		return planCode;
	}
	public void setPlanCode(String planCode) {
		this.planCode = planCode;
	}
	public String getProductCode() {
		return productCode;
	}
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getBacthNo() {
		return bacthNo;
	}
	public void setBacthNo(String bacthNo) {
		this.bacthNo = bacthNo;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
