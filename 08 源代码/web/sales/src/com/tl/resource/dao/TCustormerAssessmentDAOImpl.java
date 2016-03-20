package com.tl.resource.dao;

import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.tl.resource.business.dto.CustormerAssessmentDto;
import com.tl.resource.dao.pojo.TCustormerAssessment;

public class TCustormerAssessmentDAOImpl extends SqlMapClientDaoSupport implements TCustormerAssessmentDAO {

	@Override
	public int deleteByPrimaryKey(TCustormerAssessment record) {
		 int rows = getSqlMapClientTemplate().delete("t_assessment_custormer.deleteByPrimaryKey", record);
	     return rows;
	}

	@Override
	public void insert(TCustormerAssessment record) {
		getSqlMapClientTemplate().insert("t_assessment_custormer.insert", record);
	}

	@Override
	public TCustormerAssessment selectByPrimaryKey(String id) {
		TCustormerAssessment t = (TCustormerAssessment)getSqlMapClientTemplate().queryForObject("t_assessment_custormer.selectByPrimaryKey", id);
		return t;
	}

	@Override
	public int updateByPrimaryKey(TCustormerAssessment record) {
		int rows = getSqlMapClientTemplate().update("t_assessment_custormer.updateByPrimaryKey", record);
	    return rows;
	}

	@Override
	public List<CustormerAssessmentDto> getAssessmentList(
			Map<String, Object> parmMap) {
		List<CustormerAssessmentDto> list = getSqlMapClientTemplate().queryForList("t_assessment_custormer.getAssessmentList", parmMap);
		return list;
	}

	@Override
	public int getAssessmentListCount(Map<String, Object> parmMap) {
		Integer count = (Integer)  getSqlMapClientTemplate().queryForObject("t_assessment_custormer.getAssessmentListCount", parmMap);
        return count.intValue();
	}

}
