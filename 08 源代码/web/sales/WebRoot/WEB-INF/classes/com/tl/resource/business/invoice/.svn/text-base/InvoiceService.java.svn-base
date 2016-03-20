package com.tl.resource.business.invoice;

import java.util.List;
import java.util.Map;

import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.InvoiceInforDto;
import com.tl.resource.dao.pojo.TCustomersInfor;
import com.tl.resource.dao.pojo.TInvoiceInfo;

public interface InvoiceService {
	
	public void saveInvoiceInfor(InvoiceInforDto dto);
	
	public PaginationSupport viewInvoiceInfors(Map params,int startIndex,int pageSize);
	
	public InvoiceInforDto getInvoiceInfor(String contractId);
	
	public List<TInvoiceInfo> getInvoiceList(Map params,int startIndex,int pageSize);
	
	public TCustomersInfor getCustomerInforByCode(String code);
	
	public TCustomersInfor getSuppliersInforByCode(String code);

	public String deleteInvoiceInfor(String id,String conDetailId);
}
