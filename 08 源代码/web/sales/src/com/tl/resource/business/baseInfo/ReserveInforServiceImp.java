package com.tl.resource.business.baseInfo;

import java.util.List;
import java.util.Map;

import com.tl.resource.dao.TReserveInforDAO;

public class ReserveInforServiceImp implements ReserveInforService{
	private TReserveInforDAO treserveInforDAO;
	
	@Override
	public List<Map<String, Object>> findDtReserveInforByProductCode(
			String productCode) {
		
		return treserveInforDAO.findDtReserveInforByProductCode(productCode);
	}

	public TReserveInforDAO getTreserveInforDAO() {
		return treserveInforDAO;
	}

	public void setTreserveInforDAO(TReserveInforDAO treserveInforDAO) {
		this.treserveInforDAO = treserveInforDAO;
	}

}
