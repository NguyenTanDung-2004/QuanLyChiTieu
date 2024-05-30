package service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import database.interact_with_project;
import database.interact_with_user_parent_item;
import database.interact_with_user_project;

public class service_handle_request_from_history {
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
		send_response("successfully", resp);
	}
	public static void update_project(HttpServletRequest req, HttpServletResponse resp) {
		int project_id = Integer.parseInt((String)req.getParameter("project_id"));
		String name = (String)req.getParameter("name");
		float money = Float.parseFloat((String)req.getParameter("money"));
		String date = (String)req.getParameter("date");
		interact_with_project obj = new interact_with_project();
		obj.update_project(project_id, name, money, date);
		System.out.println("nguyentandung");
		send_response("successfully", resp);
	}
	public static void delete_project(HttpServletRequest req, HttpServletResponse resp) {
		int project_id = Integer.parseInt((String)req.getParameter("project_id"));
		interact_with_user_project obj = new interact_with_user_project();
		obj.delete_user_project(project_id);
		obj.delete_user_item(project_id);
		obj.delete_user_parent_item(project_id);
		obj.delete_project(project_id);
		HttpSession session = req.getSession();
		if ((Integer)session.getAttribute("project_id") != null && (Integer)session.getAttribute("project_id") == project_id) {
			session.removeAttribute("project_id");
		}
		send_response("successfully", resp);
	}
	public static void choose_project(HttpServletRequest req, HttpServletResponse resp) {
		int project_id = Integer.parseInt((String)req.getParameter("project_id"));
		HttpSession session = req.getSession();
		session.setAttribute("project_id", project_id);
		session.setAttribute("home_chi_tieu_from_history", "true");
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
