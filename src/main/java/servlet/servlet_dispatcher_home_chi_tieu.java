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

public class servlet_dispatcher_home_chi_tieu extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession();
		// check user have project
		req.setAttribute("have_project", service_dispatcher_home_chi_tieu.check_if_user_have_project(req, resp));
		//set session project_id
		service_dispatcher_home_chi_tieu.set_session_for_project_id(req, resp);
		System.out.println(session.getAttribute("project_id"));
		// get data
		if (session.getAttribute("project_id") != null) {
			req.setAttribute("date_from_end", service_dispatcher_home_chi_tieu.get_date_from_end(req, resp));
			System.out.println(req.getAttribute("date_from_end"));
			// max and current money
			req.setAttribute("max_and_current_money", service_dispatcher_home_chi_tieu.current_and_max_money(req, resp));
			System.out.println(req.getAttribute("max_and_current_money"));
			// get_current_money for 4 parent item
			req.setAttribute("current_money_of_4_parent_item", service_dispatcher_home_chi_tieu.get_current_total_money_for_4_parent_item(req, resp));
			System.out.println(req.getAttribute("current_money_of_4_parent_item"));
			// get date in week
			req.setAttribute("week", service_dispatcher_home_chi_tieu.get_week_contain_current_date());
			System.out.println(req.getAttribute("week"));
			// get money in week
			req.setAttribute("money_in_week", service_dispatcher_home_chi_tieu.get_money_in_week(req, resp));
			System.out.println(req.getAttribute("money_in_week"));
		}
		System.out.println("nguyentandung");
		RequestDispatcher dispatcher = req.getRequestDispatcher("//home_chi_tieu/home_chi_tieu.jsp");
		dispatcher.forward(req, resp);
	}
}
