package com.tl.resource.business.productionPlan;

import java.util.List;

import com.tl.resource.business.dto.ProductionPlanMainInforDto;

public interface ProductionPlanService {
//	public ReservePlanMainInforDto consultReserveInfors(String orderId);
	
	public void addProductionPlan(ProductionPlanMainInforDto dto);
	
	public List<ProductionPlanMainInforDto> getProductionPlanList(ProductionPlanMainInforDto dto, int startIndex, int pageSize);
	
	public void confirmReservePlanById(String planCode);
	
	public void updateProductionPlan(ProductionPlanMainInforDto dto);
//	
	public void deleteProductionPlanById(String planCode);
	
//	public void confirmReservePlanById(String id);
//	
//	public ReservePlanMainInforDto getReservePlanMainInfor(String orderId);
//	
//	public PaginationSupport findReservePlans(Map params,int startIndex,int pageSize);
}
