package service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import database.interact_with_project;
import database.interact_with_user;
import utils.encrypt_password;
import utils.handle_email;

public class service_handle_request_in_login {
	public static void send_response(String response_content, HttpServletResponse resp) {
		Gson gson = new Gson();
	    resp.setCharacterEncoding("UTF-8");
	    try {
	    	String json_resp = gson.toJson(response_content);
			resp.getWriter().write(json_resp);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void check_email_in_register(String email, HttpServletResponse resp, HttpServletRequest req) {
		interact_with_user obj = new interact_with_user();
		if (obj.check_email_exist(email) == 0) {
			send_response("successfully", resp);
		}
		else {
			send_response("fail", resp);
		}
	}
	
	public static void create_user(HttpServletResponse resp, HttpServletRequest req) {
		String email = req .getParameter("email");
		String password = req.getParameter("password");
		interact_with_user obj = new interact_with_user();
		obj.insert_user(email, encrypt_password.ecrypt_to_SHA1(password));
		send_response("successfully", resp);
	}
	
	public static void login(HttpServletResponse resp, HttpServletRequest req) {
		String email = req .getParameter("email");
		String password = req.getParameter("password");
		interact_with_user obj = new interact_with_user();
		if (obj.check_email_exist(email) == 0) {
			send_response("email", resp);
			return;
		}
		if (obj.check_password_with_email(email, encrypt_password.ecrypt_to_SHA1(password)) == 0) {
			send_response("password", resp);
			return;
		}
		send_response("successfully", resp);
		HttpSession session = req.getSession();
		session.setAttribute("user_id", obj.get_id_user(email));
		interact_with_project obj1 = new interact_with_project();
		if (obj1.get_max_project_id_of_user(obj.get_id_user(email)) > 0) {
			session.setAttribute("project_id", obj.get_id_user(email));
		}
		System.out.println(session.getAttribute("user_id"));
		System.out.println(session.getAttribute("project_id"));
	}
	
	public static void check_email_forgot(HttpServletResponse resp, HttpServletRequest req) {
		String email = req.getParameter("email");
		interact_with_user obj = new interact_with_user();
		if (obj.check_email_exist(email) == 1) {
			handle_email.send_code(email, req);
			send_response("successfully", resp);
		}
		else {
			send_response("fail", resp);
		}
	}
	
	public static void check_code(HttpServletResponse resp, HttpServletRequest req) {
		String code = req.getParameter("code");
		String code_session = (String)req.getSession().getAttribute("code");
		if (code.equals(code_session)) {
			send_response("successfully", resp);
			req.getSession().removeAttribute("code");
		}
		else {
			send_response("fail", resp);
		}
	}
	
	public static void update_password(HttpServletResponse resp, HttpServletRequest req) {
		String email = req.getParameter("email_forgot");
		String password = req.getParameter("password_forgot");
		interact_with_user obj = new interact_with_user();
		obj.update_password(encrypt_password.ecrypt_to_SHA1(password), email);
		send_response("successfully", resp);
	}
}