package com.tl.resource.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.common.util.backup.BackupDatabaseJob;
import com.tl.common.util.sys.SysUpdateUtil;
import com.tl.common.util.sys.Unzip;

public class DataBackupImpAction extends DispatchAction {
	public ActionForward downloadDatabaseFile(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		BackupDatabaseJob bdj = new BackupDatabaseJob();
		String path = request.getSession().getServletContext().getRealPath("");
		File serverFile = new File(path);
		bdj.setServerPath(serverFile.getParentFile().getParentFile().getAbsolutePath());
		String fpath = bdj.backup();
		File f = new File(fpath);
		File tf = new File(f.getParentFile().getPath() + "\\temp");
		if(!tf.exists()){
			tf.mkdir();
		}
		tf = new File(tf.getPath() + "\\updateDatabase.sql");
		if(tf.exists()){
			tf.delete();
		}
		f.renameTo(tf);
		tf.setReadable(true);
		tf.setWritable(true);
		tf = null;
		String sourceFileName = f.getParentFile().getPath() + "\\temp";
		String targetFileName = f.getParentFile().getPath() + "\\backup.zip";
		Unzip.zipFile(sourceFileName, targetFileName);
		FileInputStream fis = new FileInputStream(new File(targetFileName));
		byte[] b = new byte[1024];
		response.setContentType("application/x-msdownload");
		response.setHeader("Content-Disposition", "attachment; filename=backup.zip");
		ServletOutputStream sout = response.getOutputStream();
		int c = 0;
		while((c = fis.read(b)) > 0){
			sout.write(b, 0, c);
		}
		sout.flush();
		
		return null;
	}
	
	public ActionForward impDatabase(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		String agent = request.getHeader("USER-AGENT");
		SysUpdateUtil suu = new SysUpdateUtil();
		String error = suu.impDatabase(request, response);
		String resultStr = "{success : true, msg : '数据上传成功！'}";
		if(error != null) {
		    resultStr = "{success : false, msg : '" + error + "'}";
		}
		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();
		return null;
	}
}
