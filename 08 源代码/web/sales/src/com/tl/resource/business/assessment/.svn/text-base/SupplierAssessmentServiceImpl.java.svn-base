package com.tl.resource.business.assessment;

import java.util.List;
import java.util.Map;

import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.SupplierAssessmentDto;
import com.tl.resource.dao.TSupplierAssessmentDAO;
import com.tl.resource.dao.pojo.TSupplierAssessment;


public class SupplierAssessmentServiceImpl implements SupplierAssessmentService  {

	
	private TSupplierAssessmentDAO supplierAssessmentDao;
	
	
	public TSupplierAssessmentDAO getSupplierAssessmentDao() {
		return supplierAssessmentDao;
	}

	public void setSupplierAssessmentDao(
			TSupplierAssessmentDAO supplierAssessmentDao) {
		this.supplierAssessmentDao = supplierAssessmentDao;
	}

	@Override
	public void addSupplierAssessment(TSupplierAssessment obj) {
		supplierAssessmentDao.insert(obj);
		
	}

	@Override
	public void updateSupplierAssessment(TSupplierAssessment obj) {
		supplierAssessmentDao.updateByPrimaryKey(obj);
		
	}

	@Override
	public void deleteSupplierAssessment(String id) {
		TSupplierAssessment obj = new TSupplierAssessment();
		obj.setId(id);
		supplierAssessmentDao.deleteByPrimaryKey(obj);
		
	}

	@Override
	public PaginationSupport findSupplierAssessmentList(
			Map<String, Object> params, int startIndex, int pageSize) {
		params.put("start", startIndex);
		params.put("limit", pageSize);
		List<SupplierAssessmentDto> list = supplierAssessmentDao.getAssessmentList(params);
		Integer totalCount = (Integer) supplierAssessmentDao.getAssessmentListCount(params);
		PaginationSupport ps = new PaginationSupport(list,  totalCount,  pageSize,  startIndex);
		return ps;
	}

	
	
	
}
