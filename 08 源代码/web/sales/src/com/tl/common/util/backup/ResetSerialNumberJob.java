package com.tl.common.util.backup;


import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.quartz.JobExecutionContext;
import org.springframework.scheduling.quartz.QuartzJobBean;

import com.tl.resource.business.WaitWorksInforService;
import com.tl.resource.business.WaitWorksInforServiceImp;
import com.tl.resource.dao.SystemRunDao;
import com.tl.resource.dao.TBillsCodeDefDAO;
import com.tl.resource.dao.pojo.SystemRun;

public class ResetSerialNumberJob extends QuartzJobBean {
	private JobData jobData;

	private SystemRunDao systemRunDao;
	
	private TBillsCodeDefDAO billsCodeDefDAO;


	public TBillsCodeDefDAO getBillsCodeDefDAO() {
		return billsCodeDefDAO;
	}



	public void setBillsCodeDefDAO(TBillsCodeDefDAO billsCodeDefDAO) {
		this.billsCodeDefDAO = billsCodeDefDAO;
	}



	public SystemRunDao getSystemRunDao() {
		return systemRunDao;
	}



	public void setSystemRunDao(SystemRunDao systemRunDao) {
		this.systemRunDao = systemRunDao;
	}



	protected void executeInternal(JobExecutionContext arg0) {
		
		SystemRun systemRun = systemRunDao.getSystemRunInfo();
		String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		if(systemRun.getStartTime()==null){
			systemRunDao.updateStartTimeTime(date);
		}
		if(systemRun.getLastResetTime()==null){
			systemRunDao.updateLastResetTime(date);
		}
		Calendar calendar = Calendar.getInstance();
		int y1 = calendar.get(Calendar.YEAR);
		calendar.setTime(systemRunDao.getLastResetTime());
		int y2 = calendar.get(Calendar.YEAR);
		if(y1>y2){
			systemRunDao.updateLastResetTime(date);
			billsCodeDefDAO.resetNum();
		}
	}

	

	public JobData getJobData() {
		return jobData;
	}

	public void setJobData(JobData jobData) {
		this.jobData = jobData;
	}

	
}