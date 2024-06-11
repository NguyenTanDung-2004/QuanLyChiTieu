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
		HttpSession session = req.getSession();
		if (session.getAttribute("project_id") == null) {
			resp.sendRedirect("http://localhost:8080/QuanLyChiTieu/home_chi_tieu");
			return;
		}
    	req.setCharacterEncoding("UTF-8");
    	resp.setCharacterEncoding("UTF-8");

    	req.getRequestDispatcher("//calendar//calendar.jsp").forward(req, resp);
	}
}

