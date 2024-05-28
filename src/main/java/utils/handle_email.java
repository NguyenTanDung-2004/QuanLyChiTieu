package utils;

import java.net.PasswordAuthentication;
import java.util.Properties;
import java.util.Random;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class handle_email {
	public static int send_email(String email, String Subject, String Body) {
		// Thông tin tài khoản email nguồn (email A)
        final String username = "tandungnguyen918@gmail.com";
        final String password = "oese kloq vtgv mxii";

        // Thông tin tài khoản email đích (email B)

        // Cấu hình properties cho session
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com"); // Thay đổi nếu sử dụng email provider khác
        props.put("mail.smtp.port", "587"); // Thay đổi nếu sử dụng cổng khác
        props.put("mail.smtp.ssl.trust", "*");
        // Tạo đối tượng Session với thông tin xác thực
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                return new javax.mail.PasswordAuthentication(username, password);
            }
        });

        try {
            // Tạo đối tượng MimeMessage
            Message message = new MimeMessage(session);
            
            // Đặt thông tin người gửi (email A)
            message.setFrom(new InternetAddress(username));
            
            // Đặt thông tin người nhận (email B)
            

            // Gửi email
            	message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
                
                // Đặt chủ đề của email
                message.setSubject(Subject);
                
                // Đặt nội dung của email
                message.setText(Body);
            	 Transport.send(message);

            return 1;

        } catch (MessagingException e) {
           return 0;
        }
	}
	public static void send_code(String email, HttpServletRequest req) {
		Random rd = new Random();
		int x1 = rd.nextInt(9 - 1 + 1) + 1;
		int x2 = rd.nextInt(9 - 0 + 1) + 0;
		int x3 = rd.nextInt(9 - 0 + 1) + 0;
		int x4 = rd.nextInt(9 - 0 + 1) + 0;
		String code = x1 + "" + x2 + "" + x3 + "" + x4;
		HttpSession session = req.getSession();
		session.setAttribute("code", code);
		send_email(email, "RESET YOUR PASSWORD IN MONEY KEEPER!", "This is your code: " + code);
	}
}
