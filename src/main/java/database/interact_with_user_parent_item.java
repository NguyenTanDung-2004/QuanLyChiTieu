package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class interact_with_user_parent_item {
	private Connection connect;
	public interact_with_user_parent_item() {
		connect_database obj = new connect_database();
		this.connect = obj.connect;
	}
	public void update(int user_id, int project_id, int parent_item_id, float money, String type) {
		float real_money = money;
		if (type.equals("subtract")){
			real_money = real_money * (-1);
		}
		try {
            PreparedStatement statement = connect.prepareStatement("update user_parent_item \r\n"
            		+ "set current_total_money = current_total_money + " + real_money + "\r\n"
            		+ "where user_id = ? and \r\n"
            		+ "	project_id = ? and \r\n"
            		+ "	parent_item_id = ?");
            statement.setInt(1, user_id);
            statement.setInt(2, project_id);
            statement.setInt(3, parent_item_id);
            statement.executeUpdate();

            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
	}
	public void update1(int user_id, int project_id, int parent_item_id, float money, String type) {
		float real_money = money;
		try {
            PreparedStatement statement = connect.prepareStatement("update user_parent_item \r\n"
            		+ "set current_total_money = current_total_money + " + real_money + "\r\n"
            		+ "where user_id = ? and \r\n"
            		+ "	project_id = ? and \r\n"
            		+ "	parent_item_id = ?");
            statement.setInt(1, user_id);
            statement.setInt(2, project_id);
            statement.setInt(3, parent_item_id);
            statement.executeUpdate();

            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
	}
	public void update2(int user_id, int project_id, int parent_item_id, float money, String type) {
		float real_money = money;
		try {
            PreparedStatement statement = connect.prepareStatement("update user_parent_item \r\n"
            		+ "set current_total_money = current_total_money - " + real_money + "\r\n"
            		+ "where user_id = ? and \r\n"
            		+ "	project_id = ? and \r\n"
            		+ "	parent_item_id = ?");
            statement.setInt(1, user_id);
            statement.setInt(2, project_id);
            statement.setInt(3, parent_item_id);
            statement.executeUpdate();

            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
	}
	public List<Integer> get_current_total_money_of_parent_item (int user_id, int project_id) {
		List<Integer> list = new ArrayList<>();
        try {
            Statement statement = connect.createStatement();
            String sql = "SELECT \r\n"
            		+ "    COALESCE(current_total_money, 0) AS current_total_money, \r\n"
            		+ "    name \r\n"
            		+ "FROM \r\n"
            		+ "    user_parent_item \r\n"
            		+ "RIGHT JOIN \r\n"
            		+ "    parent_item \r\n"
            		+ "ON \r\n"
            		+ "    user_parent_item.parent_item_id = parent_item.parent_item_id\r\n"
            		+ "where user_id = " + user_id + " and project_id = " + project_id;
            
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
            	list.add(resultSet.getInt(1));
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return list;
	}
	public void insert (int user_id, int project_id) {
		for (int i = 0; i < 12; i++) {
			 try {
	            PreparedStatement statement = connect.prepareStatement("INSERT INTO user_parent_item (user_id, project_id, parent_item_id, current_total_money, max_money) VALUES (?, ?, ?, ?, ?)");
	            statement.setInt(1, user_id);
	            statement.setInt(2, project_id);
	            statement.setInt(3, i);
	            statement.setInt(4, 0);
	            statement.setInt(5, 0);
	            statement.executeUpdate();
	            statement.close();
	        } catch (SQLException e) {
	            e.printStackTrace();
	        } 
		}
	}
	public List<List<Object>> get_all_item_in_1_parent_item(int user_id, int project_id, int parent_item_id) {
		List<List<Object>> list = new ArrayList<>();
        try {
            Statement statement = connect.createStatement();
            String sql = 
//            		"select item.info, item.money, item.date, item.type, item.item_id\r\n"
//            		+ "from user_parent_item inner join parent_item \r\n"
//            		+ "		on user_parent_item.parent_item_id = parent_item.parent_item_id\r\n"
//            		+ "	inner join item \r\n"
//            		+ "		on parent_item.parent_item_id = item.parent_item_id\r\n"
//            		+ "where user_parent_item.user_id = " + user_id + " and project_id = " + project_id + " and user_parent_item.parent_item_id = " + parent_item_id
//            		+ "order by item.date";
            		"select item.info, item.money, item.date, item.type, item.item_id from user_item inner join item on user_item.item_id = item.item_id \r\n"
            		+ "where user_item.user_id = " + user_id + " and user_item.project_id = " + project_id + " and item.parent_item_id = " + parent_item_id;
            		
            
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
            	List<Object> child_list = new ArrayList<Object>();
            	child_list.add(resultSet.getString(1));
            	child_list.add(resultSet.getFloat(2));
            	child_list.add(resultSet.getDate(3) + "");
            	child_list.add(resultSet.getString(4));
            	child_list.add(resultSet.getInt(5));
            	list.add(child_list);
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return list;
	}
	public List<List<List<Object>>> get_all_item_in_parent_item(int user_id, int project_id){
		List<List<List<Object>>> list = new ArrayList<>();
		for (int i = 0; i < 12; i++) {
			list.add(get_all_item_in_1_parent_item(user_id, project_id, i));
		}
		return list;
	}
	public static void main(String args[]) {
		interact_with_user_parent_item obj = new interact_with_user_parent_item();
		obj.insert(1, 1);
	}
	public float get_current_money_of_project(int user_id, int project_id) {
		float result = 0;
        try {
            Statement statement = connect.createStatement();
            String sql = 
            		"select sum(user_parent_item.current_total_money) from user_parent_item\r\n"
            		+ "where user_id = " + user_id + " and project_id = " + project_id;
            		
            
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
	public List<Float> get_current_total_money_in_home_chi_tieu(int user_id, int project_id){
		List<Float> list = new ArrayList<Float>();
        try {
            Statement statement = connect.createStatement();
            String sql = 
            		"select current_total_money from user_parent_item\r\n"
            		+ "where user_id = " + user_id + " and project_id = " + project_id + " and parent_item_id in (0, 1, 2, 3)";
            		
            
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
            	list.add(resultSet.getFloat(1));
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return list;
	}
}
