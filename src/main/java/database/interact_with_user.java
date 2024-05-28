package database;

import java.sql.Connection; 
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


import database.*;

public class interact_with_user {
	private Connection connect;
	public interact_with_user() {
		connect_database obj = new connect_database();
		this.connect = obj.connect;
	}
	// return 1 <=> exist
	public int check_email_exist(String email) { 
		int emailExists = 0;
        try {
            Statement statememt = connect.createStatement();
            String sql = "SELECT COUNT(*) FROM [user] WHERE email = '" + email + "'";
            ResultSet resultSet = statememt.executeQuery(sql);

            if (resultSet.next()) {
		int count = resultSet.getInt(1);
                if( count > 0) {
			emailExists = 1;
		}
            }

            resultSet.close();
            statememt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return emailExists;
	}
	//create id user
	public int create_id_user() {
    	int result = 0;

        connect_database connection = new connect_database();
        connection.connect_to_database();

        try {
            Statement statement = connection.connect.createStatement();
            String sql = "select max(user_id) from [user]";
            ResultSet resultSet = statement.executeQuery(sql);

            if (resultSet.next()) {
		        result = resultSet.getInt(1) + 1;
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return result;
    }
	// insert user
	public void insert_user(String email, String password) {

        try {
            PreparedStatement statement = connect.prepareStatement("INSERT INTO [user] (user_id, email, password, name) VALUES (?, ?, ?, ?)");
            statement.setInt(1, create_id_user());
            statement.setString(2, email);
            statement.setString(3, password);
            statement.setString(4, "user name");
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
	}
	public int check_password_with_email(String email, String password) {
        int passwordMatches = 0;
        try {
            Statement statement = connect.createStatement();
            String sql = "SELECT COUNT(*) FROM [user] WHERE email = '" + email + "' AND password = '" + password + "'";
            ResultSet resultSet = statement.executeQuery(sql);

            if (resultSet.next()) {
                int count = resultSet.getInt(1);
                if( count > 0) {
			passwordMatches = 1;
		}
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return passwordMatches;
    }
	public int get_id_user(String email) {
    	int result = 0;
        try {
            Statement statement = connect.createStatement();
            String sql = "select user_id from [user]\r\n"
            		+ "where email = '" + email + "'";
            ResultSet resultSet = statement.executeQuery(sql);

            if (resultSet.next()) {
		        result = resultSet.getInt(1);
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return result;
    }
	 public void update_password(String password, String email) {

	        try {
	            PreparedStatement statement = connect.prepareStatement("UPDATE [user] SET password = ? WHERE email = ?");
	            statement.setString(1, password);
	            statement.setString(2, email);
	            statement.executeUpdate();

	            statement.close();
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	    }
}
