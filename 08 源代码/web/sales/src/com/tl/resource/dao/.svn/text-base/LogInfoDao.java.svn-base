package com.tl.resource.dao;

import java.util.List;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.tl.common.util.PageInfo;
import java.util.Date;
import com.tl.resource.dao.pojo.LogInfo;

public class LogInfoDao extends SqlMapClientDaoSupport {

	@SuppressWarnings("unchecked")
	public List<LogInfo> getLogInfoWithPage(PageInfo pageInfo) throws Exception {

		return this.getSqlMapClientTemplate().queryForList(
				"LogInfo.getLogInfoWithPage", pageInfo);
	}

	public int getLogInfoCount() throws Exception {

		return Integer.parseInt(this.getSqlMapClientTemplate().queryForObject(
				"LogInfo.getLogInfoCount").toString());
	}

	public Object insertLogInfo(LogInfo logInfo) throws Exception {

		return this.getSqlMapClientTemplate().insert("LogInfo.insertLogInfo", logInfo);
	}

	public java.sql.Timestamp getFirstUsedSysDate() {
		
		return (java.sql.Timestamp) this.getSqlMapClientTemplate().queryForObject(
		"LogInfo.getFirstUsedSysDate");
	}

	public java.sql.Timestamp getLastUsedSysDate() {
		// TODO Auto-generated method stub
		return (java.sql.Timestamp) this.getSqlMapClientTemplate().queryForObject(
		"LogInfo.getLastUsedSysDate");
	}

}
