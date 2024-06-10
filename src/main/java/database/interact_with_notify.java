package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

public class interact_with_notify {
	private  Connection connect;
	public interact_with_notify() {
		connect_database obj = new connect_database();
		this.connect = obj.connect;
	}
	
	public static ArrayList<ArrayList<Object>> get_list_notify(int user_id, int flag) {
	    ArrayList<ArrayList<Object>> notifyList = new ArrayList<>();

        connect_database connection = new connect_database();
        connection.connect_to_database();
        
	    try {
	        String query = "SELECT [user].name, [user].img, notify.date " +
	                "FROM notify " +
	                "JOIN [user] ON notify.others_user_id = [user].user_id " +
	                "WHERE notify.user_id = ? AND notify.flag = ?" +
	                "ORDER BY date DESC";
	        PreparedStatement statement = connection.connect.prepareStatement(query);
	        statement.setInt(1, user_id);
	        statement.setInt(2, flag);

	        ResultSet resultSet = statement.executeQuery();
	        while (resultSet.next()) {
	            String otherUsername = resultSet.getString("name");
	            String img = resultSet.getString("img");
	            Timestamp timestamp = resultSet.getTimestamp("date");

	            // Chuyển đổi Timestamp thành chuỗi với định dạng "dd/MM/yyyy h:mm a"
	            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy h:mm a");
	            String date = sdf.format(timestamp);

	            ArrayList<Object> notify = new ArrayList<>();
	            notify.add(otherUsername);
	            notify.add((img != null) ? img : "");
	            notify.add(date);

	            notifyList.add(notify);
	        }
	        resultSet.close();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }

	    return notifyList;
	}
	public void update_status_notify(int id) {
		try {
            PreparedStatement statement = connect.prepareStatement("update notify "
            									+ "set flag = 0 where user_id = ? ");
            statement.setInt(1, id);
            statement.executeUpdate();

            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
	}
	
	
	// QA
	// insert notify
	
	public void insertNotify(int user_id, int others_user_id, String date) {
		try {
			 String query = "INSERT INTO notify (user_id, others_user_id, date, flag) VALUES (?, ?, ?, ?)";
			 PreparedStatement preparedStatement = connect.prepareStatement(query);
			 
			 preparedStatement.setInt(1, user_id);
	            preparedStatement.setInt(2, others_user_id);
	            preparedStatement.setString(3, date);
	            preparedStatement.setInt(4, 1);
	            // Thực thi câu truy vấn
	            int rowsAffected = preparedStatement.executeUpdate();

	            if (rowsAffected > 0) {
	                System.out.println("Notify inserted successfully.");
	            } else {
	                System.out.println("Failed to insert notify.");
	            }
		}catch(Exception e){
			System.out.println( e);
		}
	}
}
