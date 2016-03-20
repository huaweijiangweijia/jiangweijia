package com.tl.resource.dao;

import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.tl.resource.business.dto.SupplierAssessmentDto;
import com.tl.resource.dao.pojo.TSupplierAssessment;

public class TSupplierAssessmentDAOImpl extends SqlMapClientDaoSupport implements TSupplierAssessmentDAO {

	@Override
	public int deleteByPrimaryKey(TSupplierAssessment record) {
		 int rows = getSqlMapClientTemplate().delete("t_assessment_supplier.deleteByPrimaryKey", record);
	     return rows;
	}

	@Override
	public void insert(TSupplierAssessment record) {
		getSqlMapClientTemplate().insert("t_assessment_supplier.insert", record);
	}

	@Override
	public TSupplierAssessment selectByPrimaryKey(String id) {
		TSupplierAssessment t = (TSupplierAssessment)getSqlMapClientTemplate().queryForObject("t_assessment_supplier.selectByPrimaryKey", id);
		return t;
	}

	@Override
	public int updateByPrimaryKey(TSupplierAssessment record) {
		int rows = getSqlMapClientTemplate().update("t_assessment_supplier.updateByPrimaryKey", record);
	    return rows;
	}

	@Override
	public List<SupplierAssessmentDto> getAssessmentList(
			Map<String, Object> parmMap) {
		List<SupplierAssessmentDto> list = getSqlMapClientTemplate().queryForList("t_assessment_supplier.getAssessmentList", parmMap);
		return list;
	}

	@Override
	public int getAssessmentListCount(Map<String, Object> parmMap) {
		Integer count = (Integer)  getSqlMapClientTemplate().queryForObject("t_assessment_supplier.getAssessmentListCount", parmMap);
        return count.intValue();
	}

}
