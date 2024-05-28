package utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

public class encrypt_password {
	private static String add = "asdfasdfasd;@asdfasdfasd.?";
	public static String ecrypt_to_SHA1(String str) {
		String result = null;
        String s = str + add;
        try {
            byte[] dataToByte = s.getBytes(StandardCharsets.UTF_8);
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] hashBytes = md.digest(dataToByte);
            result = Base64.getEncoder().encodeToString(hashBytes);
        } catch (Exception e) {
            System.out.println(e);
        }
        return result;
	}
}
