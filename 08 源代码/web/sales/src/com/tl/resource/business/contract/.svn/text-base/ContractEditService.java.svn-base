package com.tl.resource.business.contract;

import java.util.Map;

import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.ContractInforDto;

public interface ContractEditService {
	
	public ContractInforDto consultGeneralQuo(String[] ids);
	
	public ContractInforDto consultProjectQuo(String id);
	
	public boolean addContract(ContractInforDto dto);
	
	public void updateContract(ContractInforDto dto);
	
	public void deleteContracts(String id);
	
	public PaginationSupport findContractInfors(Map params,int startIndex,int pageSize);
	
	public ContractInforDto getContractInforById(String id);

	public String cancelAudit(String businessId);

	public String endAudit(String businessId);

	public String submitAudit(String businessId);
	
	public PaginationSupport findContractDetail(Map params,int startIndex,int pageSize);

	public void runContract(String conId);
	
	public String endContract(String conId);
	
	public void voidContract(String conId);
	public ContractInforDto getContInforById(String id);
	
}
