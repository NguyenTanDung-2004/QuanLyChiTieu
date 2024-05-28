package service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import database.interact_with_user_parent_item;
import database.intertact_with_item;

public class service_handle_request_from_show_all {
	public static void handle_add_item(HttpServletRequest req, HttpServletResponse resp) {
		String name = req.getParameter("name");
		String money = req.getParameter("money");
		String date = req.getParameter("date");
		String radio = req.getParameter("radio");
		String parent_id = req.getParameter("parent_id");
		intertact_with_item obj = new intertact_with_item();
		obj.insert_item(name, Float.parseFloat(money), Integer.parseInt(parent_id), radio, date);
		int user_id = (Integer)req.getSession().getAttribute("user_id");
		int project_id = (Integer)req.getSession().getAttribute("project_id");
		obj.insert_user_item(user_id, project_id);
		interact_with_user_parent_item obj1 = new interact_with_user_parent_item();
		obj1.update(user_id, project_id, Integer.parseInt(parent_id), Float.parseFloat(money), radio);
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
	public static void handle_reset_item(HttpServletRequest req, HttpServletResponse resp) {
		String name = (String)req.getParameter("name");
		float money = Float.parseFloat(req.getParameter("money"));
		int id_item = Integer.parseInt(req.getParameter("item_id"));
		intertact_with_item obj = new intertact_with_item();
		float old_money = obj.get_money_of_item(id_item);
		String date = (String)req.getParameter("date");
		String radio = (String)req.getParameter("radio");
		HttpSession session = req.getSession();
		int user_id = (Integer)session.getAttribute("user_id");
		int project_id = (Integer)session.getAttribute("project_id");
		int parent_id = Integer.parseInt(req.getParameter("parent_id"));
		if (radio.equals("subtract")) {
			money = -1 * money;
		}
		System.out.println(name + " " + money + " " + date + " " + radio + " " + id_item);
		obj.update_item(id_item, name, date, Math.abs(money), radio);
		interact_with_user_parent_item obj1 = new interact_with_user_parent_item();
		obj1.update1(user_id, project_id, parent_id, money - old_money, radio);
		send_response("successfully", resp);
	}
	
	public static void handle_delete_item(HttpServletRequest req, HttpServletResponse resp) {
		int id_item = Integer.parseInt(req.getParameter("item_id"));
		intertact_with_item obj = new intertact_with_item();
		float money = obj.get_money_of_item(id_item);
		interact_with_user_parent_item obj1 = new interact_with_user_parent_item();
		HttpSession session = req.getSession();
		int user_id = (Integer)session.getAttribute("user_id");
		int project_id = (Integer)session.getAttribute("project_id");
		int parent_id = Integer.parseInt(req.getParameter("parent_id"));
		obj1.update2(user_id, project_id, parent_id, money, "");
		obj.delete_user_item(id_item);
		obj.delete_item(id_item);
		send_response("successfully", resp);
	}
}
