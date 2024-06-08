package servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import service.service_calendar;

public class servlet_calendar extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
    	req.setCharacterEncoding("UTF-8");
    	resp.setCharacterEncoding("UTF-8");

    	req.getRequestDispatcher("//calendar//calendar.jsp").forward(req, resp);
	}
}

