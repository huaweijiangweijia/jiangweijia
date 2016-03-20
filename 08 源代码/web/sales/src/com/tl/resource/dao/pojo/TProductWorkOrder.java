package com.tl.resource.dao.pojo;

public class TProductWorkOrder {
	private int id;
	private String planId;
	private int count;
	private String category;
	private String status;
	private String parentWorkOrderId;
	private String productId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPlanId() {
		return planId;
	}

	public void setPlanId(String planId) {
		this.planId = planId;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getParentWorkOrderId() {
		return parentWorkOrderId;
	}

	public void setParentWorkOrderId(String parentWorkOrderId) {
		this.parentWorkOrderId = parentWorkOrderId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

}
