package servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import service.service_dispatcher_history;

public class servlet_dispatcher_history extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setAttribute("all_project_of_user", service_dispatcher_history.get_all_project_of_user(req, resp));
		RequestDispatcher dispatcher = req.getRequestDispatcher("//history//history.jsp");
		dispatcher.forward(req, resp);
	}
}
