package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.service_handle_request_from_history;

public class servlet_handle_request_from_history extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String action = req.getParameter("action");
		if (action.equals("create_project")) {
			service_handle_request_from_history.handle_insert_project(req, resp);
		}
		
		if (action.equals("update_project")) {
			service_handle_request_from_history.update_project(req, resp);
		}
		
		if(action.equals("delete_project")) {
			service_handle_request_from_history.delete_project(req, resp);
		}
		
		if(action.equals("choose_project")) {
			service_handle_request_from_history.choose_project(req, resp);
		}
	}
	
}
