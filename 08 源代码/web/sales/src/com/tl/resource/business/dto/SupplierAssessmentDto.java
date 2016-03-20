package com.tl.resource.business.dto;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 供应商评估信息
 * @author dd
 *
 */
public class SupplierAssessmentDto{

	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	private String id ;
	
	private String supplierId;
	
	private String supplierName;
	
	private String brandPower;
	
	private BigDecimal marketShare;
	
	private String product;
	 
	private Integer empNumber; 
	
	private BigDecimal annualSale;
	
	/**
	 * 产品竞争力
	 */
	private String competitive;
	
	/**
	 * 市场均价差价
	 */
	private BigDecimal priceDifference;
	
	/**
	 * 合格率
	 */
	private BigDecimal qualfiedRate;
	
	/**
	 * 退货率
	 */
	private BigDecimal returnRate;
	
	/**
	 * 交货准时率
	 */
	private BigDecimal deliveryPunctualityRate;
	
	/**
	 * 准时交货良率
	 */
	private BigDecimal deliveryGoodRate;
	
	/**
	 * 指定区域
	 */
	private String areas;
	
	/**
	 * 独家
	 */
	private String sole;
	
	/**
	 * 报备
	 */
	private String report;
	
	/**
	 * 支持力度
	 */
	private String support;
	
	/**
	 * 服务 or 制造流程
	 */
	private String quality;
	
	/**
	 * 备库金额
	 */
	private BigDecimal amount;
	
	/**
	 * 备库金额 与 月销售额的比例
	 */
	private BigDecimal ratio ;
	
	/**
	 * 付款账期
	 */
	private Integer payPeriod;
	
	
	/**
	 * 评分
	 */
	private BigDecimal score;
	
	/**
	 * 创建时间
	 */
	private Date createTime;
	
	private String createTimeString;
	
	
	/**
	 * 最后修改时间
	 */
	private Date lastEditTime;
	
	private String lastEditTimeString;
	
	/**
	 * 创建人
	 */
	private String createUserId;
	
	private String createUserName;
	/**
	 * 最后修改时间
	 */
	private String lastUserId;
	
	private String lastUserName;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getBrandPower() {
		return brandPower;
	}

	public void setBrandPower(String brandPower) {
		this.brandPower = brandPower;
	}

	public BigDecimal getMarketShare() {
		return marketShare;
	}

	public void setMarketShare(BigDecimal marketShare) {
		this.marketShare = marketShare;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public Integer getEmpNumber() {
		return empNumber;
	}

	public void setEmpNumber(Integer empNumber) {
		this.empNumber = empNumber;
	}

	public String getCompetitive() {
		return competitive;
	}

	public String getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(String supplierId) {
		this.supplierId = supplierId;
	}

	public void setCompetitive(String competitive) {
		this.competitive = competitive;
	}

	public BigDecimal getPriceDifference() {
		return priceDifference;
	}

	public void setPriceDifference(BigDecimal priceDifference) {
		this.priceDifference = priceDifference;
	}

	public BigDecimal getQualfiedRate() {
		return qualfiedRate;
	}

	public void setQualfiedRate(BigDecimal qualfiedRate) {
		this.qualfiedRate = qualfiedRate;
	}

	public BigDecimal getReturnRate() {
		return returnRate;
	}

	public void setReturnRate(BigDecimal returnRate) {
		this.returnRate = returnRate;
	}

	public BigDecimal getDeliveryPunctualityRate() {
		return deliveryPunctualityRate;
	}

	public void setDeliveryPunctualityRate(BigDecimal deliveryPunctualityRate) {
		this.deliveryPunctualityRate = deliveryPunctualityRate;
	}

	public BigDecimal getDeliveryGoodRate() {
		return deliveryGoodRate;
	}

	public void setDeliveryGoodRate(BigDecimal deliveryGoodRate) {
		this.deliveryGoodRate = deliveryGoodRate;
	}

	public String getAreas() {
		return areas;
	}

	public void setAreas(String areas) {
		this.areas = areas;
	}

	public String getSole() {
		return sole;
	}

	public void setSole(String sole) {
		this.sole = sole;
	}

	public String getReport() {
		return report;
	}

	public void setReport(String report) {
		this.report = report;
	}

	public String getSupport() {
		return support;
	}

	public void setSupport(String support) {
		this.support = support;
	}

	public String getQuality() {
		return quality;
	}

	public void setQuality(String quality) {
		this.quality = quality;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Integer getPayPeriod() {
		return payPeriod;
	}

	public void setPayPeriod(Integer payPeriod) {
		this.payPeriod = payPeriod;
	}

	public BigDecimal getScore() {
		return score;
	}

	public void setScore(BigDecimal score) {
		this.score = score;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		
		if(createTime!=null){
			this.createTimeString = sdf.format(createTime);
		}
		this.createTime = createTime;
	}

	public Date getLastEditTime() {
		return lastEditTime;
	}

	public void setLastEditTime(Date lastEditTime) {
		if(lastEditTime!=null){
			this.lastEditTimeString = sdf.format(lastEditTime);
		}
		this.lastEditTime = lastEditTime;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getLastUserId() {
		return lastUserId;
	}

	public void setLastUserId(String lastUserId) {
		this.lastUserId = lastUserId;
	}

	public BigDecimal getAnnualSale() {
		return annualSale;
	}

	public void setAnnualSale(BigDecimal annualSale) {
		this.annualSale = annualSale;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public String getLastUserName() {
		return lastUserName;
	}

	public void setLastUserName(String lastUserName) {
		this.lastUserName = lastUserName;
	}

	public BigDecimal getRatio() {
		return ratio;
	}

	public void setRatio(BigDecimal ratio) {
		this.ratio = ratio;
	}

	public String getCreateTimeString() {
		return createTimeString;
	}

	public void setCreateTimeString(String createTimeString) {
		this.createTimeString = createTimeString;
	}

	public String getLastEditTimeString() {
		return lastEditTimeString;
	}

	public void setLastEditTimeString(String lastEditTimeString) {
		this.lastEditTimeString = lastEditTimeString;
	}
	
	
}
