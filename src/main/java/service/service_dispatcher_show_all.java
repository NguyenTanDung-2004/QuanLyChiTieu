package service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import database.interact_with_project;
import database.interact_with_user_parent_item;

public class service_dispatcher_show_all {
	public static List<Integer> current_total_money_of_parent_item(HttpServletRequest req, HttpServletResponse resp){
		interact_with_user_parent_item obj = new interact_with_user_parent_item();
		HttpSession session = req.getSession();
		int user_id = (Integer)session.getAttribute("user_id");
		int project_id = (Integer)session.getAttribute("project_id");
		return obj.get_current_total_money_of_parent_item(user_id, project_id);
	}
	public static List<List<List<Object>>> get_all_item_in_parent_item(
		HttpServletRequest req, HttpServletResponse resp){
		HttpSession session = req.getSession();
		int user_id = (Integer)session.getAttribute("user_id");
		int project_id = (Integer)session.getAttribute("project_id");
		interact_with_user_parent_item obj = new interact_with_user_parent_item();
		return obj.get_all_item_in_parent_item(user_id, project_id);
	}
	public static List<String> from_and_to_date(HttpServletRequest req, HttpServletResponse resp){
		HttpSession session = req.getSession();
		int project_id = (Integer)session.getAttribute("project_id");
		interact_with_project obj = new interact_with_project();
		return obj.get_from_and_to(project_id);
	}
}
