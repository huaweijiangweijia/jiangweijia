package com.tl.resource.dao.pojo;

public class WorkProcedure {
	private int id;
	private String productId;
	private String procedureIdx;
	private String procedureName;
	private String procedureDesc;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getProcedureIdx() {
		return procedureIdx;
	}

	public void setProcedureIdx(String procedureIdx) {
		this.procedureIdx = procedureIdx;
	}

	public String getProcedureName() {
		return procedureName;
	}

	public void setProcedureName(String procedureName) {
		this.procedureName = procedureName;
	}

	public String getProcedureDesc() {
		return procedureDesc;
	}

	public void setProcedureDesc(String procedureDesc) {
		this.procedureDesc = procedureDesc;
	}

}
