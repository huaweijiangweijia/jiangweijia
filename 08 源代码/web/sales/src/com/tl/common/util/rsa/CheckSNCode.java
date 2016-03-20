package com.tl.common.util.rsa;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.security.Key;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Properties;

import javax.crypto.Cipher;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import sun.misc.BASE64Decoder;

import com.tl.common.util.ClassPath;

public class CheckSNCode {
	public static final String REGISTER_KEY = "key1";
	public static Properties keyPro = new Properties();
	static Logger log = Logger.getLogger(CheckSNCode.class);
	private static String ALGORITHM = "RSA";
	static{
		try {
			keyPro.load(CheckSNCode.class.getResourceAsStream("/key.properties"));
		} catch (IOException e) {
			log.error("未找到注册文件:key.properties");
		}
	}
	
	public boolean isBind(String code) {
		String regCode = keyPro.getProperty(REGISTER_KEY);
		if(StringUtils.isNotBlank(regCode)){
			try {
				if(code.equals(decryptStringENC(regCode))){
					return true;
				}
			} catch (Exception e) {
				log.error("解密注册码失败");
				return false;
			}
		}
		return false;
	}
	
	public boolean isBind(String regCode,String code) {
		if(StringUtils.isNotBlank(regCode)){
			try {
				if(code.equals(decryptStringENC(regCode))){
					return true;
				}
			} catch (Exception e) {
				log.error("解密注册码失败:" + e.getMessage());
				return false;
			}
		}
		return false;
	}
	
	private static String readInputStream(InputStream is) throws IOException {  
		StringBuffer bs = new StringBuffer(1024);
	    InputStreamReader isr = new InputStreamReader(is);  
	    BufferedReader br = new BufferedReader(isr);  
	      
	    String line = null;  
	    while((line = br.readLine()) != null) {  
	    	bs.append(line); 
	    }  
	    return bs.toString();
	}  
	private String getSetupDir(String actionPath){
		String [] strs = actionPath.split("\\\\");
		StringBuffer p = new StringBuffer(100);
		for (int i = 0; i < strs.length; i++) {
			if(strs[i].indexOf("tomcat") > 0){
				break;
			}
			p.append(strs[i]).append("\\");
		}
		return p.toString();
	}
	public String getProgramCreateDate(){
		Map pathMap = ClassPath.getEnv();
		String osDir = (String) pathMap.get("windir");
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		File f = new File(osDir + "\\syscreateinfor.txt");
		return df.format(new Date(f.lastModified()));
	}
	private String getNowDate() {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		return df.format(new Date());
	}
	
	private String decryptStringENC(String cryptograph)throws Exception {
		ObjectInputStream ois = new ObjectInputStream(CheckSNCode.class.getResourceAsStream("/PrivateKey"));
		Key key = (Key) ois.readObject();
		Cipher cipher = Cipher.getInstance(ALGORITHM);
		cipher.init(Cipher.DECRYPT_MODE, key);
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] b1 = decoder.decodeBuffer(cryptograph);
		byte[] b = cipher.doFinal(b1);
		ois.close();
		return new String(b);
	}
	
}
