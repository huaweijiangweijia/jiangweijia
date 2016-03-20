package com.tl.common.util;

import org.sf.feeling.swt.win32.internal.extension.Extension;

/**
* 获得操作系统的信息   。 
* @author 刘尧兴
* <p>2009-6-3</p>
*/
public class GetOSInfoApp {


	 public static String getMacID() {
	           int[] macs = Extension.GetMACAddress(0);
	           System.out.println("31="+macs);
	           StringBuffer stringBuffer = new StringBuffer();
	         for (int i = 0; i < macs.length; i++) {
	          stringBuffer.append(getHexString(macs[i], 2).toUpperCase());
	           if (i != macs.length - 1)
	            stringBuffer.append("-");
	        }
	        return stringBuffer.toString();
	 }
   /**
    * 将十进制转换成十六进制 。
    * @author 刘尧兴
    * @param value
    * @param length
    * @return String
   */
   public static String getHexString(int value, int length) {
       String valueStr = Integer.toHexString(value);
       if(valueStr.length() == length)
         return valueStr;
       if(valueStr.length() > length)
         return valueStr.substring(0, length);
       valueStr = "0000"+valueStr;
       return valueStr.substring(valueStr.length()-length);
     }
} 

