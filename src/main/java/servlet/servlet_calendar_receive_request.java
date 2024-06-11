package servlet;

import java.io.IOException; 

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.service_calendar;

public class servlet_calendar_receive_request extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    	
    	req.setCharacterEncoding("UTF-8");
    	resp.setCharacterEncoding("UTF-8");
    	
    	
		String action = req.getParameter("action");
		
		if (action.equals("get_money_of_date")) {
			service_calendar.get_money_of_date(req, resp);
		}
		if (action.equals("get_list_item_of_date")) {
			service_calendar.get_list_item_of_date(req, resp);
		}
		if (action.equals("update_status_notify")) {
			service_calendar.update_status_notify(req, resp);
		}
		if (action.equals("update_info")) {
			service_calendar.update_info_user(req, resp);
		}
    }
}