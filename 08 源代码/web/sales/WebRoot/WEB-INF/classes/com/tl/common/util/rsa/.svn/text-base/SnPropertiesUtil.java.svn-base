package com.tl.common.util.rsa;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

public class SnPropertiesUtil {
	public static final String fileName = "osconfig.properties";
    public static String readProperty(String tomcatHome,String key){
    	Properties prop = new Properties(); 
	     try { 
	      //Map pathMap = ClassPath.getEnv();
	     // String ch = pathMap.get("CATALINA_HOME") == null ? "" : pathMap.get("CATALINA_HOME").toString();
	      String path = tomcatHome + "\\bin\\";
	      System.out.println("2:" + path + fileName);
	      InputStream fis = new FileInputStream(path + fileName); 
	       prop.load(fis); 
	      
	     } catch (IOException e) { 
	        e.printStackTrace();
	     } 
	     return (String) prop.get(key);
    }
    public static void updateProperty(String serPath,String key,String value){
    	String tomcatHome = getTomcatDir(serPath);
    	Properties prop = new Properties(); 
    	try {
    		//Map pathMap = ClassPath.getEnv();
    		//String ch = pathMap.get("CATALINA_HOME") == null ? "" : pathMap.get("CATALINA_HOME").toString();
    	   String path = tomcatHome + "\\bin\\";
           InputStream fis = new FileInputStream(path + fileName); 
 	       prop.load(fis); 
		   OutputStream fos = new FileOutputStream(path + fileName);
		   prop.setProperty(key, value); 
		   prop.store(fos, "Update '" + key + "' value"); 
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
    	 
    }
    public static String getTomcatDir(String actionPath){
		String [] strs = actionPath.split("\\\\");
		StringBuffer p = new StringBuffer(100);
		for (int i = 0; i < strs.length; i++) {
			if(strs[i].indexOf("tomcat") > 0){
				p.append(strs[i]).append("\\");
				break;
			}
			p.append(strs[i]).append("\\");
		}
		return p.toString();
	}
}
