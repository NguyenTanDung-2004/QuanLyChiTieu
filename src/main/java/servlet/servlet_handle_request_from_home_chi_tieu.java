package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.service_handle_request_from_home_chi_tieu;

public class servlet_handle_request_from_home_chi_tieu extends HttpServlet{
	 @Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String action = (String)req.getParameter("action");
		if (action.equals("create_project")) {
			service_handle_request_from_home_chi_tieu.handle_insert_project(req, resp);
		}
	}
}
