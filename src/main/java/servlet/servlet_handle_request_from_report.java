package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.service_handle_request_from_history;
import service.service_handle_request_from_report;

public class servlet_handle_request_from_report extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
    	req.setCharacterEncoding("UTF-8");
    	resp.setCharacterEncoding("UTF-8");
    	
		String action = req.getParameter("action");
		if (action.equals("get_data_project")) {
			service_handle_request_from_report.get_detail_report(req, resp);
		}
	}

}
