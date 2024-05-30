package service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import database.interact_with_project;

public class service_dispatcher_history {
	public static List<List<Object>> get_all_project_of_user(HttpServletRequest req, HttpServletResponse resp){
		int user_id = (Integer)req.getSession().getAttribute("user_id");
		interact_with_project obj = new interact_with_project();
		return obj.all_project_of_user(user_id);
	}
}
