package com.tl.resource.dao.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 客户评价信息
 * @author dd
 *
 */
public class TCustormerAssessment implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String id ;
	
	/**
	 * 客户id
	 */
	private String custormerCode;
	/**
	 * 员工人数
	 */
	private Integer empNumber;
	
	/**
	 * 年营业额
	 */
	private BigDecimal annualSale;
	
	/**
	 * 主要产品
	 */
	private String product;
	
	/**
	 * 行业竞争力
	 */
	private String competitive;
	
	/**
	 * 销售份额
	 */
	private BigDecimal salesProportion;
	
	/**
	 * 增长比例
	 */
	private BigDecimal growth;
	
	/**
	 * 毛利率
	 */
	private String grossMargin;
	
	/**
	 * 付款风险
	 */
	private String payRisk;

	/**
	 * 付款准时率
	 */
	private String payPunctualityRate;
	
	/**
	 * 拖款时间
	 */
	private Integer payDelay;
	
	/**
	 * 合作意愿
	 */
	private String willingness;
	
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

	public Integer getEmpNumber() {
		return empNumber;
	}

	public void setEmpNumber(Integer empNumber) {
		this.empNumber = empNumber;
	}


	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public String getCompetitive() {
		return competitive;
	}

	public void setCompetitive(String competitive) {
		this.competitive = competitive;
	}

	public BigDecimal getSalesProportion() {
		return salesProportion;
	}

	public void setSalesProportion(BigDecimal salesProportion) {
		this.salesProportion = salesProportion;
	}

	public BigDecimal getGrowth() {
		return growth;
	}

	public void setGrowth(BigDecimal growth) {
		this.growth = growth;
	}

	public String getPayRisk() {
		return payRisk;
	}

	public void setPayRisk(String payRisk) {
		this.payRisk = payRisk;
	}

	


	public String getPayPunctualityRate() {
		return payPunctualityRate;
	}

	public void setPayPunctualityRate(String payPunctualityRate) {
		this.payPunctualityRate = payPunctualityRate;
	}

	public Integer getPayDelay() {
		return payDelay;
	}

	public void setPayDelay(Integer payDelay) {
		this.payDelay = payDelay;
	}

	public String getWillingness() {
		return willingness;
	}

	public void setWillingness(String willingness) {
		this.willingness = willingness;
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

	public String getGrossMargin() {
		return grossMargin;
	}

	public void setGrossMargin(String grossMargin) {
		this.grossMargin = grossMargin;
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

	

	public String getCustormerCode() {
		return custormerCode;
	}

	public void setCustormerCode(String custormerCode) {
		this.custormerCode = custormerCode;
	}

	public BigDecimal getAnnualSale() {
		return annualSale;
	}

	public void setAnnualSale(BigDecimal annualSale) {
		this.annualSale = annualSale;
	}

	

	
	

	
}
