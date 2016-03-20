package com.tl.resource.dao.pojo;

import java.text.SimpleDateFormat;

public class TProductionPlanInfor {
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	private String planId;
	
    private String productId;
    
    private String count;
    
    private String status = "1";//默认编制中
    
    private String category;
    
    private String bacthNo;
    
    private int startIndex;
    
    private int pageSize;
    
    private int totalCount;

	public String getPlanId() {
		return planId;
	}

	public void setPlanId(String planId) {
		this.planId = planId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
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

	public static SimpleDateFormat getDateFormat() {
		return dateFormat;
	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
    
    
}