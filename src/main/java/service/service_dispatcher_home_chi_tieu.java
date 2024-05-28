package service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import database.interact_with_project;
import database.interact_with_user_parent_item;
import database.interact_with_user_project;
import database.intertact_with_item;
import utils.handle_date;

public class service_dispatcher_home_chi_tieu {
	public static int check_if_user_have_project(HttpServletRequest req, HttpServletResponse resp) {
		interact_with_user_project obj = new interact_with_user_project();
		int user_id = (Integer) req.getSession().getAttribute("user_id");
		return obj.check_if_user_have_project_or_not(user_id);
	}
	public static List<String> get_date_from_end(HttpServletRequest req, HttpServletResponse resp){
		interact_with_project obj = new interact_with_project();
		HttpSession session = req.getSession();
		int project_id = (Integer)session.getAttribute("project_id");
		return obj.get_from_and_to(project_id);
	}
	public static List<Float> current_and_max_money(HttpServletRequest req, HttpServletResponse resp){
		HttpSession session = req.getSession();
		int user_id = (Integer)session.getAttribute("user_id");
		int project_id = (Integer)session.getAttribute("project_id");
		List<Float> list = new ArrayList<Float>();
		interact_with_user_parent_item obj = new interact_with_user_parent_item();
		list.add(obj.get_current_money_of_project(user_id, project_id));
		interact_with_project obj1 = new interact_with_project();
		list.add(obj1.get_max_money_of_project(project_id));
		return list;
	}
	public static List<Float> get_current_total_money_for_4_parent_item(HttpServletRequest req, HttpServletResponse resp){
		HttpSession session = req.getSession();
		int user_id = (Integer)session.getAttribute("user_id");
		int project_id = (Integer)session.getAttribute("project_id");
		interact_with_user_parent_item obj = new interact_with_user_parent_item();
		return obj.get_current_total_money_in_home_chi_tieu(user_id, project_id);
	}
	public static List<String> get_week_contain_current_date(){
		return handle_date.current_week_contain_current_date();
	}
	public static List<Float> get_money_in_week(HttpServletRequest req, HttpServletResponse resp){
		HttpSession session = req.getSession();
		int user_id = (Integer)session.getAttribute("user_id");
		int project_id = (Integer)session.getAttribute("project_id");
		intertact_with_item obj = new intertact_with_item();
		return obj.money_of_date_in_week(user_id, project_id);
	}
	
}
