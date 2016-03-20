package com.tl.resource.dao;

import com.tl.resource.dao.pojo.TProductionPlanInfor;

import java.util.List;

public interface TProductionPlanDAO {

	void insert(TProductionPlanInfor record);

	void delete(TProductionPlanInfor record);
	
	void update(TProductionPlanInfor record);
	
	void confirm(TProductionPlanInfor record);
	
	List<TProductionPlanInfor> getPlanList(TProductionPlanInfor record);
}