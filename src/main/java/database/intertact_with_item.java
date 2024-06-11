package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import utils.handle_date;

public class intertact_with_item {
	private Connection connect;
	private int current_id_item;
	public intertact_with_item() {
		connect_database obj = new connect_database();
		this.connect = obj.connect;
	}
	public void insert_item(String info, float money, int parent_item_id, String type, String date) {
		create_id_item();
		try {
            PreparedStatement statement = connect.prepareStatement("insert into item (item_id, info, money, date, parent_item_id, type) values (?, ?, ?, ?, ?, ?)");
            statement.setInt(1, current_id_item);
            statement.setString(2, info);
            statement.setFloat(3, money);
            statement.setString(4, date);
            statement.setInt(5, parent_item_id);
            statement.setString(6, type);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
	}
	public void insert_user_item(int user_id, int project_id) {
		try {
            PreparedStatement statement = connect.prepareStatement("insert into user_item (user_id, project_id, item_id) values (?, ?, ?)");
            statement.setInt(1, user_id);
            statement.setInt(2, project_id);
            statement.setInt(3, current_id_item);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
	}
	public void create_id_item() {
		int result = 0;
        try {
            Statement statement = connect.createStatement();
            String sql = "select max(item_id) from item";
            ResultSet resultSet = statement.executeQuery(sql);

            if (resultSet.next()) {
		        result = resultSet.getInt(1) + 1;
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        this.current_id_item = result;
	}
	public void update_item(int item_id, String name, String date, float money, String radio) {
		try {
            PreparedStatement statement = connect.prepareStatement("update item \r\n"
            		+ "set item.info = ?, money = ?, date = ?, type = ? \r\n"
            		+ "where item.item_id = ?");
            statement.setString(1, name);
            statement.setFloat(2, money);
            statement.setString(3, date);
            statement.setString(4, radio);
            statement.setInt(5, item_id);
            statement.executeUpdate();

            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
	}
	public float get_money_of_item(int item_id) {
		float result = 0;
		String type = "";
        try {
            Statement statement = connect.createStatement();
            String sql = "select money, type from item where item_id = " + item_id;
            ResultSet resultSet = statement.executeQuery(sql);

            if (resultSet.next()) {
		        result = resultSet.getFloat(1);
		        type = resultSet.getString(2);
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        if (type.equals("subtract")) {
        	result = -1 * result;
        }
        return result;
	}
	public void delete_user_item(int item_id) {
		try {
            PreparedStatement statement = connect.prepareStatement("delete from user_item where user_item.item_id = " + item_id);
            statement.executeUpdate();

            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
	}
	public void delete_item(int item_id) {
		try {
            PreparedStatement statement = connect.prepareStatement("delete from item where item.item_id = " + item_id);
            statement.executeUpdate();

            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
	}
	public float Money_of_1_date_in_week(int user_id, int project_id, String date){
		float result = 0;
        try {
            Statement statement = connect.createStatement();
            String sql = "select sum(money) from item inner join user_item on item.item_id = user_item.item_id\r\n"
            		+ "where date = '" + date + "' and user_id = " + user_id + " and project_id = " + project_id + "and type = 'add'";
            ResultSet resultSet = statement.executeQuery(sql);

            if (resultSet.next()) {
		        result = resultSet.getFloat(1);
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return result;
	}
	public List<Float> money_of_date_in_week(int user_id, int project_id){
		List<String> date = handle_date.current_week_contain_current_date();
		List<Float> list = new ArrayList<>();
		for (int i = 0; i < date.size(); i++) {  
			list.add(Money_of_1_date_in_week(user_id, project_id, date.get(i)));
		}
		return list;
	}
	public static String get_total_money_of_date(int id_user, String date, int project_id) {
		  float totalMoney = 0;

		  connect_database connection = new connect_database();
		  connection.connect_to_database();

		  try {
		        String query = "SELECT SUM(CASE WHEN type = 'add' THEN money ELSE -money END) AS total_money FROM item " +
		                "JOIN user_item ON item.item_id = user_item.item_id " +
		                "WHERE user_item.user_id = ? AND item.date = ? AND user_item.project_id = ?";
		        PreparedStatement statement = connection.connect.prepareStatement(query);
		        statement.setInt(1, id_user);
		        statement.setString(2, date);
	            statement.setInt(3, project_id);
	            
		        ResultSet resultSet = statement.executeQuery();
		        if (resultSet.next()) {
		            totalMoney = resultSet.getFloat("total_money");
		        }
		    resultSet.close();
		  } catch (SQLException e) {
		    e.printStackTrace();
		  } finally {
		    try {
		      connection.connect.close();
		    } catch (SQLException e) {
		      e.printStackTrace();
		    }
		  }

          NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.US);
          String moneyString = numberFormat.format(totalMoney);
		  return moneyString;
		}
	
	public static ArrayList<ArrayList<Object>> get_list_item_of_date(int id_user, String date, int project_id) {
	    ArrayList<ArrayList<Object>> itemList = new ArrayList<>();

	    connect_database connection = new connect_database();
	    connection.connect_to_database();

	    try {
	        String query = "SELECT parent_item.name, item.info, item.money, item.type FROM item " +
	                "JOIN user_item ON item.item_id = user_item.item_id " +
	                "JOIN parent_item ON item.parent_item_id = parent_item.parent_item_id " +
	                "WHERE user_item.user_id = ? AND item.date = ? AND user_item.project_id = ?";
	        PreparedStatement statement = connection.connect.prepareStatement(query);
	        statement.setInt(1, id_user);
	        statement.setString(2, date);
	        statement.setInt(3, project_id);

	        ResultSet resultSet = statement.executeQuery();
	        while (resultSet.next()) {
	            String itemName = resultSet.getString("name");
	            String itemInfo = resultSet.getString("info");
	            float itemMoney = resultSet.getFloat("money");
	            String itemType = resultSet.getString("type");
	            NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.US);
	            String moneyString = numberFormat.format(itemMoney);

	            if ("add".equals(itemType)) {
	                moneyString = "+ " + moneyString;
	            } else {
	                moneyString = "- " + moneyString;
	            }

	            ArrayList<Object> item = new ArrayList<>();
	            item.add(itemName);
	            item.add(itemInfo);
	            item.add(moneyString);

	            itemList.add(item);
	        }
	        resultSet.close();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    } finally {
	        try {
	            connection.connect.close();
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	    }

	    return itemList;
	}
	
	
}