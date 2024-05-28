package service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import database.interact_with_user;

public class service_handle_continue_google {
	public static void handle_continue_google(String email, HttpServletRequest req, HttpServletResponse resp) {
		interact_with_user obj = new interact_with_user();
		if (obj.check_email_exist(email) == 1) {
			HttpSession session = req.getSession();
			session.setAttribute("user_id", obj.get_id_user(email));
		}
		else {
			obj.insert_user(email, email);
			HttpSession session = req.getSession();
			session.setAttribute("user_id", obj.get_id_user(email));
		}
		try {
			resp.sendRedirect("http://localhost:8080/QuanLyChiTieu/home_chi_tieu");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
