package com.tl.resource.dao;

import com.tl.resource.dao.pojo.TProductionPlanInfor;

import java.util.List;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

public class TProductionPlanDAOImpl extends SqlMapClientDaoSupport  implements TProductionPlanDAO{

	public TProductionPlanDAOImpl()
	{
		super();
	}
	
	@Override
	public void confirm(TProductionPlanInfor record) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(TProductionPlanInfor record) {
		getSqlMapClientTemplate().delete("t_production_plan_infor.ibatorgenerated_deleteByExample", record);
	}

	@Override
	public List<TProductionPlanInfor> getPlanList(TProductionPlanInfor record) {
		List<TProductionPlanInfor> list = getSqlMapClientTemplate().queryForList(
				"t_production_plan_infor.ibatorgenerated_selectByExample", record);
		return list;
	}

	@Override
	public void insert(TProductionPlanInfor record) {
		getSqlMapClientTemplate().insert("t_production_plan_infor.ibatorgenerated_insert", record);
	}

	@Override
	public void update(TProductionPlanInfor record) {
		getSqlMapClientTemplate().update("t_production_plan_infor.ibatorgenerated_updateByPrimaryKeySelective", record);
		
	}

}