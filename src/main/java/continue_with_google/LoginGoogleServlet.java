package continue_with_google;
import java.io.IOException;   
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import continue_with_google.GooglePojo;
import continue_with_google.GoogleUtils;
import service.service_handle_continue_google;
import utils.encrypt_password;
@WebServlet("/login_google")
public class LoginGoogleServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;
//  public LoginGoogleServlet() {
  //  super();
  //}
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
	  String code = request.getParameter("code");
		if (code == null || code.isEmpty()) {
			RequestDispatcher dis = request.getRequestDispatcher("login.jsp");
			dis.forward(request, response);
		} else {
			String accessToken = GoogleUtils.getToken(code);
			GooglePojo googlePojo = GoogleUtils.getUserInfo(accessToken);
			String email = googlePojo.getEmail();
			service_handle_continue_google.handle_continue_google(email, request, response);
		}
  }
}
