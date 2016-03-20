package com.tl.resource.dao;

import java.util.List;

import com.tl.resource.dao.pojo.WorkProcedure;

public interface TWorkProcedureDAO {
	public List<WorkProcedure> getWorkProcedureList(String productId);

	public boolean saveWorkProcedure(WorkProcedure wp);

	public boolean updateWorkProcedure(WorkProcedure wp);

	public boolean deleteWorkProcedure(int id);
}
