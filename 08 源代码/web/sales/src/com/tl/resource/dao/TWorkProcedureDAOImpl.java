package com.tl.resource.dao;

import java.util.List;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.tl.resource.dao.pojo.WorkProcedure;

public class TWorkProcedureDAOImpl extends SqlMapClientDaoSupport implements
		TWorkProcedureDAO {

	public TWorkProcedureDAOImpl() {
		super();
	}

	@Override
	public List<WorkProcedure> getWorkProcedureList(String productId) {
		return getSqlMapClientTemplate().queryForList(
				"t_work_procedure.getWorkProcedureList", productId);
	}

	@Override
	public boolean saveWorkProcedure(WorkProcedure wp) {
		getSqlMapClientTemplate().insert(
				"t_work_procedure.ibatorgenerated_insert", wp);
		return true;
	}

	@Override
	public boolean updateWorkProcedure(WorkProcedure wp) {
		getSqlMapClientTemplate().update(
				"t_work_procedure.ibatorgenerated_updateByPrimaryKeySelective",
				wp);
		return true;
	}

	@Override
	public boolean deleteWorkProcedure(int id) {
		getSqlMapClientTemplate().delete(
				"t_work_procedure.ibatorgenerated_deleteByPrimaryKey", id);
		return true;
	}

}
