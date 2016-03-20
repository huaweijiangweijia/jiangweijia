package com.tl.resource.business.contract;

import java.util.List;
import java.util.Map;

import com.tl.common.util.PaginationSupport;
import com.tl.resource.dao.pojo.TContractInfor;

public interface ContractViewService {

	public static final String LOAD_ACCESSORIES_GET_CONTRACT_WITH_PART = "getContractWithPart.loadAccessories";
	
	PaginationSupport findContractViewPanelInfors(Map params, int startIndex,
			int pageSize);
	
	Map getContractTotalInfor(Map params);
	
	public List<Map<String, Object>> getContractMonthMoneys(
			Map<String, Object> parmMap);
	
	public List<Map<String, Object>> getContractMoneysForOwnPerson(
			Map<String, Object> parmMap);
	
	public List<Map<String, Object>> getContractMoneysGroupByMonthForTowYear(
			Map<String, Object> parmMap);
	
	/**
	 * 合同信息分页查询
	 * @param params
	 * @return
	 */
	PaginationSupport pageContractWithPart(Map<String,Object> params);

	/**
	 *  合同信息查询
	 * @param params
	 * @return
	 */
	List<TContractInfor> getContractWithPart(Map<String,Object> params);
	
	/**
	 * 统计合同总条数
	 * @param params
	 * @return
	 */
	int coutContractWithPart(Map<String,Object> params);

	/**
	 * 加载附件信息
	 * @param list
	 */
	void loadAccessories(List<TContractInfor> list);
	
}
