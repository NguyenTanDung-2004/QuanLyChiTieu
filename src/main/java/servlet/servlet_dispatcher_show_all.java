package servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import service.service_dispatcher_home_chi_tieu;
import service.service_dispatcher_show_all;

public class servlet_dispatcher_show_all extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
    	resp.setCharacterEncoding("UTF-8");
		//create first item 
		req.setAttribute("current_total_money_of_parent_item", service_dispatcher_show_all.current_total_money_of_parent_item(req, resp));
		// get all data
		req.setAttribute("all_data", service_dispatcher_show_all.get_all_item_in_parent_item(req, resp));
		// date 
		req.setAttribute("date", service_dispatcher_show_all.from_and_to_date(req, resp));
		RequestDispatcher dispatcher = req.getRequestDispatcher("//show_all/show_all.jsp");
		dispatcher.forward(req, resp);
	}
}