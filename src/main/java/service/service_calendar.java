package service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import database.intertact_with_item;
import database.interact_with_notify;
import database.interact_with_user;

public class service_calendar {
	public static void send_response(Object response_content, HttpServletResponse resp) {
	    Gson gson = new Gson();
	    resp.setCharacterEncoding("UTF-8");
	    try {
	        String json_resp = gson.toJson(response_content);
	        resp.getWriter().write(json_resp);
	        
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
	public static void get_money_of_date(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
        Integer id_user = (Integer) session.getAttribute("user_id");
		int project_id = (Integer)session.getAttribute("project_id");
		
	    String date = req.getParameter("date");
	    String money = "";
	    money = intertact_with_item.get_total_money_of_date(id_user, date, project_id); 
		send_response(money, resp);
	}
	
	public static void get_list_item_of_date(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
        Integer id_user = (Integer) session.getAttribute("user_id");
		int project_id = (Integer)session.getAttribute("project_id");
		
	    String date = req.getParameter("date");

	    ArrayList<ArrayList<Object>> itemList =  intertact_with_item.get_list_item_of_date(id_user, date, project_id);
	    send_response(itemList, resp);
	}
	public static void update_status_notify(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
        Integer id_user = (Integer) session.getAttribute("user_id");
        
        interact_with_notify obj = new interact_with_notify();
	    obj.update_status_notify(id_user);
	    
	    System.out.println("update notify success");
	    
	    send_response("update_success", resp);
	}
	public static void update_info_user(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
        Integer id_user = (Integer) session.getAttribute("user_id");
        String name = req.getParameter("name");
        String img = req.getParameter("img");
        
	    try {
	        interact_with_user obj = new interact_with_user();
		    obj.update_info_user(id_user, name, img);
		    
		    System.out.println("update info success");
		    send_response("update_info_success", resp);
	    } catch (Exception e) {
	        e.printStackTrace();
		    System.out.println("update info failed");
		    send_response("update_info_failed", resp);
	    }

	}
}
