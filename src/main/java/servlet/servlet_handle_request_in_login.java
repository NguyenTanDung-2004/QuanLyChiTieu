package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.service_handle_request_in_login;

public class servlet_handle_request_in_login extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String action = req.getParameter("action");
		// check email in register
		if (action.equals("check_email_in_register")) {
			String email = req.getParameter("input");
			service_handle_request_in_login.check_email_in_register(email, resp, req);
		}
		// create account
		if (action.equals("create_account")) {
			service_handle_request_in_login.create_user(resp, req);
		}
		// login
		if (action.equals("login")){
			service_handle_request_in_login.login(resp, req);
		}
		// email in forgot
		if (action.equals("email_forgot")) {
			service_handle_request_in_login.check_email_forgot(resp, req);
		}
		// code in forgot
		if (action.equals("code")) {
			service_handle_request_in_login.check_code(resp, req);
		}
		//confirm forgot
		if (action.equals("confirm_forgot")) {
			service_handle_request_in_login.update_password(resp, req);
		}
	}
}
