package service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import database.interact_with_comment;
import database.interact_with_notify;
import database.interact_with_post;

public class service_community{
	public static void send_response(Object response_content, HttpServletResponse resp) {
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
	
	//GET POST
	public static void get_detail_post(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		String date = req.getParameter("date");
		int userID = (Integer)session.getAttribute("user_id");
		
		interact_with_post obj = new interact_with_post();
		ArrayList<ArrayList<String>> detail_post = obj.DetailPosts(date, userID);
		
		System.out.println(detail_post);
		
		send_response(detail_post, resp);
	}
	
	//INSERT POST
	public static void insert_post(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		String content = req.getParameter("content");
		int userID = (Integer)session.getAttribute("user_id");
		String date = req.getParameter("date");
		String time = req.getParameter("time");
        
        interact_with_post obj = new interact_with_post();
        obj.InsertPost( content, userID, date, time);
	
        send_response("successfully", resp);
	}
	
	//INSERT USER LIKE POST
	public static void update_like_post(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		int postID = Integer.parseInt(req.getParameter("postID"));
		int userID = (Integer)session.getAttribute("user_id");
		int numberOfLike = Integer.parseInt(req.getParameter("numberOfLike"));
		int like = Integer.parseInt(req.getParameter("like"));
		
		interact_with_post obj = new interact_with_post();
		
		if (like == 1 ) {
			obj.UpdateLikesPost(postID, numberOfLike);
			obj.InsertUserLikesPost(postID, userID);
			System.out.println("insert like");
		} else {
			obj.UpdateLikesPost(postID, numberOfLike);
			obj.RemoveUserLikePost(postID, userID);
			System.out.println("remove like");
		}
	
		send_response("successfully", resp);
	}
	
	//GET NUMBER OF LIKE POST
	public static void CountLikePost(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		int postID = Integer.parseInt(req.getParameter("postID"));
		
		interact_with_post obj = new interact_with_post();
		int count = obj.CountUserLikePost(postID);
		session.setAttribute("count_like_post", count);
		System.out.println("Number of like post: " + session.getAttribute("count_like_post"));
	
		send_response("successfully", resp);
	}
	
	
	//GET DETAIL_COMMENT
	public static void get_detail_comment(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		int postID  = Integer.parseInt(req.getParameter("postID"));
		
		interact_with_comment obj = new interact_with_comment();
		ArrayList<ArrayList<String>> detail_comment = obj.DetailComments(postID);
		System.out.println(detail_comment);
		
		send_response(detail_comment, resp);
	}
	
	
	//INSERT COMMENT 
		public static void insert_comment(HttpServletRequest req, HttpServletResponse resp) {
			HttpSession session = req.getSession();
			String content = req.getParameter("content");
			int userID = (Integer)session.getAttribute("user_id");
			int postID = Integer.parseInt(req.getParameter("postID"));
			String date = req.getParameter("date");
			String time = req.getParameter("time");
			int user_parentID = Integer.parseInt(req.getParameter("user_parentID"));
	        
	        interact_with_comment obj = new interact_with_comment();
	        obj.InsertComment(postID, content, date, time, userID, user_parentID);
	        
	        interact_with_notify obj1 = new interact_with_notify();
	        obj1.insertNotify(user_parentID, userID, date + " " + time);
		
	        send_response("successfully", resp);
		}
		
		//INSERT USER LIKE
		public static void insert_user_like_comment(HttpServletRequest req, HttpServletResponse resp) {
			HttpSession session = req.getSession();
			int commentID = Integer.parseInt(req.getParameter("commentID"));
			int userID = (Integer)session.getAttribute("user_id");
			
			interact_with_post obj = new interact_with_post();
			obj.InsertUserLikesPost(commentID, userID);
		
			send_response("successfully", resp);
		}
		
		//GET NUMBER OF LIKE COMMENT
		public static void CountLikeComment(HttpServletRequest req, HttpServletResponse resp) {
			HttpSession session = req.getSession();
			int commentID = Integer.parseInt(req.getParameter("commentID"));
			
			interact_with_post obj = new interact_with_post();
			int count = obj.CountUserLikePost(commentID);
			session.setAttribute("count_like_comment", count);
			System.out.println("Number of like comment: " + session.getAttribute("count_like_comment"));
		
			send_response("successfully", resp);
		}
		
		public static void handle_logout(HttpServletRequest req, HttpServletResponse resp) {
			HttpSession session = req.getSession(false); // false prevents creating a new session if one doesn't exist
	        
	        if (session != null) {
	            // Get all attribute names
	            Enumeration<String> attributeNames = session.getAttributeNames();
	            
	            // Remove each attribute
	            while (attributeNames.hasMoreElements()) {
	                String attributeName = attributeNames.nextElement();
	                session.removeAttribute(attributeName);
	            }
	        }
			send_response("logout_successfully", resp);
		}
}
