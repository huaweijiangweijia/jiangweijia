package com.tl.resource.business.dto;

import java.util.Date;
import java.util.List;

public class ReservePlanMainInforDto {
	private String contractCode;
	private String contractId;
	private String orderCode;
	private String orderInforId;
	private Date editDate;
	private String editDateString;
    private String userName;
    private String userId;
    private List<ReservePlanDetailDto> reservePlanDetail;
	public String getContractCode() {
		return contractCode;
	}

	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}

	public String getContractId() {
		return contractId;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId;
	}

	public String getOrderCode() {
		return orderCode;
	}

	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}

	public String getOrderInforId() {
		return orderInforId;
	}

	public void setOrderInforId(String orderInforId) {
		this.orderInforId = orderInforId;
	}

	

	public Date getEditDate() {
		return editDate;
	}

	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public List<ReservePlanDetailDto> getReservePlanDetail() {
		return reservePlanDetail;
	}

	public void setReservePlanDetail(List<ReservePlanDetailDto> reservePlanDetail) {
		this.reservePlanDetail = reservePlanDetail;
	}

	public String getEditDateString() {
		return editDateString;
	}

	public void setEditDateString(String editDateString) {
		this.editDateString = editDateString;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}
