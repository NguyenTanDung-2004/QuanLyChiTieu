package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

public class interact_with_post {
	private static Connection conn;
	 
	 static {
		 connect_database c = new connect_database();
	     c.connect_to_database();
	     conn = c.connect;
	 }
	 
	 //GET DETAIL OF POSTS
	 public ArrayList<ArrayList<String>> DetailPosts(String date, int user_id) {
		    ArrayList<ArrayList<String>> detail = new ArrayList<>();
		    try {
		        String query = "SELECT p.post_id, p.content, p.user_id, p.date, p.time, p.number_of_likes, " +
		                "u.name, u.img, " +
		                "CASE WHEN ul.user_id IS NOT NULL THEN 1 ELSE 0 END AS liked " +
		                "FROM post p " +
		                "JOIN [user] u ON p.user_id = u.user_id " +
		                "LEFT JOIN user_like_post ul ON p.post_id = ul.post_id AND ul.user_id = ? " +
		                "WHERE p.date = ?";
		        PreparedStatement preparedStatement = conn.prepareStatement(query);
		        preparedStatement.setInt(1, user_id);
		        preparedStatement.setString(2, date);
		        ResultSet resultSet = preparedStatement.executeQuery();

		        while (resultSet.next()) {
		            ArrayList<String> post = new ArrayList<>();
		            post.add(String.valueOf(resultSet.getInt("post_id")));
		            post.add(resultSet.getString("content"));
		            post.add(String.valueOf(resultSet.getInt("user_id")));
		            post.add(resultSet.getString("date"));
		            post.add(String.valueOf(resultSet.getInt("number_of_likes")));
		            post.add(resultSet.getString("name"));
		            String img = resultSet.getString("img");
		            post.add((img != null) ? img : "");
		            post.add(resultSet.getString("time"));
		            post.add(String.valueOf(resultSet.getInt("liked")));
		            detail.add(post);
		        }
		    } catch (SQLException e) {
		        e.printStackTrace();
		        // Handle the exception appropriately, you might want to throw it or log it
		    }

		    return detail;
		}

	//INSERT POST
	public void InsertPost(String content, int userID, String date, String time) {
		try {
			
			String MaxIdQuery = "SELECT MAX(post_id) AS max_id FROM post";
	        PreparedStatement getMaxIdStmt = conn.prepareStatement(MaxIdQuery);
	        ResultSet rs = getMaxIdStmt.executeQuery();
	        
	        int newPostId = 1;
	        if (rs.next()) {
	        	newPostId = rs.getInt("max_id") + 1;
	        }
	        
			 String query = "INSERT INTO post (post_id, content, user_id, date, time, number_of_likes) VALUES (?, ?, ?, ?, ?, 0)";
			 PreparedStatement preparedStatement = conn.prepareStatement(query);
			 
			 preparedStatement.setInt(1, newPostId);
			 preparedStatement.setString(2, content);
			 preparedStatement.setInt(3,  userID);
			 preparedStatement.setString(4, date);
			 preparedStatement.setString(5, time);
			 
			 preparedStatement.executeUpdate();

	         System.out.println("Post inserted successfully.");
		}catch(Exception e){
			System.out.println( e);
		}
	}
	
	//UPDATE NUMBERS OF LIKES
	public void UpdateLikesPost(int postID, int numbers) {
		try {
			 String query = "UPDATE post SET number_of_likes = ? WHERE post_id = ?";
			 PreparedStatement preparedStatement = conn.prepareStatement(query);
			 
			 preparedStatement.setInt(1, numbers);
	         preparedStatement.setInt(2, postID);
	         
	         int rowsAffected = preparedStatement.executeUpdate();

	            if (rowsAffected > 0) {
	                System.out.println("Number of likes updated successfully.");
	            } else {
	                System.out.println("Post with ID " + postID + " not found.");
	            }
		}catch(Exception e){
			System.out.println( e);
		}
	}
	
	//COUNT USERS LIKE POST
	public int CountUserLikePost (int postID) {
		int count = 0;
		try {
			String query = "SELECT COUNT(user_id) AS like_count FROM user_like_post WHERE post_id = ?";
			PreparedStatement preparedStatement = conn.prepareStatement(query);
			preparedStatement.setInt(1, postID);

	        ResultSet resultSet = preparedStatement.executeQuery();

	            if (resultSet.next()) {
	                count = resultSet.getInt("like_count");
	            }
		}catch(Exception e){
			System.out.println( e);
		}
		return count;
	}
	
	//INSERT USER LIKES POST
	public void InsertUserLikesPost (int postID, int userID) {
		try {
			String query = "INSERT INTO user_like_post (user_id, post_id) VALUES (?, ?)";
			PreparedStatement preparedStatement = conn.prepareStatement(query);
			preparedStatement.setInt(1, userID);
            preparedStatement.setInt(2, postID);

	        ResultSet resultSet = preparedStatement.executeQuery();
	        
	        int rowsAffected = preparedStatement.executeUpdate();

            if (rowsAffected > 0) {
                System.out.println("User " + userID + " liked post " + postID + " successfully.");
            } else {
                System.out.println("Failed to like post " + postID + " for user " + userID + ".");
            }

		}catch(Exception e){
			System.out.println( e);
		}
	}
	
	//REMOVE USER LIKE POST
	public void RemoveUserLikePost(int postId, int userID) {
		try {
			String query = "DELETE FROM user_like_post WHERE post_id = ? AND user_id = ?";
	        PreparedStatement preparedStatement = conn.prepareStatement(query);
	        preparedStatement.setInt(1, postId);
	        preparedStatement.setInt(2, userID);

	        int rowsAffected = preparedStatement.executeUpdate();

	        if (rowsAffected > 0) {
	            System.out.println("User " + userID + " unliked post " + postId + " successfully.");
	        } else {
	            System.out.println("Failed to unlike post " + postId + " for user " + userID + ".");
	        }
		}catch(Exception e){
			System.out.println( e);
		}
	}
}
