package com.tl.resource.dao.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 供应商评价信息
 * @author dd
 *
 */
public class TSupplierAssessment implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String id ;
	
	
	private String supplierId;
	
	/**
	 * 员工人数
	 */
	private Integer empNumber; 
	
	/**
	 * 年营业额
	 */
	private BigDecimal annualSale;
	
	
	/**
	 * 品牌影响力
	 */
	private String brandPower;
	
	/**
	 * 市场份额
	 */
	private BigDecimal marketShare;
	
	/**
	 * 主要产品
	 */
	private String product;
	 
	
	
	
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
	
	/**
	 * 最后修改时间
	 */
	private Date lastEditTime;
	
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
	
	

	public String getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(String supplierId) {
		this.supplierId = supplierId;
	}

	public String getCompetitive() {
		return competitive;
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
		this.createTime = createTime;
	}

	public Date getLastEditTime() {
		return lastEditTime;
	}

	public void setLastEditTime(Date lastEditTime) {
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
}
