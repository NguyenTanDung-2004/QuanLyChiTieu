package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import utils.handle_date;

public class interact_with_project {
	Connection connect;
	public int current_project_id;
	public interact_with_project() {
		connect_database obj = new connect_database();
		this.connect = obj.connect;
	}
	public int create_project_id() {
		int result = 0;
        connect_database connection = new connect_database();
        connection.connect_to_database();
        try {
            Statement statement = connection.connect.createStatement();
            String sql = "select max(project_id) from project";
            ResultSet resultSet = statement.executeQuery(sql);
            
            if (resultSet.next()) {
		        result = resultSet.getInt(1) + 1;
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        this.current_project_id = result;
        return result;
	}
	public void insert_project(String name, float max_money, String end_date) {
		try {
            PreparedStatement statement = connect.prepareStatement("INSERT INTO project (project_id, name, max_money, end_date, from_date) VALUES (?, ?, ?, ?, ?)");
            statement.setInt(1, create_project_id());
            statement.setString(2, name);
            statement.setFloat(3, max_money);
            statement.setString(4, end_date);
            statement.setString(5, handle_date.getCurrentFormattedDate());
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
	}
	public List<String> get_from_and_to(int project_id){
		List<String> list = new ArrayList<String>();
        connect_database connection = new connect_database();
        connection.connect_to_database();
        try {
            Statement statement = connection.connect.createStatement();
            String sql = "select end_date, from_date, name from project\r\n"
            		+ "where project_id = " + project_id;
            ResultSet resultSet = statement.executeQuery(sql);
            
            if (resultSet.next()) {
		        list.add(resultSet.getDate(1) + "");
		        list.add(resultSet.getDate(2) + "");
		        list.add(resultSet.getString(3) + "");
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return list;
	}
	public float get_max_money_of_project(int project_id) {
		float result = 0;
        try {
            Statement statement = connect.createStatement();
            String sql = 
            		"select max_money from project \r\n"
            		+ "where project.project_id = " + project_id;
            		
            
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
            	result = resultSet.getFloat(1);
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return result;
	}
	public int get_max_project_id_of_user(int user_id) {
		int result = 0;
        try {
            Statement statement = connect.createStatement();
            String sql = 
            		"select max(project_id) from user_project \r\n"
            		+ "where user_id = " + user_id;
            		
            
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
            	result = resultSet.getInt(1);
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return result;
	}
}
