package com.tl.resource.business;

import com.tl.resource.dao.pojo.ProduceTask;

public interface ProduceTaskService {
	public boolean doProduceTask(ProduceTask task);

	public boolean dailyWork(ProduceTask task);
}
