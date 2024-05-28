package service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import database.interact_with_project;
import database.interact_with_user_parent_item;
import database.interact_with_user_project;

public class service_handle_request_from_home_chi_tieu {
	public static void handle_insert_project(HttpServletRequest req, HttpServletResponse resp) {
		String name = req.getParameter("name");
		String max_money = req.getParameter("max_money");
		float money = Float.parseFloat(max_money);
		String end_date = req.getParameter("date");
		interact_with_project obj = new interact_with_project();
		obj.insert_project(name, money, end_date);
		interact_with_user_project obj1 = new interact_with_user_project();
		obj1.insert_user_project((Integer)req.getSession().getAttribute("user_id"), obj.current_project_id);
		interact_with_user_parent_item obj2 = new interact_with_user_parent_item();
		obj2.insert((Integer)req.getSession().getAttribute("user_id"), obj.current_project_id);
		HttpSession session = req.getSession();
		session.setAttribute("project_id", obj.current_project_id);
		send_response("successfully", resp);
	}
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
}
