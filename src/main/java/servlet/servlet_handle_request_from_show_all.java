package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.service_handle_request_from_show_all;

public class servlet_handle_request_from_show_all extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String action = req.getParameter("action");
		if (action.equals("add_item")) {
			service_handle_request_from_show_all.handle_add_item(req, resp);
		}
		// reset data 
		if (action.equals("reset_item")) {
			service_handle_request_from_show_all.handle_reset_item(req, resp);
		}
		// delet data
		if (action.equals("delete_item")) {
			service_handle_request_from_show_all.handle_delete_item(req, resp);
		}
	}
}
