package com.tl.common.util.backup;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Properties;

import org.quartz.JobExecutionContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.quartz.QuartzJobBean;

import com.tl.common.ControlFileCount;
import com.tl.common.util.ClassPath;
import com.tl.common.util.DesUtils;

public class BackupDatabaseJob extends QuartzJobBean {
	private JobData jobData;
	/** 默认备份路径 **/
	private static final String _mysql_bin_path = "mysql-5.1.46-win32\\bin\\mysqldump";
	private String serverPath;

	protected void executeInternal(JobExecutionContext arg0) {
		ClassPathResource res = new ClassPathResource("applicationContext.xml");
		try {
			String path = res.getFile().getAbsolutePath();
			serverPath = getServerDir(path);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println(jobData.getData() + " 第一个已经被执行了！！");
		backup();
	}

	private String getServerDir(String actionPath) {
		String[] strs = actionPath.split("\\\\");
		StringBuffer p = new StringBuffer(100);
		for (int i = 0; i < strs.length; i++) {
			if (strs[i].indexOf("tomcat") > 0) {
				p.append(strs[i]);
				break;
			}
			p.append(strs[i]).append("\\");
		}
		return p.toString();
	}

	public String backup() {
		String cmd = "";// mysql路径
		String dir = "";// 执行备份的目录
		String username = null;// mysql的用户名
		String password = null;// mysql的密码
		String database = null;
		String mysql = "";// mysql路径
		/** 得到环境变量中tomact路径 **/
		Map pathMap = ClassPath.getEnv();
		/**
		 * 判断环境变量中tomact路径(CATALINA_HOME)是否存在,如果存在则将备份路径设置为%CATALINA_HOME%\
		 * webapps\ROOT\backup\
		 **/

		String backup_path = serverPath + "\\webapps\\ROOT\\data_backup";
		/** mysql路径 **/
		// String[] str = pathMap.get("CATALINA_HOME").toString().split("\\");
		mysql = ControlFileCount.getUpFolder(serverPath) + _mysql_bin_path;
		/** 数据库配置文件的路径 **/
		String mysql_properties_path = serverPath
				+ "\\webapps\\ROOT\\WEB-INF\\classes\\MysqlConfig.properties";
		if (ControlFileCount.loadProperties(mysql_properties_path) != null) {
			Properties pro = ControlFileCount.loadProperties(mysql_properties_path);
			username = pro.getProperty("username");
			password = pro.getProperty("password");
			if(password != null && !"".equals(password)){
				try {
					password = new DesUtils("qilianghaogeqiu").decrypt(password);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			String[] arr = pro.getProperty("url").split("\\/");
		    arr = arr[arr.length - 1].split("\\?");
		    database = arr[0];
		    if(pro.getProperty("mysqldump")!=null){//mysqldump路径
		    	mysql = pro.getProperty("mysqldump");
		    }
		}
		if (!ControlFileCount.FolderExit(backup_path)) {
			ControlFileCount.createFolder(backup_path);
		}
		dir = backup_path;
		/** 开始向指定目录备份数据 **/
		if (!dir.substring(dir.length() - 1).equals(File.separator)) {
			dir += File.separator;
		}
		dir += "bak_"
				+ new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date())
				+ ".sql";
		cmd = "\"" + mysql + "\" -u " + username + " --password=" + password + " --add-drop-table --complete-insert " + database + " > " + dir;
		//cmd = "\"C:\\Program Files\\MySQL\\MySQL Server 5.1\\bin\\mysqldump\" -uroot --password=cuicui cut_tools5 >" + dir;
		try {
			System.out.println(cmd);
			Process p = Runtime.getRuntime().exec("cmd /c" + cmd);
			p.waitFor();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		/** 数据备份结束 **/
		/** 删除超过七天的数据备份文件 **/
		ControlFileCount.fileCount(backup_path);
		return dir;
	}

	public JobData getJobData() {
		return jobData;
	}

	public void setJobData(JobData jobData) {
		this.jobData = jobData;
	}

	public String getServerPath() {
		return serverPath;
	}

	public void setServerPath(String serverPath) {
		this.serverPath = serverPath;
	}
	
}