package service;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import database.interact_with_project;
import database.interact_with_user_parent_item;
import database.intertact_with_item;

public class service_handle_request_from_report{
	public static void send_response(String response_content, HttpServletResponse resp) {
		Gson gson = new Gson();
	    resp.setCharacterEncoding("UTF-8");
	    try {
	    	String json_resp = gson.toJson(response_content);
			resp.getWriter().write(json_resp);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void get_detail_report(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		int project_id = (Integer)session.getAttribute("project_id");
		
		//Get detail_project
		interact_with_project obj1 = new interact_with_project();
		ArrayList<String> detail_project = obj1.get_detail_project_for_report(project_id);
		session.setAttribute("detail_project", detail_project);
		System.out.println("Detail project set in session successfully: " + session.getAttribute("detail_project"));
		
		//Get detail_items for table
		intertact_with_item obj2 = new intertact_with_item();
		ArrayList<ArrayList<String>> detail_item = obj2.get_detail_items((Integer)req.getSession().getAttribute("user_id"), project_id);
		session.setAttribute("detail_item", detail_item);
		System.out.println("Detail item set in session successfully: " + session.getAttribute("detail_item"));
		
		//Get detail_parent_item for chart
		interact_with_user_parent_item obj3 = new interact_with_user_parent_item();
		ArrayList<ArrayList<String>> detail_parent_item = obj3.get_max_parent_items((Integer)req.getSession().getAttribute("user_id"), project_id);
		session.setAttribute("detail_parent_item", detail_parent_item);
		System.out.println("Detail parent item set in session successfully: " + session.getAttribute("detail_parent_item"));
		
		//Get total money
		float totalMoney = obj3.SumMoneyForChart((Integer)req.getSession().getAttribute("user_id"), project_id);
		session.setAttribute("totalMoney", totalMoney);
		System.out.println("Total: " + session.getAttribute("totalMoney"));
		
		//Get expense money
		float expenseMoney = obj2.SumMoneyExpense((Integer)req.getSession().getAttribute("user_id"), project_id);
		session.setAttribute("expenseMoney", expenseMoney);
		System.out.println("Expense: " + session.getAttribute("expenseMoney"));
		
		send_response("successfully", resp);
	}
}
