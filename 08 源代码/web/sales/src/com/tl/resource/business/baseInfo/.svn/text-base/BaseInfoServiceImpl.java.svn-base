package com.tl.resource.business.baseInfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.record.formula.functions.T;

import net.sf.json.JSONArray;

import com.tl.common.util.ArrayUtil;
import com.tl.resource.business.dto.DegreeRebateDto;
import com.tl.resource.business.dto.SuppliersBrandDto;
import com.tl.resource.dao.TAccessoriesDAO;
import com.tl.resource.dao.TAccountsInforDAO;
import com.tl.resource.dao.TCompanyInforDAO;
import com.tl.resource.dao.TCustomersDegreeDAO;
import com.tl.resource.dao.TCustomersInforDAO;
import com.tl.resource.dao.TExchangeRateDAO;
import com.tl.resource.dao.TOrderInforDAO;
import com.tl.resource.dao.TOrderPriceHistoryDAO;
import com.tl.resource.dao.TProductBrandDAO;
import com.tl.resource.dao.TProductSortDAO;
import com.tl.resource.dao.TProductToolsInforDAO;
import com.tl.resource.dao.TQuotationInforDAO;
import com.tl.resource.dao.TRebateDAO;
import com.tl.resource.dao.TReserveInforDAO;
import com.tl.resource.dao.TSuppliersBrandDAO;
import com.tl.resource.dao.TSuppliersInforDAO;
import com.tl.resource.dao.TTaxRateDAO;
import com.tl.resource.dao.TUserInforDAO;
import com.tl.resource.dao.pojo.TAccessories;
import com.tl.resource.dao.pojo.TAccessoriesExample;
import com.tl.resource.dao.pojo.TAccountsInfor;
import com.tl.resource.dao.pojo.TCompanyInfor;
import com.tl.resource.dao.pojo.TCompanyInforExample;
import com.tl.resource.dao.pojo.TCustomersDegree;
import com.tl.resource.dao.pojo.TCustomersDegreeExample;
import com.tl.resource.dao.pojo.TCustomersInfor;
import com.tl.resource.dao.pojo.TCustomersInforExample;
import com.tl.resource.dao.pojo.TExchangeRate;
import com.tl.resource.dao.pojo.TOrderDetailExample;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TOrderInforExample;
import com.tl.resource.dao.pojo.TOrderPriceHistoryExample;
import com.tl.resource.dao.pojo.TProductBrand;
import com.tl.resource.dao.pojo.TProductBrandExample;
import com.tl.resource.dao.pojo.TProductSort;
import com.tl.resource.dao.pojo.TProductSortExample;
import com.tl.resource.dao.pojo.TProductToolsInfor;
import com.tl.resource.dao.pojo.TProductToolsInforExample;
import com.tl.resource.dao.pojo.TQuotationInforExample;
import com.tl.resource.dao.pojo.TRebate;
import com.tl.resource.dao.pojo.TRebateExample;
import com.tl.resource.dao.pojo.TReserveInfor;
import com.tl.resource.dao.pojo.TSuppliersBrand;
import com.tl.resource.dao.pojo.TSuppliersBrandExample;
import com.tl.resource.dao.pojo.TSuppliersInfor;
import com.tl.resource.dao.pojo.TSuppliersInforExample;
import com.tl.resource.dao.pojo.TTaxRate;
import com.tl.resource.dao.pojo.TTaxRateExample;
import com.tl.resource.dao.pojo.TUserInfor;
import com.tl.resource.dao.pojo.TUserInforExample;

public class BaseInfoServiceImpl implements BaseInfoService {

	private TCompanyInforDAO tcompanyInforDAO;
	
	private TCustomersDegreeDAO tcustomersDegreeDAO;
	
	private TCustomersInforDAO tcustomersInforDAO;
	
	private TSuppliersInforDAO tsuppliersInforDAO;
	
	private TExchangeRateDAO texchangeRateDAO;
	
	private TReserveInforDAO treserveInforDAO;
	
	private TAccountsInforDAO taccountsInforDAO;
	
	private TRebateDAO trebateDAO ;
	
	private TUserInforDAO  tuserInforDAO;
	
	private TProductBrandDAO proBrandDao;
	
	private TSuppliersBrandDAO suppliersBrandDAO;
	
	private TProductSortDAO productSortDAO;
	
	private TProductToolsInforDAO proToolsInforDAO;
	
	private TTaxRateDAO taxRateDAO;
	
	private TOrderInforDAO orderInforDao;
	private TQuotationInforDAO quoInfoDAO;
	private TOrderPriceHistoryDAO orderPriceHistoryDao;
	private TAccessoriesDAO accessoriesDAO;
	
	public TProductSortDAO getProductSortDAO() {
		return productSortDAO;
	}
	public void setProductSortDAO(TProductSortDAO productSortDAO) {
		this.productSortDAO = productSortDAO;
	}
	public TSuppliersBrandDAO getSuppliersBrandDAO() {
		return suppliersBrandDAO;
	}
	public void setSuppliersBrandDAO(TSuppliersBrandDAO suppliersBrandDAO) {
		this.suppliersBrandDAO = suppliersBrandDAO;
	}
	public TUserInforDAO getTuserInforDAO() {
		return tuserInforDAO;
	}
	public void setTuserInforDAO(TUserInforDAO tuserInforDAO) {
		this.tuserInforDAO = tuserInforDAO;
	}
	public TCompanyInforDAO getTcompanyInforDAO() {
		return tcompanyInforDAO;
	}
	public void setTcompanyInforDAO(TCompanyInforDAO tcompanyInforDAO) {
		this.tcompanyInforDAO = tcompanyInforDAO;
	}
	public TCustomersDegreeDAO getTcustomersDegreeDAO() {
		return tcustomersDegreeDAO;
	}
	public void setTcustomersDegreeDAO(TCustomersDegreeDAO tcustomersDegreeDAO) {
		this.tcustomersDegreeDAO = tcustomersDegreeDAO;
	}
	public TCustomersInforDAO getTcustomersInforDAO() {
		return tcustomersInforDAO;
	}
	public void setTcustomersInforDAO(TCustomersInforDAO tcustomersInforDAO) {
		this.tcustomersInforDAO = tcustomersInforDAO;
	}
	public TSuppliersInforDAO getTsuppliersInforDAO() {
		return tsuppliersInforDAO;
	}
	public void setTsuppliersInforDAO(TSuppliersInforDAO tsuppliersInforDAO) {
		this.tsuppliersInforDAO = tsuppliersInforDAO;
	}
	
	public TExchangeRateDAO getTexchangeRateDAO() {
		return texchangeRateDAO;
	}
	public void setTexchangeRateDAO(TExchangeRateDAO texchangeRateDAO) {
		this.texchangeRateDAO = texchangeRateDAO;
	}
	
	public TReserveInforDAO getTreserveInforDAO() {
		return treserveInforDAO;
	}
	public void setTreserveInforDAO(TReserveInforDAO treserveInforDAO) {
		this.treserveInforDAO = treserveInforDAO;
	}
	
	
	public TAccountsInforDAO getTaccountsInforDAO() {
		return taccountsInforDAO;
	}
	public void setTaccountsInforDAO(TAccountsInforDAO taccountsInforDAO) {
		this.taccountsInforDAO = taccountsInforDAO;
	}
	
	public TRebateDAO getTrebateDAO() {
		return trebateDAO;
	}
	public void setTrebateDAO(TRebateDAO trebateDAO) {
		this.trebateDAO = trebateDAO;
	}
	@Override
	public void saveCompany(TCompanyInfor companyInfo) {
		tcompanyInforDAO.insert(companyInfo);
	}
	@Override
	public List<TCompanyInfor> getCompanyByPage(Map<String, Object> parmMap) {
		return tcompanyInforDAO.getCompanyByPage(parmMap);
	}
	@Override
	public int getCompanyTotal(Map<String, Object> parmMap) {
		return tcompanyInforDAO.getCompanyTotal(parmMap);
	}
	@Override
	public void deleteCompanyById(String companyId) throws Exception{
		TQuotationInforExample example = new TQuotationInforExample();
		example.createCriteria().andSellerIdEqualTo(companyId);
		int cnt = quoInfoDAO.countByExample(example);
		if(cnt == 0) {
			tcompanyInforDAO.deleteByPrimaryKey(companyId);
		} else {
			throw new Exception("该企业已做报价单");
		}
	}
	@Override
	public void updateCompany(TCompanyInfor companyInfo) throws Exception{
		TCompanyInforExample example = new TCompanyInforExample();
		example.createCriteria().andCompanyNameEqualTo(companyInfo.getCompanyName()).andIdNotEqualTo(companyInfo.getId());
		
		int cnt = tcompanyInforDAO.countByExample(example);
	
		if(cnt == 0) {
			tcompanyInforDAO.updateByPrimaryKeySelective(companyInfo);
		} else {
			throw new Exception("公司名称重复");
		}
	}
	@Override
	public List<TCustomersDegree> getAllCustomersDegree(Map<String, Object> parmMap) {
		return tcustomersDegreeDAO.getAllCustomersDegree(parmMap);
	}
	@Override
	public TCustomersDegree getCustomersDegreeById(String customserDegreeId) {
		return tcustomersDegreeDAO.selectByPrimaryKey(customserDegreeId);
	}
	@Override
	public void addCustomersInfo(TCustomersInfor customersInfo) throws Exception {
		TCustomersInforExample example = new TCustomersInforExample();
		example.createCriteria().andCustomerCodeEqualTo(customersInfo.getCustomerCode());
		int cnt = tcustomersInforDAO.countByExample(example);
		if(cnt == 0){
			tcustomersInforDAO.insert(customersInfo);
		}else{
			throw new Exception("客户编号重复");
		}
	}
	@Override
	public int getCustomersCount(Map<String, Object> parmMap) {
		
		return tcustomersInforDAO.getCustomersCount(parmMap);
	}
	@Override
	public List<TCustomersInfor> getCustomersList(Map<String, Object> parmMap) {
		
		return tcustomersInforDAO.getCustomersList(parmMap);
	}
	
	@Override
	public List<TCustomersInfor> getAssessmentCustomersList(
			Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return tcustomersInforDAO.getAssessmentCustomersList(parmMap);
	}
	@Override
	public void deleteCustomersById(String customersId) throws Exception{
		TCustomersInfor customer = this.tcustomersInforDAO.selectByPrimaryKey(customersId);
		TQuotationInforExample example = new TQuotationInforExample();
		example.createCriteria().andCustomerCodeEqualTo(customer.getCustomerCode());
		int cnt = quoInfoDAO.countByExample(example);
		if(cnt == 0) {
			tcustomersInforDAO.deleteByPrimaryKey(customersId);
		}else {
			throw new Exception("该客户已生成报价单");
		}
	}
	@Override
	public void updateCustomers(TCustomersInfor customersInfo) throws Exception {
		TCustomersInforExample example = new TCustomersInforExample();
		example.createCriteria()
		.andCustomerCodeEqualTo(customersInfo.getCustomerCode())
		.andIdNotEqualTo(customersInfo.getId());
		int cnt = tcustomersInforDAO.countByExample(example);
		if(cnt == 0){
			tcustomersInforDAO.updateByPrimaryKeySelective(customersInfo);
		}else{
			throw new Exception("客户编号重复");
		}
	}
	@Override
	public List<TSuppliersInfor> getSuppliersByPage(Map<String, Object> parmMap) {
		return tsuppliersInforDAO.getSuppliersByPage(parmMap);
	}

	@Override
	public List<TSuppliersInfor> getSuppliersByExample(TSuppliersInforExample suppliersInforExample,int start,int limit) {
		return tsuppliersInforDAO.selectByExample(suppliersInforExample,start,limit);
	}

	@Override
	public int countSuppliersByExample(
			TSuppliersInforExample suppliersInforExample) {
		return tsuppliersInforDAO.countByExample(suppliersInforExample);
	}
	@Override
	public int getSuppliersTotal(Map<String, Object> parmMap) {
		return tsuppliersInforDAO.getSuppliersTotal(parmMap);
	}
	@Override
	public void deleteSupplierById(String supplierIdPar) throws Exception{
		TOrderInforExample example = new TOrderInforExample();
		example.createCriteria().andSupplierIdEqualTo(supplierIdPar);
		int cnt = orderInforDao.countByExample(example);
		
		TOrderPriceHistoryExample hisExam = new TOrderPriceHistoryExample();
		hisExam.createCriteria().andSuppliersInforIdEqualTo(supplierIdPar);
		int hisCnt = orderPriceHistoryDao.countByExample(hisExam);
		
		if(cnt > 0) {
			throw new Exception("该供应商已生成订单");
		} else if(hisCnt > 0) {
			throw new Exception("该供应商已生成历史价格");
		} else {
			suppliersBrandDAO.deleteSupplierBrandBySupplierId(supplierIdPar);
			tsuppliersInforDAO.deleteByPrimaryKey(supplierIdPar);
		}
	}
	@Override
	public void saveSupplier(TSuppliersInfor supplierInfo) {
		tsuppliersInforDAO.insert(supplierInfo);
		
	}
	@Override
	public void updateSupplier(TSuppliersInfor supplierInfor) {
		tsuppliersInforDAO.updateByPrimaryKeySelective(supplierInfor);
	}
	@Override
	public List<TExchangeRate> getExchangeByPage(Map<String, Object> parmMap) {
		return texchangeRateDAO.getExchangeByPage(parmMap);
	}
	@Override
	public int getExchangeTotal() {
		return texchangeRateDAO.getExchangeTotal();
	}
	@Override
	public void saveExchange(TExchangeRate exchangeInfo) {
		texchangeRateDAO.insert(exchangeInfo);
		
	}
	@Override
	public void deleteExchangeById(String exchangeId) throws Exception{
		TQuotationInforExample example = new TQuotationInforExample();
		example.createCriteria().andCurrencyEqualTo(exchangeId);
		int cnt = quoInfoDAO.countByExample(example);
		
		TOrderInforExample orderExample = new TOrderInforExample();
		orderExample.createCriteria().andCurrencyIdEqualTo(exchangeId);
		int orderCnt = orderInforDao.countByExample(orderExample);
		if(cnt > 0) {
			throw new Exception("汇率已做报价");
		} else if(orderCnt > 0) {
			throw new Exception("汇率已做订单");
		} else {
			texchangeRateDAO.deleteByPrimaryKey(exchangeId);
		}
	}
	@Override
	public void updateExchange(TExchangeRate exchangeInfo) {
		texchangeRateDAO.updateByPrimaryKeySelective(exchangeInfo);
	}
	@Override
	public List<com.tl.resource.business.dto.ReserveInforDto> getReserveByPage(Map<String, Object> parmMap) {
		return treserveInforDAO.getReserveByPage(parmMap);
	}
	@Override
	public int getReserveTotal(Map<String, Object> parmMap) {
		return treserveInforDAO.getReserveTotal(parmMap);
	}
	@Override
	public List<TAccountsInfor> getAccountsInfoListByByReserveId(Map<String, Object> parmMap) {
		
		return taccountsInforDAO.getAccountsInfoListByByReserveId(parmMap);
	}
	@Override
	public List<DegreeRebateDto> getDegreeRebateByPageAndDegreeId(
			Map<String, Object> parmMap) {
		return trebateDAO.getDegreeRebateByPageAndDegreeId(parmMap);
	}
	@Override
	public int getDegreeRebateTotalByDegreeId(Map<String, Object> parmMap) {
		return trebateDAO.getDegreeRebateTotalByDegreeId(parmMap);
	}
	@Override
	public void saveRebate(TRebate trebate) {
		trebateDAO.insert(trebate);
		
	}
	@Override
	public void updateRebate(TRebate trebate) {
		trebateDAO.updateByPrimaryKeySelective(trebate);
	}
	@Override
	public void saveCustomersDegree(TCustomersDegree customersDegreeInfo) throws Exception {
		TCustomersDegreeExample example = new TCustomersDegreeExample();
		example.createCriteria().andDegreeCodeEqualTo(customersDegreeInfo.getDegreeCode());
		int cnt = tcustomersDegreeDAO.countByExample(example);
		if(cnt == 0) {
			tcustomersDegreeDAO.insert(customersDegreeInfo);
		} else {
			throw new Exception("客户等级编码重复");
		}
	}
	@Override
	public List<TUserInfor> getAllUserInfor() {
		TUserInforExample example = null;
		return tuserInforDAO.selectByExample(example);
	}
	@Override
	public void setBenchmarkExchangeById(String exchangeId) {
		//将原有基准汇率设为非基准汇率
		texchangeRateDAO.updateOldBenchmark();
		//设置新基准汇率
		texchangeRateDAO.setBenchmarkExchangeById(exchangeId);
	}
	@Override
	public List<TProductBrand> getProductBrand(Map<String, Object> parmMap) {
		return proBrandDao.getProductBrand(parmMap);
	}
	@Override
	public Integer getProductBrandTotal(Map<String, Object> parmMap) {
		return proBrandDao.getProductBrandTotal(parmMap);
	}
	public TProductBrandDAO getProBrandDao() {
		return proBrandDao;
	}
	public void setProBrandDao(TProductBrandDAO proBrandDao) {
		this.proBrandDao = proBrandDao;
	}
	@Override
	public void deleteBrand(String brandId) {
		proBrandDao.deleteByPrimaryKey(brandId);
	}
	@Override
	public void insertBrand(TProductBrand brand) throws Exception {
		TProductBrandExample example = new TProductBrandExample();
		example.createCriteria().andNameEqualTo(brand.getName());
		int cnt = proBrandDao.countByExample(example);
		if(cnt == 0) {
			proBrandDao.insertSelective(brand);
		} else {
			throw new Exception("品牌重复");
		}
	}
	@Override
	public void updateBrand(TProductBrand brand) throws Exception {
		TProductBrandExample example = new TProductBrandExample();
		example.createCriteria().andNameEqualTo(brand.getName())
		.andIdNotEqualTo(brand.getId());
		int cnt = proBrandDao.countByExample(example);
		if(cnt == 0) {
			TProductBrand oldBrand = proBrandDao.selectByPrimaryKey(brand.getId());
			proBrandDao.updateByPrimaryKeySelective(brand);
			
			String newBrandName = brand.getName();
			String oldBrandName = oldBrand.getName();
			if(!newBrandName.equals(oldBrandName)) {
				Map<String, Object> parmMap = new HashMap<String, Object>();
				parmMap.put("oldBrand", oldBrandName);
				parmMap.put("newBrand", newBrandName);
				proBrandDao.updateToolsByBrand(parmMap);
			}
		} else {
			throw new Exception("品牌重复");
		}
	}
	@Override
	public List<String> deleteBrand(JSONArray array) {
		Iterator<String> iterator = array.iterator();
		List<String> list = new ArrayList<String>();
		while(iterator.hasNext()) {
			String id = iterator.next();
			TProductBrand brand = proBrandDao.selectByPrimaryKey(id);
			if(this.isCanDelBrand(brand.getName())) {
				TProductSortExample example = new TProductSortExample();
				example.createCriteria().andProductBrandEqualTo(brand.getName());
				
				this.deleteBrand(id);
				productSortDAO.deleteByExample(example);
			} else {
				list.add(brand.getName());
			}
			
		}
		return list;
	}
	@Override
	public List<SuppliersBrandDto> getSuppliersBrandByPageAndSupplierId(
			Map<String, Object> parmMap) {
		return suppliersBrandDAO.getSuppliersBrandByPageAndSupplierId(parmMap);
	}
	@Override
	public int getSuppliersBrandTotalBySupplierId(Map<String, Object> parmMap) {
		return suppliersBrandDAO.getSuppliersBrandTotalBySupplierId(parmMap);
	}
	@Override
	public void saveSuppliersBrand(TSuppliersBrand suppliersBrandInfo) throws Exception {
		
		TSuppliersBrandExample example = new TSuppliersBrandExample();
		example.createCriteria().andBrandEqualTo(suppliersBrandInfo.getBrand())
		.andTSuppliersIdEqualTo(suppliersBrandInfo.gettSuppliersId());
		int cnt = suppliersBrandDAO.countByExample(example);
		if(cnt == 0) {
			suppliersBrandDAO.insert(suppliersBrandInfo);	
		} else {
			throw new Exception("品牌重复");
		}
	}
	@Override
	public void deleteSupplierBrankById(String suppliersBrandIdPar) {
		suppliersBrandDAO.deleteByPrimaryKey(suppliersBrandIdPar);
	}
	@Override
	public List<TProductSort> getAllProductSort() {
		return productSortDAO.getAllProductSort();
	}
	@Override
	public void updateRebate(TCustomersDegree tcusDegree) throws Exception {
		TCustomersDegreeExample example = new TCustomersDegreeExample();
		example.createCriteria().andDegreeCodeEqualTo(tcusDegree.getDegreeCode())
		.andIdNotEqualTo(tcusDegree.getId());
		int cnt = tcustomersDegreeDAO.countByExample(example);
		if(cnt == 0) {
			tcustomersDegreeDAO.updateByPrimaryKeySelective(tcusDegree);
		} else {
			throw new Exception("客户等级编码重复"); 
		}
//		/**
//		 * 这里在大数据量的情况下，可能会产生性能问题
//		 */
//		Map<String, Object> parmMap = new HashMap<String,Object>();
//		parmMap.put("customerDegreeId", tcusDegree.getId());
//		parmMap.put("degreeCode", tcusDegree.getDegreeCode());
//		tcustomersInforDAO.updateByCustomersDegreeId(parmMap);
		
	}
	@Override
	public List<TProductBrand> getRunData(Map<String, Object> paramMap) {
		
		return proBrandDao.getRunData(paramMap);
	}
	@Override
	public boolean checkCompany(TCompanyInfor companyInfo) {
		
		return tcompanyInforDAO.checkCompany(companyInfo);
	}
	@Override
	public void deleteCustomerDegreeByIds(String[] ids) {
		TRebateExample example = new TRebateExample();
		for (int i = 0; i < ids.length; i++) {
			example.createCriteria().andCustomersDegreeIdEqualTo(ids[i]);
			trebateDAO.deleteByExample(example);
			example.clear();
			tcustomersDegreeDAO.deleteByPrimaryKey(ids[i]);
		}
	}
	
	private boolean isCanDelBrand(String brandName) {
		boolean flag = true;
		TProductToolsInforExample example = new TProductToolsInforExample();
		example.createCriteria().andProductBrandLike(brandName);
		int count = proToolsInforDAO.countByExample(example);
		if(count > 0) {
			flag = false;
		}
		return flag;
	}
	public TProductToolsInforDAO getProToolsInforDAO() {
		return proToolsInforDAO;
	}
	public void setProToolsInforDAO(TProductToolsInforDAO proToolsInforDAO) {
		this.proToolsInforDAO = proToolsInforDAO;
	}
	
	@Override
	public void addTaxRate(TTaxRate taxRate) throws Exception {
		TTaxRateExample example = new TTaxRateExample();
		example.createCriteria().andRateEqualTo(taxRate.getRate());
		int cnt = taxRateDAO.countByExample(example);
		if(cnt == 0) {
			taxRateDAO.insert(taxRate);
		} else {
			throw new Exception("税率重复");
		}
	}
	@Override
	public void deleteTaxRate(JSONArray array) throws Exception {
		Iterator<String> iterator = array.iterator();
		while(iterator.hasNext()) {
			String id = iterator.next();
			taxRateDAO.deleteByPrimaryKey(id);
		}
	}
	@Override
	public List<TTaxRate> getTaxRate() {
		TTaxRateExample example = new TTaxRateExample();
		example.createCriteria();
		List<TTaxRate> list = taxRateDAO.selectByExample(example);
		return list;
	}
	@Override
	public void modifyTaxRate(TTaxRate taxRate) throws Exception {
		TTaxRateExample example = new TTaxRateExample();
		example.createCriteria().andRateEqualTo(taxRate.getRate()).andIdNotEqualTo(taxRate.getId());
		int cnt = taxRateDAO.countByExample(example);
		if(cnt == 0) {
			taxRateDAO.updateByPrimaryKeySelective(taxRate);
		} else {
			throw new Exception("税率重复");
		}
	}
	public TTaxRateDAO getTaxRateDAO() {
		return taxRateDAO;
	}
	public void setTaxRateDAO(TTaxRateDAO taxRateDAO) {
		this.taxRateDAO = taxRateDAO;
	}
	@Override
	public int getTaxRateCount() {
		TTaxRateExample example = new TTaxRateExample();
		example.createCriteria();
		int cnt = taxRateDAO.countByExample(example);
		return cnt;
	}
	@Override
	public Map<String, List<TAccessories>> getAccessoriesInfo(List<Object> businessIds) {
		TAccessoriesExample accessoriesExample = new TAccessoriesExample();
		accessoriesExample.createCriteria().andBusinessIdIn(businessIds);
		List<TAccessories> accessoriesList=  accessoriesDAO.selectByExample(accessoriesExample);
		Map<String,List<TAccessories>> accessoriesMap = new HashMap<String, List<TAccessories>>();
		for(TAccessories accessories : accessoriesList){
			if(accessoriesMap.get(accessories.getBusinessId()) == null){
				accessoriesMap.put(accessories.getBusinessId(), new ArrayList<TAccessories>());
			}
			accessoriesMap.get(accessories.getBusinessId()).add(accessories);
		}
		return accessoriesMap;
	}
	public TOrderInforDAO getOrderInforDao() {
		return orderInforDao;
	}
	public void setOrderInforDao(TOrderInforDAO orderInforDao) {
		this.orderInforDao = orderInforDao;
	}
	public TQuotationInforDAO getQuoInfoDAO() {
		return quoInfoDAO;
	}
	public void setQuoInfoDAO(TQuotationInforDAO quoInfoDAO) {
		this.quoInfoDAO = quoInfoDAO;
	}
	public TOrderPriceHistoryDAO getOrderPriceHistoryDao() {
		return orderPriceHistoryDao;
	}
	public void setOrderPriceHistoryDao(TOrderPriceHistoryDAO orderPriceHistoryDao) {
		this.orderPriceHistoryDao = orderPriceHistoryDao;
	}
	@Override
	public double getReserveTotalPrice(Map<String, Object> parmMap) {
		return treserveInforDAO.getReserveTotalPrice(parmMap);
	}
	public TAccessoriesDAO getAccessoriesDAO() {
		return accessoriesDAO;
	}
	public void setAccessoriesDAO(TAccessoriesDAO accessoriesDAO) {
		this.accessoriesDAO = accessoriesDAO;
	}
}
