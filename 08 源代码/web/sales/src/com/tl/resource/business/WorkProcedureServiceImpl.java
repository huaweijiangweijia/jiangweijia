package com.tl.resource.business;

import java.util.List;

import com.tl.resource.dao.TWorkProcedureDAO;
import com.tl.resource.dao.pojo.WorkProcedure;

public class WorkProcedureServiceImpl implements WorkProcedureService {
	private TWorkProcedureDAO tWorkProcedureDAO;

	@Override
	public List<WorkProcedure> getWorkProcedureList(String productId) {
		return tWorkProcedureDAO.getWorkProcedureList(productId);
	}

	@Override
	public boolean saveWorkProcedure(WorkProcedure wp) {
		return tWorkProcedureDAO.saveWorkProcedure(wp);
	}

	@Override
	public boolean updateWorkProcedure(WorkProcedure wp) {
		return tWorkProcedureDAO.updateWorkProcedure(wp);
	}

	@Override
	public boolean deleteWorkProcedure(int id) {
		return tWorkProcedureDAO.deleteWorkProcedure(id);
	}

	public TWorkProcedureDAO gettWorkProcedureDAO() {
		return tWorkProcedureDAO;
	}

	public void settWorkProcedureDAO(TWorkProcedureDAO tWorkProcedureDAO) {
		this.tWorkProcedureDAO = tWorkProcedureDAO;
	}

}
