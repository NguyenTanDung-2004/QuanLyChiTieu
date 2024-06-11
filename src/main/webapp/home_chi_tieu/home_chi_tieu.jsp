
<%@page import="java.util.ArrayList"%>
<%@page import="java.lang.reflect.Array"%>
<%@page import="java.util.List"%>
<%@page import="utils.convert_JavaObject_to_Json"%>
<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="utf-8"%>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home - Expense Management</title>
        <link rel="stylesheet" href="/QuanLyChiTieu/home_chi_tieu/home_chi_tieu.css"/>
        <!-- Unicons -->
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/fontawesome.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/brands.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/solid.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Madimi+One&family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap" rel="stylesheet">
    </head>
    
    <%
    	int user_have_project =  (Integer)request.getAttribute("have_project");
    	String user_have_project_json = convert_JavaObject_to_Json.convertObjectToJson(user_have_project);
    	List<String> date = new ArrayList<>();
    	List<Float> max_and_current_money = new ArrayList<>();
    	List<Float> current_money_of_4_parent_item = new ArrayList<>();
    	List<String> week = new ArrayList<>();
    	List<Float> money_in_week = new ArrayList<>();
    	if (request.getSession().getAttribute("project_id") != null){
    		date = (List<String>)request.getAttribute("date_from_end");
        	max_and_current_money = (List<Float>)request.getAttribute("max_and_current_money");
        	current_money_of_4_parent_item = (List<Float>)request.getAttribute("current_money_of_4_parent_item");
        	week = (List<String>)request.getAttribute("week");
        	money_in_week = (List<Float>)request.getAttribute("money_in_week");
    	}
    %>
    <%!
    public String formatMoneyVND(String numberString) {
    	float number = Float.parseFloat(numberString);
    	numberString = Math.abs((int)number) + "";
        if (numberString == null || numberString.isEmpty()) {
            return "0"; // Default to 0 if the string is empty or null
        }

        // Reverse iteration to add dots every three characters
        StringBuilder formatted = new StringBuilder();
        int count = 0;

        for (int i = numberString.length() - 1; i >= 0; i--) {
            formatted.append(numberString.charAt(i));
            count++;
            if (count == 3 && i != 0) { // Add dot if count is 3 and it's not the last character
                formatted.append('.');
                count = 0;
            }
        }
        String result = formatted.reverse().toString();
		if (number < 0){
			result = "-" + result;
		}
        // Reverse back to the correct order
        return result;
    }
    %>
    <body>
        <div class="left1">
            <div class="arrow">
                <img src="/QuanLyChiTieu/img/arrow.png" alt="" style="width: 25px;">
            </div>
            <div class="logo">
                <img src="/QuanLyChiTieu/img/logo.png" alt="" style="height: 80px; width: 80px;">
                <h3>Money Keeper</h3>
            </div>
            <div class="tags">
                <div class="tag">
                    <div class="home tag1">
                        <i class="fa-solid fa-house"></i>
                        <p>Home</p>
                        <div class="point"></div>
                    </div>
                    <div class="calendar tag1">
                        <i id="icon_calendar" class="fa-solid fa-calendar-days"></i>
                        <p>Calendar</p>
                        <div class="point"></div>
                    </div>
                    <div class="community tag1">
                        <i id="icon_community" class="fa-solid fa-users"></i>
                        <p>Community</p>
                        <div class="point"></div>
                    </div>
                    <div class="history tag1">
                        <i class="fa-solid fa-clock"></i>
                        <p>History</p>
                        <div class="point"></div>
                    </div>
                </div>
                <div class="dark_mode">
                    <i class="fa-solid fa-moon"></i>
                    <div class="button">
                        <div id="point_button_darkmode"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right1">
            <div class="top">
                <div class="left">
                    <h3>Hello, Welcome back Money Keeper!</h3>
                    <p>Wish you have a good day!</p>
                </div>
                <div class="right">
                    <i class="fa-regular fa-comment"></i>
                    <i class="fa-solid fa-bell"></i>
                    <i class="fa-regular fa-user"></i>
                </div>
            </div>
            <div class="main" style="display: none;">
                <div class="left">
                    <div class="current_money">
                        <div class="top">
                            <div class="left">
                                <div class="money">
                                    <%
									    if (request.getSession().getAttribute("project_id") != null) {
									%>
									    <p>
									        <%= formatMoneyVND(max_and_current_money.get(0).toString()) %> 
									    </p>
									    <P id="abcd">
									    	/
									    </P>
									<%
									    }
									%>
                                    <%
									    if (request.getSession().getAttribute("project_id") != null) {
									%>
									    <p id="abcd">
									        <%= formatMoneyVND(max_and_current_money.get(1).toString()) + " VND" %> 
									    </p>
									<%
									    }
									%>
                                </div>
                            </div>
                            <div class="right">
                                <div class="from right_child1">
                                    <p>From date</p>
                                    <%
									    if (request.getSession().getAttribute("project_id") != null) {
									%>
									    <p>
									       <%=date.get(1) %>
									    </p>
									<%
									    }
									%>
                                </div>
                                <div class="to right_child1">
                                    <p>To date</p>
                                    <%
									    if (request.getSession().getAttribute("project_id") != null) {
									%>
									    <p>
									       <%=date.get(0) %>
									    </p>
									<%
									    }
									%>
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <p>Energy</p>
                            <div id="energy">
                                <div id="current_energy"></div>
                            </div>
                        </div>
                    </div>
                    <!--chart-->
                    <div class="chart">
                        <p id="data_this_week">Data this week.</p>
                        <div class="row_column">
                            <i id="arrow-up" class="fa-solid fa-arrow-up"></i>
                            <i id="arrow-right" class="fa-solid fa-arrow-right"></i>
                            <div class="mon day">
                                <div style="height: 70%;"></div>
                                <p>Mon</p>
                            </div>
                            <div class="tues day">
                                <div style="height: 50%;"></div>
                                <p>Tue</p>
                            </div>
                            <div class="wed day">
                                <div style="height: 20%;"></div>
                                <p>Wed</p>
                            </div>
                            <div class="thurs day">
                                <div style="height: 50%;"></div>
                                <p>Thur</p>
                            </div>
                            <div class="fri day">
                                <div style="height: 60%;"></div>
                                <p>Fri</p>
                            </div>
                            <div class="sat day">
                                <div style="height: 30%;"></div>
                                <p>Sat</p>
                            </div>
                            <div class="sun day">
                                <div style="height: 90%;"></div>
                                <p>Sun</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="activity">
                        <p id="activity_text">Activity</p>
                        <p id="show_all_activity">Show all.</p>
                        <div class="item">
                            <div class="left">
                                <img style="height: 30px;" src="/QuanLyChiTieu/img/icon_activity/Eating.png" alt="">
                                <p>Eating</p>
                            </div>
                            <div class="right">
									<%
    // Check if the session attribute "project_id" is not null
    if (request.getSession().getAttribute("project_id") != null) {
%>
    <p>
        <%= "Current Total: " + formatMoneyVND(current_money_of_4_parent_item.get(0).toString()) + " VND" %>
    </p>
<%
    }
%>
                            </div>
                        </div>
                        <div class="item">
                            <div class="left">
                                <img style="height: 30px;" src="/QuanLyChiTieu/img/icon_activity/Shopping.png" alt="">
                                <p>Shopping</p>
                            </div>
                            <div class="right">
                                <%
    // Check if the session attribute "project_id" is not null
    if (request.getSession().getAttribute("project_id") != null) {
%>
    <p>
        <%= "Current Total: " + formatMoneyVND(current_money_of_4_parent_item.get(3).toString()) + " VND" %>
    </p>
<%
    }
%>
                            </div>
                        </div>
                        <div class="item">
                            <div class="left">
                                <img style="height: 30px;" src="/QuanLyChiTieu/img/icon_activity/Study.png" alt="">
                                <p>Study</p>
                            </div>
                            <div class="right">
	<%
    // Check if the session attribute "project_id" is not null
    if (request.getSession().getAttribute("project_id") != null) {
%>
    <p>
        <%= "Current Total: " + formatMoneyVND(current_money_of_4_parent_item.get(1).toString()) + " VND" %>
    </p>
<%
    }
%>
                            </div>
                        </div>
                        <div class="item">
                            <div class="left">
                                <img style="height: 30px;" src="/QuanLyChiTieu/img/icon_activity/Moving.png" alt="">
                                <p>Moving</p>
                            </div>
                            <div class="right">
<%
    // Check if the session attribute "project_id" is not null
    if (request.getSession().getAttribute("project_id") != null) {
%>
    <p>
        <%= "Current Total: " + formatMoneyVND(current_money_of_4_parent_item.get(2).toString()) + " VND" %>
    </p>
<%
    }
%>
                            </div>
                        </div>
                    </div>
                    <div class="event">
                        <div id="event-img" class="img"></div>
                    </div>
                </div>
            </div>
            <div class="create_first_project" style="position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%); display: flex; flex-direction: column; gap: 50px; justify-content: center;">
                <div class="add_shape" style="transform: translateX(50px); cursor: pointer; transition: 0.3s;">
                    <div class="row" style="height: 20px; width: 80px; background-color:#baddff; position: absolute; border-radius: 10px; box-shadow: 1px 1px 2px 1px gray;"></div>
                    <div class="column" style="height: 80px; width: 20px; background-color: #baddff; position: absolute; top: -30px; left: 30px; border-radius: 10px; box-shadow: 0px 0px 2px -3px gray;"></div>
                </div>
                <p style="font-size: 20px; font-weight: 500;">Create Your First Project.</p>
            </div>
        </div>
        <div id="detail_column" class="detail_column">
            <div id="arrow_detail_column" class="arrow"></div>
            <div class="date text">
                <p id ="date_column">Date: 20/08/2004</p>
                <p id="money_column">Money: 1.500.000</p>
            </div>
        </div>
        <div class="blur" style="display: none;">

        </div>
        <div class="create_project_box" style="scale: 0;">
            <i id="close_create_project_box" class="fa-solid fa-xmark"></i>
            <p id="title_create_project_box">CREATE NEW PROJECT</p>
            <div class="contain_child_create_project">
                <div class="name child_create_project_box">
                    <p class="left">Name:</p>
                    <input type="text" id="name_project_box" class="input">
                </div>
                <div class="to child_create_project_box">
                    <p class="left">End Date:</p>
                    <input id="date" type="date" lang="en">
                </div>
                <div class="money child_create_project_box">
                    <p class="left">Max Money:</p>
                    <input type="text" class="input">
                    <p>VND</p>
                </div>
            </div>
            <p id="create_project_successfully" style="color: #baddff; display: none; position: absolute; bottom: 70px" >Create successfully! See it in history.</p>
            <div style="position: relative">
            	<button id="save_create_project">Save</button>
            	<div id="on_button" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"></div>
            </div>
            
        </div>
		<script type="text/javascript">
			var user_have_project = <%=user_have_project_json %>;
			var max_and_current_money = <%=max_and_current_money%>;
			var week = <%=convert_JavaObject_to_Json.convertObjectToJson(week)%>
			var money_in_week = <%=convert_JavaObject_to_Json.convertObjectToJson(money_in_week)%>
			var home_tag = document.querySelector("body .left1 .tags .tag .home");
			home_tag.style.backgroundColor = "#F8F9F9";
			var home_point = document.querySelector("body .left1 .tags .tag .home .point");
			home_point.style.display = "block";
		</script>
        <script src="/QuanLyChiTieu/home_chi_tieu/Dung/home_chi_tieu.js"></script>
        <script src="/QuanLyChiTieu/home_chi_tieu/Dung/home.js"></script>
        <script src="/QuanLyChiTieu/home_chi_tieu/Dung/set_up_home_chi_tieu.js"></script>
        <script src="/QuanLyChiTieu/home_chi_tieu/Dung/set_up_chart.js"></script>
        <script src="/QuanLyChiTieu/home_chi_tieu/change_tab.js"></script>
    </body>
</html>