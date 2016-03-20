package com.tl.common.util.sys;

import java.io.File;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import com.tl.common.util.ClassPath;
import com.tl.common.util.GenerateSerial;
import com.tl.resource.dao.LogInfoDao;
import com.tl.resource.dao.pojo.LogInfo;

public class SysTryManage {
	private LogInfoDao logInfoDao;
	private static final int DAYS = 90;

	/**
	 * 
	 * @return true no over,false be over;
	 */
	public int validSystemTryDate(){
		Date fdate = getProgramCreateDate();
		Date ldate = logInfoDao.getLastUsedSysDate();
		if(fdate == null){// 如果标示文件被删除，第一次使用，记录第一时间
			LogInfo logInfo = new LogInfo();
			logInfo.setLogId(GenerateSerial.getUUID());
			logInfo.setLogType(100);
			logInfo.setLogDate(new Timestamp(System.currentTimeMillis()));
			try {
				logInfoDao.insertLogInfo(logInfo);
			} catch (Exception e) {
				e.printStackTrace();
			}
//			return DAYS;
			return 0;
		}
		long curr = new Date().getTime();
		if(ldate != null && ldate.getTime() > curr){// 如果最后记录时间大于系统时间，说明系统时间修改了
			return 0;
		}
		if(ldate == null){ldate = new Timestamp(System.currentTimeMillis()); }
		int days = 0;
		if(ldate.getTime() < System.currentTimeMillis()){
			days = DAYS - (int) ((curr - fdate.getTime()) / 1000 / 60 / 60 / 24);
			if( days > DAYS){// 如果使用系统天数，大于试用期，则返回
				return 0;
			}else{// 如果当前还在试用期内，则记录
				LogInfo logInfo = new LogInfo();
				logInfo.setLogId(GenerateSerial.getUUID());
				logInfo.setLogType(100);
				logInfo.setLogDate(new Timestamp(System.currentTimeMillis()));
				logInfo.setContent("login");
				try {
					logInfoDao.insertLogInfo(logInfo);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return days;
	}

	public LogInfoDao getLogInfoDao() {
		return logInfoDao;
	}

	public void setLogInfoDao(LogInfoDao logInfoDao) {
		this.logInfoDao = logInfoDao;
	}

	public Date getProgramCreateDate() {
		Map pathMap = ClassPath.getEnv();
		String osDir = (String) pathMap.get("windir");
		File f = new File(osDir + "\\syscreateinfor.txt");
		return new Date(f.lastModified());
	}
}
