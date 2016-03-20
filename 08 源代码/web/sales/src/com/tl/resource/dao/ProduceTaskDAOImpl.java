package com.tl.resource.dao;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.tl.resource.dao.pojo.ProduceTask;

public class ProduceTaskDAOImpl extends SqlMapClientDaoSupport implements
		ProduceTaskDAO {

	public ProduceTaskDAOImpl() {
		super();
	}

	@Override
	public boolean doProduceTask(ProduceTask task) {
		getSqlMapClientTemplate().update("t_produce_task.doProduceTask", task);
		return true;
	}

	@Override
	public boolean dailyWork(ProduceTask task) {
		getSqlMapClientTemplate().update("t_produce_task.dailyWork", task);
		return true;
	}

}
