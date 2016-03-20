package com.tl.resource.business.contract;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.tl.common.SystemConstants;
import com.tl.common.util.ArrayUtil;
import com.tl.common.util.PaginationSupport;
import com.tl.resource.dao.TAccessoriesDAO;
import com.tl.resource.dao.TContractInforDAO;
import com.tl.resource.dao.TResourcePurviewDAO;
import com.tl.resource.dao.constant.TResourcePurviewConstant;
import com.tl.resource.dao.pojo.TAccessories;
import com.tl.resource.dao.pojo.TAccessoriesExample;
import com.tl.resource.dao.pojo.TContractInfor;
import com.tl.resource.dao.pojo.TContractInforExample;
import com.tl.resource.dao.pojo.TResourcePurviewExample;

public class ContractViewServiceImp implements ContractViewService {
	
	private TContractInforDAO contractInforDAO;
	private TResourcePurviewDAO resourcePurviewDAO;
	private TAccessoriesDAO accessoriesDAO;
	
	
	@Override
	public PaginationSupport findContractViewPanelInfors(Map params,
			int startIndex, int pageSize) {
		// TODO Auto-generated method stub
		return contractInforDAO.findContractViewPanelInfors(params, startIndex, pageSize);
	}
	public TContractInforDAO getContractInforDAO() {
		return contractInforDAO;
	}
	public void setContractInforDAO(TContractInforDAO contractInforDAO) {
		this.contractInforDAO = contractInforDAO;
	}
	public TResourcePurviewDAO getResourcePurviewDAO() {
		return resourcePurviewDAO;
	}
	public void setResourcePurviewDAO(TResourcePurviewDAO resourcePurviewDAO) {
		this.resourcePurviewDAO = resourcePurviewDAO;
	}
	public TAccessoriesDAO getAccessoriesDAO() {
		return accessoriesDAO;
	}
	public void setAccessoriesDAO(TAccessoriesDAO accessoriesDAO) {
		this.accessoriesDAO = accessoriesDAO;
	}
	@Override
	public Map getContractTotalInfor(Map params) {
		return contractInforDAO.getContractTotalInfor(params);
	}
	@Override
	public List<Map<String, Object>> getContractMonthMoneys(
			Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return contractInforDAO.getContractMonthMoneys(parmMap);
	}
	@Override
	public List<Map<String, Object>> getContractMoneysForOwnPerson(
			Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return contractInforDAO.getContractMoneysForOwnPerson(parmMap);
	}
	@Override
	public List<Map<String, Object>> getContractMoneysGroupByMonthForTowYear(
			Map<String, Object> parmMap) {
		String year1 = (String) parmMap.get("year1");
		Map<String, Object> parmMapDao = new HashMap<String, Object>();
		parmMapDao.put("startTime", year1 + "-01");
		parmMapDao.put("endTime", year1 + "-12");
		parmMapDao.put("customerName", parmMap.get("customerName"));
		parmMapDao.put("ownContactPerson", parmMap.get("ownContactPerson"));
		List<Map<String, Object>> list1 = contractInforDAO.getContractMonthMoneys(parmMapDao);
		
		String year2 = (String) parmMap.get("year2");
		parmMapDao.clear();
		parmMapDao.put("startTime", year2 + "-01");
		parmMapDao.put("endTime", year2 + "-12");
		parmMapDao.put("customerName", parmMap.get("customerName"));
		parmMapDao.put("ownContactPerson", parmMap.get("ownContactPerson"));
		List<Map<String, Object>> list2 = contractInforDAO.getContractMonthMoneys(parmMapDao);
		
		List<Map<String, Object>> rt = new ArrayList<Map<String, Object>>();
		for (int i = 1; i < 13; i++) {
			Map<String, Object> newMap = new HashMap<String, Object>();
			String rtMonth = null;
			if(i < 10){
				rtMonth = "0" + i;
			}else{
				rtMonth = String.valueOf(i);
			}
			newMap.put("month", rtMonth);
			BigDecimal m = getMonthMoneyFromYearMList(year1.substring(year1.length() - 2) + "-" + rtMonth,list1);
			newMap.put("money1", m == null ? BigDecimal.ZERO : m);
			 m = getMonthMoneyFromYearMList(year2.substring(year2.length() - 2) + "-" + rtMonth,list2);
			newMap.put("money2", m == null ? BigDecimal.ZERO : m);
			rt.add(newMap);
		}
		
		return rt;
	}
	private BigDecimal getMonthMoneyFromYearMList(String rtMonth,
			List<Map<String, Object>> list1) {
		for (Iterator iterator = list1.iterator(); iterator.hasNext();) {
			Map<String, Object> map = (Map<String, Object>) iterator.next();
			if(map.get("NAME").equals(rtMonth)){
				return (BigDecimal) map.get("visits");
			}
		}
		return null;
	}
	@Override
	public PaginationSupport pageContractWithPart(Map<String, Object> params) {
		TContractInforExample contractInforExample = whereContractWithPart(params);
		List list = getContractWithPart(params,contractInforExample);
		int count = this.contractInforDAO.countByExample(contractInforExample);
		return new PaginationSupport(list,count);
	}
	
	
	@Override
	public List<TContractInfor> getContractWithPart(Map<String, Object> params) {
		TContractInforExample contractInforExample = whereContractWithPart(params);
		
		return getContractWithPart(params,contractInforExample);
	}
	
	public List<TContractInfor> getContractWithPart(Map<String, Object> params,TContractInforExample contractInforExample) {
		if(params.get(SystemConstants.ORDER_KEY) != null){
			String order = (String)params.get(SystemConstants.ORDER_KEY);
			contractInforExample.setOrderByClause(order);
		}
		List<TContractInfor> rst = this.contractInforDAO.selectByExample(contractInforExample,(Integer)params.get(SystemConstants.START_INDEX_KEY),(Integer)params.get(SystemConstants.PAGE_SIZE_KEY));
		if(params.get(ContractViewService.LOAD_ACCESSORIES_GET_CONTRACT_WITH_PART) != null &&
				(Boolean)params.get(ContractViewService.LOAD_ACCESSORIES_GET_CONTRACT_WITH_PART) ==  true){
			this.loadAccessories(rst);
		}
		return rst;
	}
	
	@Override
	public int coutContractWithPart(Map<String, Object> params) {
		TContractInforExample contractInforExample = whereContractWithPart(params);
		return this.contractInforDAO.countByExample(contractInforExample);
	}
	
	private TContractInforExample whereContractWithPart(Map<String,Object> params){
		TContractInforExample contractInforExample = new TContractInforExample();
		TContractInforExample.Criteria contractInforCriteria = contractInforExample.createCriteria();
		TResourcePurviewExample resourcePurviewExample = new TResourcePurviewExample();
		TResourcePurviewExample.Criteria resourcePurviewCriteria = resourcePurviewExample.createCriteria();
		List result = null;
		//查询此用户还可以查看其它哪些用户的数据的权限
		if(StringUtils.isNotBlank((String)params.get(TResourcePurviewConstant.USER_ID))){
			resourcePurviewCriteria.andUserIdEqualTo((String)params.get(TResourcePurviewConstant.USER_ID));
		}
		if(params.get(TResourcePurviewConstant.RESOURCE_TYPE) != null){
			resourcePurviewCriteria.andResourceTypeEqualTo((Integer)params.get(TResourcePurviewConstant.RESOURCE_TYPE));
		}
		if(resourcePurviewCriteria.isValid()){
			result = resourcePurviewDAO.selectByExample(resourcePurviewExample);
			List<Object> list = ArrayUtil.getFieldList(result, "getTargetUserId");
			if(list.size() != 0){
				contractInforCriteria.andUserIdIn(list);
			}
		}
		return contractInforExample;
	}
	
	@Override
	public void loadAccessories(List<TContractInfor> list) {
		//查看设置附件信息
		List<Object> contractIds = ArrayUtil.getFieldList(list, "getId");
		TAccessoriesExample accessoriesExample = new TAccessoriesExample();
		accessoriesExample.createCriteria().andBusinessIdIn(contractIds);
		List<TAccessories> accessoriesList=  accessoriesDAO.selectByExample(accessoriesExample);
		Map<String,List<TAccessories>> accessoriesMap = new HashMap<String, List<TAccessories>>();
		for(TAccessories accessories : accessoriesList){
			if(accessoriesMap.get(accessories.getBusinessId()) == null){
				accessoriesMap.put(accessories.getBusinessId(), new ArrayList<TAccessories>());
			}
			accessoriesMap.get(accessories.getBusinessId()).add(accessories);
		}
		for(TContractInfor contractInfor : list){
			if(accessoriesMap.get(contractInfor.getId()) == null){
				contractInfor.setFileCount(0);
			}else{
				contractInfor.setFileCount(accessoriesMap.get(contractInfor.getId()).size());
			}
		}
	}
	
}
