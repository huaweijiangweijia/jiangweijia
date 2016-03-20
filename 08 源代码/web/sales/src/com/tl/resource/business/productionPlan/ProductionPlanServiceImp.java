package com.tl.resource.business.productionPlan;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;


import com.tl.resource.business.dto.ProductionPlanMainInforDto;
import com.tl.resource.dao.TProductionPlanDAO;
import com.tl.resource.dao.pojo.TProductionPlanInfor;

public class ProductionPlanServiceImp implements ProductionPlanService {
//	private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	private TProductionPlanDAO productionPlanDAO;
	
	@Override
	public void addProductionPlan(ProductionPlanMainInforDto dto) {
		
		try {
			TProductionPlanInfor record = new TProductionPlanInfor();
			record.setProductId(dto.getProductCode());
			record.setCategory(dto.getCategory());
			record.setCount(dto.getCount());
			record.setStatus(dto.getStatus());
			record.setBacthNo(dto.getBacthNo());
			productionPlanDAO.insert(record);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public TProductionPlanDAO getProductionPlanDAO() {
		return productionPlanDAO;
	}

	public void setProductionPlanDAO(TProductionPlanDAO productionPlanDAO) {
		this.productionPlanDAO = productionPlanDAO;
	}

	@Override
	public List<ProductionPlanMainInforDto> getProductionPlanList(
			ProductionPlanMainInforDto dto, int startIndex, int pageSize) {
		TProductionPlanInfor record = new TProductionPlanInfor();
		record.setBacthNo(dto.getBacthNo());
		record.setCategory(dto.getCategory());
		record.setCount(dto.getCount());
		record.setPlanId(dto.getPlanCode());
		record.setProductId(dto.getProductCode());
		record.setStatus(dto.getStatus());
		record.setStartIndex(startIndex);
		record.setPageSize(pageSize);
		List<TProductionPlanInfor> list = productionPlanDAO.getPlanList(record);
		List<ProductionPlanMainInforDto> dtos = new ArrayList<ProductionPlanMainInforDto>();
		ProductionPlanMainInforDto rdto = null;
		for(TProductionPlanInfor plan : list)
		{
			rdto = new ProductionPlanMainInforDto();
			rdto.setBacthNo(plan.getBacthNo());
			rdto.setCategory(plan.getCategory());
			rdto.setCount(plan.getCount());
			rdto.setPlanCode(plan.getPlanId());
			rdto.setProductCode(plan.getProductId());
			rdto.setStatus(plan.getStatus());
			rdto.setTotalCount(plan.getTotalCount());
			dtos.add(rdto);
		}
		return dtos;
	}

	@Override
	public void confirmReservePlanById(String planCode) {
		TProductionPlanInfor record = new TProductionPlanInfor();
		record.setPlanId(planCode);
		record.setStatus("2");
		productionPlanDAO.update(record);
	}

	@Override
	public void deleteProductionPlanById(String planCode) {
		TProductionPlanInfor record = new TProductionPlanInfor();
		record.setPlanId(planCode);
		productionPlanDAO.delete(record);
	}

	@Override
	public void updateProductionPlan(ProductionPlanMainInforDto dto) {
		TProductionPlanInfor record = new TProductionPlanInfor();
		record.setBacthNo(dto.getBacthNo());
		record.setCategory(dto.getCategory());
		record.setCount(dto.getCount());
		record.setPlanId(dto.getPlanCode());
		record.setProductId(dto.getProductCode());
		record.setStatus(dto.getStatus());
		productionPlanDAO.update(record);
	}
}
