package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

public class interact_with_comment {
	private static Connection conn;
	 
	 static {
		 connect_database c = new connect_database();
	     c.connect_to_database();
	     conn = c.connect;
	 }
	 
	 //GET DETAIL OF COMMENTS FROM POST
	 public ArrayList<ArrayList<String>> DetailComments (int postID){
		 ArrayList<ArrayList<String>> detail = new ArrayList<ArrayList<String>>();
		 try {
	            String query = "SELECT c.comment_id, c.post_id, c.content, c.date, c.time, c.user_id, c.parent_user_id, " +
	                           "u.name, u.img " +
	                           "FROM comment c " +
	                           "JOIN [user] u ON c.user_id = u.user_id " +
	                           "WHERE c.post_id = ?";
	            PreparedStatement preparedStatement = conn.prepareStatement(query);
	            preparedStatement.setInt(1, postID);
	            ResultSet resultSet = preparedStatement.executeQuery();

	            while (resultSet.next()) {
	                ArrayList<String> comment = new ArrayList<>();
	                comment.add(resultSet.getString("comment_id"));
	                comment.add(String.valueOf(resultSet.getInt("post_id")));
	                comment.add(resultSet.getString("content"));
	                comment.add(resultSet.getString("date"));
	                comment.add(String.valueOf(resultSet.getInt("user_id")));
	                comment.add(String.valueOf(resultSet.getInt("parent_user_id")));
	                comment.add(resultSet.getString("name"));
			          String img = resultSet.getString("img");
			          comment.add((img != null) ? img :  "" );
	                comment.add(resultSet.getString("time"));
	                detail.add(comment);
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	            // Handle the exception appropriately, you might want to throw it or log it
	        }

	        return detail;
	    }
	
	//INSERT COMMENT
	 
	public void InsertComment(int postId, String content, String date, String time, int userId, Integer parentUserId) {
		try {
			String MaxIdQuery = "SELECT MAX(comment_id) AS max_id FROM comment";
	        PreparedStatement getMaxIdStmt = conn.prepareStatement(MaxIdQuery);
	        ResultSet rs = getMaxIdStmt.executeQuery();
	        
	        int newCommentId = 1;
	        if (rs.next()) {
	            newCommentId = rs.getInt("max_id") + 1;
	        }
			
			 String query = "INSERT INTO comment (comment_id, post_id, content, date, time, user_id, parent_user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
			 PreparedStatement preparedStatement = conn.prepareStatement(query);
			 
			 preparedStatement.setInt(1, newCommentId);
	            preparedStatement.setInt(2, postId);
	            preparedStatement.setString(3, content);
	            preparedStatement.setString(4, date);
	            preparedStatement.setString(5, time);
	            preparedStatement.setInt(6, userId);
	            if (parentUserId != 0) {
	                preparedStatement.setInt(7, parentUserId);
	            } else {
	                preparedStatement.setNull(7, java.sql.Types.INTEGER);
	            }
	            // Thực thi câu truy vấn
	            int rowsAffected = preparedStatement.executeUpdate();

	            if (rowsAffected > 0) {
	                System.out.println("Comment inserted successfully.");
	            } else {
	                System.out.println("Failed to insert comment.");
	            }
		}catch(Exception e){
			System.out.println( e);
		}
	}
	
	//COUNT USERS LIKE COMMENT
	public int CountUserLikeComment (int commentID) {
		int count = 0;
		try {
			String query = "SELECT COUNT(user_id) AS like_count FROM user_like_comment WHERE comment_id = ?";
			PreparedStatement preparedStatement = conn.prepareStatement(query);
			preparedStatement.setInt(1, commentID);

	        ResultSet resultSet = preparedStatement.executeQuery();

	            if (resultSet.next()) {
	                count = resultSet.getInt("like_count");
	            }
		}catch(Exception e){
			System.out.println( e);
		}
		return count;
	}
	
	//INSERT USER LIKES Comment
	public void InsertUserLikesComment (int commentID, int userID) {
		try {
			String query = "INSERT INTO user_like_comment (user_id, comment_id) VALUES (?, ?)";
			PreparedStatement preparedStatement = conn.prepareStatement(query);
			preparedStatement.setInt(1, userID);
           preparedStatement.setInt(2, commentID);

	        ResultSet resultSet = preparedStatement.executeQuery();
	        
	        int rowsAffected = preparedStatement.executeUpdate();

           if (rowsAffected > 0) {
               System.out.println("User " + userID + " liked comment " + commentID + " successfully.");
           } else {
               System.out.println("Failed to like comment " + commentID + " for user " + userID + ".");
           }

		}catch(Exception e){
			System.out.println( e);
		}
	}
}
