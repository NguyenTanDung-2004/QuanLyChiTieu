package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.service_community;

public class servlet_handle_request_from_community extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    	req.setCharacterEncoding("UTF-8");
    	resp.setCharacterEncoding("UTF-8");
    	
		String action = req.getParameter("action");
		
		if(action.equals("show")) {
			service_community.get_detail_post(req, resp);
			
		}
		if(action.equals("get_detail_comment")) {
			service_community.get_detail_comment(req, resp);
		}
		if(action.equals("insert_comment")) {
			service_community.insert_comment(req, resp);
		}
		
		if(action.equals("insert_post")) {
			service_community.insert_post(req, resp);
		}
		
		if(action.equals("like_post")) {
			service_community.update_like_post(req, resp);
		}
		if(action.equals("logout")) {
			service_community.handle_logout(req, resp);
		}
	}

}
