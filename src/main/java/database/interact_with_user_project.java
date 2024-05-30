package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class interact_with_user_project {
	private Connection connect;
	public interact_with_user_project() {
		connect_database obj = new connect_database();
		this.connect = obj.connect;
	}
	public int check_if_user_have_project_or_not(int user_id) {
		int result = 0; 
        try {
            Statement statememt = connect.createStatement();
            String sql = "select * from user_project \r\n"
            		+ "where user_project.user_id = " + user_id;
            ResultSet resultSet = statememt.executeQuery(sql);

            if (resultSet.next()) {
            	result = 1;
            }

            resultSet.close();
            statememt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return result;
	}
	public void insert_user_project(int user_id, int project_id) {
		try {
            PreparedStatement statement = connect.prepareStatement("INSERT INTO user_project (user_id, project_id) VALUES (?, ?)");
            statement.setInt(1, user_id);
            statement.setInt(2, project_id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
		
	}
	public void delete_user_project(int project_id) {
		try {
            PreparedStatement statement = connect.prepareStatement("delete from user_project \r\n"
            		+ "where user_project.project_id = " + project_id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
	}
	public void delete_user_item(int project_id) {
		try {
            PreparedStatement statement = connect.prepareStatement("delete from user_item \r\n"
            		+ "where user_item.project_id = " + project_id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
	}
	public void delete_user_parent_item(int project_id) {
		try {
            PreparedStatement statement = connect.prepareStatement("delete from user_parent_item \r\n"
            		+ "where user_parent_item.project_id = " + project_id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
	}
	public void delete_project(int project_id) {
		try {
            PreparedStatement statement = connect.prepareStatement("delete from project \r\n"
            		+ "where project.project_id = " + project_id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
	}
}
