package com.tl.resource.business.assessment;

import java.util.List;
import java.util.Map;

import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.CustormerAssessmentDto;
import com.tl.resource.dao.TCustormerAssessmentDAO;
import com.tl.resource.dao.pojo.TCustormerAssessment;


public class CustormerAssessmentServiceImpl implements CustormerAssessmentService  {

	
	private TCustormerAssessmentDAO custormerAssessmentDao;
	
	
	

	public TCustormerAssessmentDAO getCustormerAssessmentDao() {
		return custormerAssessmentDao;
	}

	public void setCustormerAssessmentDao(
			TCustormerAssessmentDAO custormerAssessmentDao) {
		this.custormerAssessmentDao = custormerAssessmentDao;
	}

	@Override
	public void addCustormerAssessment(TCustormerAssessment obj) {
		custormerAssessmentDao.insert(obj);
		
	}

	@Override
	public void updateCustormerAssessment(TCustormerAssessment obj) {
		custormerAssessmentDao.updateByPrimaryKey(obj);
		
	}

	@Override
	public void deleteCustormerAssessment(String id) {
		TCustormerAssessment obj = new TCustormerAssessment();
		obj.setId(id);
		custormerAssessmentDao.deleteByPrimaryKey(obj);
		
	}

	@Override
	public PaginationSupport findCustormerAssessmentList(
			Map<String, Object> params, int startIndex, int pageSize) {
		params.put("start", startIndex);
		params.put("limit", pageSize);
		List<CustormerAssessmentDto> list = custormerAssessmentDao.getAssessmentList(params);
		Integer totalCount = (Integer) custormerAssessmentDao.getAssessmentListCount(params);
		PaginationSupport ps = new PaginationSupport(list,  totalCount,  pageSize,  startIndex);
		return ps;
	}

	
	
	
}
