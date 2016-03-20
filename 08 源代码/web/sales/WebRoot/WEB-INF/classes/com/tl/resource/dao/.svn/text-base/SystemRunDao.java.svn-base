package com.tl.resource.dao;


import java.util.Date;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.tl.resource.dao.pojo.SystemRun;


public class SystemRunDao extends SqlMapClientDaoSupport {



	public java.sql.Timestamp getStartTime() {
		
		return (java.sql.Timestamp) this.getSqlMapClientTemplate().queryForObject(
		"SystemRun.getStartTime");
	}
	
	public java.sql.Timestamp getLastResetTime() {
		
		return (java.sql.Timestamp) this.getSqlMapClientTemplate().queryForObject(
		"SystemRun.getLastResetTime");
	}

	public void updateLastResetTime(String date) {
		this.getSqlMapClientTemplate().update("SystemRun.updateLastResetTime",date);
	}
	
	public void updateStartTimeTime(String date) {
		this.getSqlMapClientTemplate().update("SystemRun.updateStartTime",date);
	}

	public SystemRun getSystemRunInfo() {
		return (SystemRun)this.getSqlMapClientTemplate().queryForObject("SystemRun.getSystemRunInfo");
	}
}
