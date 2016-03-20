package com.tl.common.util;

import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.security.Key;

import javax.crypto.Cipher;

import com.tl.common.context.SystemInstance;

import sun.misc.BASE64Decoder;


public class RsaUtil {
//	/private static String ALGORITHM = "RSA";
//	private static String PRIVATE_KEY_FILE = SystemInstance.getInstance().getAppContext().get
//	static {
//	    try {
//	        System.loadLibrary("chilkat");
//	    } catch (UnsatisfiedLinkError e) {
//	      System.err.println("Native code library failed to load.\n" + e);
//	      System.exit(1);
//	    }
//	  }
//	public String encryptStringENC(String text){
//		CkRsa rsaEncryptor = new CkRsa();
//		boolean success = rsaEncryptor.UnlockComponent("Anything for 30-day trial");
//		if (success != true) {
//	        System.out.println("RSA component unlock failed");
//	        return null;
//	    }
//		rsaEncryptor.put_EncodingMode("hex");
//		String publicKey = "<RSAKeyValue><Modulus>ykD7uzC13zQobcjP5z7yNXtZbcypdD6odmnPpkET5DoZUJeRT/IByrsIOLJIcyPF/yZFuJVGJG1j6qkycVWClBkYdZPH3ZW6HnvD4gkPA9Tqhaix730/+iybYzI6ErlJAfxGUKani7q+I3jsxN7H2rYnc9E5gfwULArMJqlur+s=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
//		rsaEncryptor.ImportPublicKey(publicKey );
//		boolean usePrivateKey = false;
//		String encryptedStr = rsaEncryptor.encryptStringENC(text,usePrivateKey);
//		return (encryptedStr);
//	}
//	public String decryptStringENC(String sn){
//		CkRsa rsaDecryptor = new CkRsa();
//    	rsaDecryptor.UnlockComponent("Anything for 30-day trial");
//    	String clientKey = "<RSAKeyValue><Modulus>ykD7uzC13zQobcjP5z7yNXtZbcypdD6odmnPpkET5DoZUJeRT/IByrsIOLJIcyPF/yZFuJVGJG1j6qkycVWClBkYdZPH3ZW6HnvD4gkPA9Tqhaix730/+iybYzI6ErlJAfxGUKani7q+I3jsxN7H2rYnc9E5gfwULArMJqlur+s=</Modulus><Exponent>AQAB</Exponent><P>0vImDiV81UTgxFQSkAfzS8O+53ciGIcTqcrNRCZ3d6yImbwON/KHhlBLEky9wABfGhBG53bn3u0j0tsgsmLIKw==</P><Q>9XOUtEuBeG1Rn0MwzzEmYxkuXgzHBzqkhQLaJ2HPivSx90twditpZfO57RBtdaEiuAmTFt9dEVMPGaVPfhoXQQ==</Q><DP>q5f86t8Fx/qqmCoHm5BMEiKeJW2cl7UxgpoNFdXwsrHvwJbgPhSUt+aS2sUASbJDqlD5TIpGHeprjLdhxppiVw==</DP><DQ>7srenjVjJVU9dnM49in8Dac+6/MEYq0Tx+/Ja00GTErZJRy4sc50QOLIPLGhvDHjBCcUecke0y76XtnsJ2OcwQ==</DQ><InverseQ>cleKnSmKaTPeCvsYxxr71GzOpleIHG+fXzvDvpxEhiwVNt/2iyXvJUJznIQ3ZLp2z7oI1lsOhfEaNcXffpD8HA==</InverseQ><D>PyEZccw6eHjnRZ0wh5V2NItT1pnTKp2EJ7HPRq15b/tSe31Ttghr1sOaRVgglQ/NdV6U1JCDXEtorI4zWHzATLszjmxZGUh6cI77HmsUgglupOoQK5xzFFYMKVhTlqpkpDItYYyaJt/b7jczQ1swxP4p4KGanCtc9p0mNMZ7dAE=</D></RSAKeyValue>";  
//	    rsaDecryptor.put_EncodingMode("hex");
//	    rsaDecryptor.ImportPrivateKey(clientKey);
//	    boolean usePrivateKey = true;
//	    String decryptedStr;
//	    decryptedStr = rsaDecryptor.decryptStringENC(sn,usePrivateKey);
//	    return (decryptedStr);
//	}
//	public String decryptStringENC(String cryptograph)throws Exception {
//		ObjectInputStream ois = new ObjectInputStream(new FileInputStream(PRIVATE_KEY_FILE));
//		Key key = (Key) ois.readObject();
//		Cipher cipher = Cipher.getInstance(ALGORITHM);
//		cipher.init(Cipher.DECRYPT_MODE, key);
//		BASE64Decoder decoder = new BASE64Decoder();
//		byte[] b1 = decoder.decodeBuffer(cryptograph);
//		byte[] b = cipher.doFinal(b1);
//		return new String(b);
//	}
}
