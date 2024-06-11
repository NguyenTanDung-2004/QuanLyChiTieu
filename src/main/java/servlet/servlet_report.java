package servlet;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class servlet_report extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession();
		
    	req.setCharacterEncoding("UTF-8");
    	resp.setCharacterEncoding("UTF-8");
		
		//detail_project
		ArrayList<String> detail_project = (ArrayList<String>) session.getAttribute("detail_project");
		req.setAttribute("detail_project", detail_project);
		
		//detail_item
		ArrayList<ArrayList<String>> detail_item = (ArrayList<ArrayList<String>>) session.getAttribute("detail_item");
		req.setAttribute("detail_item", detail_item);
		
		//detail_parent_item
		ArrayList<ArrayList<String>> detail_parent_item = (ArrayList<ArrayList<String>>) session.getAttribute("detail_parent_item");
		req.setAttribute("detail_parent_item", detail_parent_item);
		
		//totalMoney
		float totalMoney = (float) session.getAttribute("totalMoney");
		req.setAttribute("totalMoney", totalMoney);
		
		//expenseMoney
		float expenseMoney = (float) session.getAttribute("expenseMoney");
		req.setAttribute("expenseMoney", expenseMoney);
		
		req.getRequestDispatcher("//report/report.jsp").forward(req, resp);   
	}
}
