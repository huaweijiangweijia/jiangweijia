package com.tl.resource.business;

import com.tl.resource.dao.ProduceTaskDAO;
import com.tl.resource.dao.pojo.ProduceTask;

public class ProduceTaskServiceImpl implements ProduceTaskService {

	private ProduceTaskDAO produceTaskDAO;

	@Override
	public boolean doProduceTask(ProduceTask task) {
		return produceTaskDAO.doProduceTask(task);
	}

	public ProduceTaskDAO getProduceTaskDAO() {
		return produceTaskDAO;
	}

	public void setProduceTaskDAO(ProduceTaskDAO produceTaskDAO) {
		this.produceTaskDAO = produceTaskDAO;
	}

	@Override
	public boolean dailyWork(ProduceTask task) {
		return produceTaskDAO.dailyWork(task);
	}

}
