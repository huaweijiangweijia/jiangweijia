package com.tl.common.util.sys;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.tl.common.smartupload.Constant;
import com.tl.common.smartupload.File;
import com.tl.common.smartupload.SmartUpload;
import com.tl.common.smartupload.SmartUploadException;
import com.tl.common.util.GenerateSerial;

public class SysUpdateUtil {
	private String targetDir = null;
	private String serverDir = null;
	private String proDir = null;
	public String importSysFile(HttpServletRequest request,
			HttpServletResponse response) {
		arriFile(request, response);
		try {
			String[] dirArr = serverDir.split("\\" + java.io.File.separator);
			StringBuffer proDir2 = new StringBuffer(100);
			for (int i = 0; i < dirArr.length - 3; i++) {
				proDir2.append(dirArr[i]).append("\\");
			}
			proDir = proDir2.toString();
			OpCmd pc = new OpCmd(serverDir,targetDir,proDir);
			 Thread t1 = new Thread(pc); 
			 t1.start();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;
	}

	private void arriFile(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			serverDir = request.getSession().getServletContext().getRealPath("");
			String folderName = request.getSession().getServletContext().getRealPath(Constant.SYSTEM_STEP_FILE_DIR);
			java.io.File file = new java.io.File(folderName);
			if(!file.exists()) {
				file.mkdir();
			}
			String realPath = folderName + java.io.File.separator;
			SmartUpload su = null;
			HttpSession session = request.getSession();
			ServletContext application = session.getServletContext();
			su = new SmartUpload();
			su.initialize(application, session, request, response, null);
			su.upload();
			String[] filePaths = fileUpload(su,realPath);
			for (int i = 0; i < filePaths.length; i++) {
				String arr[] = filePaths[i].split("\\" + java.io.File.separator);
				arr = arr[arr.length - 1].split("\\.");
				String dirName = arr[0];
		        Unzip.unzipFile(filePaths[i], realPath + java.io.File.separator + dirName);
		        targetDir = realPath  + dirName;
			}
		} catch (ServletException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SmartUploadException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public String impDatabase(HttpServletRequest request,HttpServletResponse response) {
		arriFile(request, response);
		String[] dirArr = serverDir.split("\\" + java.io.File.separator);
		StringBuffer proDir2 = new StringBuffer(100);
		for (int i = 0; i < dirArr.length - 3; i++) {
			proDir2.append(dirArr[i]).append("\\");
		}
		proDir = proDir2.toString();
		try {
			String cmd = proDir.toString() + "mysql-5.1.46-win32\\bin\\mysql -h127.0.0.1 -uroot -ptldj2010-456-st cut_tools5 < " + targetDir + "\\updateDatabase.sql";
			Process process = Runtime.getRuntime().exec("cmd.exe /c " + cmd);
			String err = readInputStream(process.getErrorStream()); 
			System.out.println(err);
			String rt = readInputStream(process.getInputStream());
			System.out.println(rt);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	public String[] fileUpload(SmartUpload su, String filePath) {
		File suFile = null;
	    int fileCount = 0;
	    try {
	        String fileExt = "";
	        int fileSize = 0;
	        String AllowedExtensions = Constant.ALLOWEDEXTENSIONS;//允许上传的文件类型
	        double maxFileSize = Constant.MAXFILESIZE;//单文件最大大小，单位KB
	        //校验文件类型和大小
	        for (int i=0; i<su.getFiles().getCount();i++) {
	            suFile = su.getFiles().getFile(i);
	            if (suFile.isMissing())
	                continue;
	            //校验文件大小
	            fileSize = suFile.getSize()/1024;//字节转换成KB
	            if(fileSize==0) fileSize=1;
	            if(maxFileSize<fileSize) throw new Exception("单个上传文件的容量不能超过["+maxFileSize+"KB]");
	
	            //校验文件类型
	            if (suFile.getFileExt() == null
	                    || "".equals(suFile.getFileExt())) {
	                fileExt = ",,";
	            } else {
	                fileExt = "," + suFile.getFileExt().toLowerCase() + ",";
	            }
	            if (!"".equals(AllowedExtensions)
	                    && AllowedExtensions.indexOf(fileExt) == -1) {
	                throw new Exception("您上传的文件[" + suFile.getFileName()
	                        + "]的类型为系统禁止上传的文件类型，不能上传！");
	            }
	            fileCount++;
	        }
	        if (fileCount==0) throw new Exception("请选择上传的文件");
	        //准备保存文件
	        //这里填写项目中存放上传文件的物理路径
	       
	        String[] path = new String[su.getFiles().getCount()];
	        for (int i = 0,len = su.getFiles().getCount(); i < len;i++) {
	        	String id = GenerateSerial.getUUID();
	        	path[i] = new StringBuffer(filePath).append(id).append(".").append(suFile.getFileExt()).toString();
	        	suFile = su.getFiles().getFile(i);
	            suFile.saveAs(path[i],SmartUpload.SAVE_PHYSICAL);//保存文件
	        }
	        return path;
	    }catch(Exception e){
	    	e.printStackTrace();
	    }
	    return null;
	}
	private static String readInputStream(InputStream is) throws IOException {  
		StringBuffer bs = new StringBuffer(1024);
	    InputStreamReader isr = new InputStreamReader(is);  
	    BufferedReader br = new BufferedReader(isr);  
	      
	    String line = null;  
	    while((line = br.readLine()) != null) {  
	    	//bs.append(line);
	    	System.out.println(line);
	    }  
	    return bs.toString();
	}
	
}
class OpCmd implements Runnable{
	private String serverDir;
	private String targetDir;
	private String proDir;
	public OpCmd(String serverDir,String targetDir,String proDir){
		this.serverDir = serverDir;
		this.targetDir = targetDir;
		this.proDir = proDir;
	}
	@Override
	public void run() {
		// TODO Auto-generated method stub
		try {
			System.out.println("cmd.exe /c " + serverDir + "\\upload\\sysstep\\sysstep.bat " + targetDir + " " + serverDir + " " + proDir.toString());
			Process process = Runtime.getRuntime().exec("cmd.exe /c " + serverDir + "\\upload\\sysstep\\sysstep.bat " + targetDir + " " + serverDir + " " + proDir.toString());
			String rt = readInputStream(process.getInputStream());
			System.out.println(rt);
			String err = readInputStream(process.getErrorStream()); 
			System.out.println(err);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	private String readInputStream(InputStream is) throws IOException {  
		StringBuffer bs = new StringBuffer(1024);
	    InputStreamReader isr = new InputStreamReader(is);  
	    BufferedReader br = new BufferedReader(isr);  
	      
	    String line = null;  
	    while((line = br.readLine()) != null) {  
	    	//bs.append(line);
	    	System.out.println(line);
	    }  
	    return bs.toString();
	}
}
