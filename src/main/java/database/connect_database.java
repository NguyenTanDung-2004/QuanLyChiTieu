package database;

import java.sql.Connection; 
import java.sql.DriverManager;
import java.sql.SQLException;

import com.microsoft.sqlserver.jdbc.SQLServerDriver;

public class connect_database {
	public Connection connect;
	public void connect_to_database()
	{
		try {
			DriverManager.registerDriver(new SQLServerDriver());
			String url = "jdbc:sqlserver://localhost:1433;databaseName=cnpm;user=sa;password=1234;trustServerCertificate = true;";
			connect = DriverManager.getConnection(url);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public connect_database() {
		connect_to_database();
	}
}
