package com.tl.resource.dao;

import com.tl.resource.dao.pojo.ProduceTask;

public interface ProduceTaskDAO {
	public boolean doProduceTask(ProduceTask task);

	public boolean dailyWork(ProduceTask task);
}
