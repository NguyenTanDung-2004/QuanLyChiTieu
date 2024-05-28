<%@page import="utils.convert_JavaObject_to_Json"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home - Expense Management</title>
        <link rel="stylesheet" href="/QuanLyChiTieu/show_all/css.css"/>
        <link rel="stylesheet" href="/QuanLyChiTieu/show_all/css1.css"/>
        <!-- Unicons -->
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/fontawesome.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/brands.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/solid.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Madimi+One&family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap" rel="stylesheet">
    </head>
    <%
    	List<Integer> current_total_money_of_parent_item = (List)request.getAttribute("current_total_money_of_parent_item");
    	List<List<List<Object>>> all_data = (List<List<List<Object>>>)request.getAttribute("all_data");
    	List<String> date = (List<String>)request.getAttribute("date");
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
    
    public String convert_all_data_to_Json(Object object){
    	return convert_JavaObject_to_Json.convertObjectToJson(object);
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
            <div class="title">
                <p><%=date.get(2) %></p>
            </div>
            <div class="date">
                <p class="from"><%=date.get(1) %></p>
                <p>-</p>
                <p class="to"><%=date.get(0) %></p>
            </div>
            <div class="main">
                <div class="left main_child">
                    <div class="Eating parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Eating.png" alt="">
                                <p>Eating</p>
                            </div>
                            <div class="right2">
                            	<p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(0) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                                <div class="detail_item">
                                    <div class="left3">
                                        <p class="info">Bun Bo</p>
                                        <p>50.000 VND</p>
                                    </div>
                                    <p>20/08/2004</p>
                                </div> 	
                                <div class="line"></div>
                                <div class="detail_item">
                                    <div class="left3">
                                        <p class="info">Bun Bo</p>
                                        <p>50.000 VND</p>
                                    </div>
                                    <p>20/08/2004</p>
                                </div>
                                <div class="line"></div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="Study parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Study.png" alt="">
                                <p>Study</p>
                            </div>
                            <div class="right2">
                               	<p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(1) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                                
                            </div>
                        </div>
                    </div>
                    <div class="Moving parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Moving.png" alt="">
                                <p>Moving</p>
                            </div>
                            <div class="right2">
                               	<p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(2) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                            </div>
                        </div>
                    </div>
                    <div class="Shopping parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Shopping.png" alt="">
                                <p>Shopping</p>
                            </div>
                            <div class="right2">
                                <p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(3) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                            </div>
                        </div>
                    </div>
                    <div class="Entertain parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Entertainment.png" alt="">
                                <p>Entertainment</p>
                            </div>
                            <div class="right2">
                                <p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(4) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                            </div>
                        </div>
                    </div>
                    <div class="Friends parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Friends.png" alt="">
                                <p>Friends</p>
                            </div>
                            <div class="right2">
                                <p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(5) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right main_child">
                    <div class="Family parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Family.png" alt="">
                                <p>Family</p>
                            </div>
                            <div class="right2">
                                <p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(6) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                                <div class="detail_item">
                                    <div class="left3">
                                        <p class="info">Bun Bo</p>
                                        <p>50.000 VND</p>
                                    </div>
                                    <p>20/08/2004</p>
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>
                    </div>
                    <div class="Home parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Home.png" alt="">
                                <p>Home</p>
                            </div>
                            <div class="right2">
                                <p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(7) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                            </div>
                        </div>
                    </div>
                    <div class="Travel parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Travel.png" alt="">
                                <p>Travel</p>
                            </div>
                            <div class="right2">
                                <p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(8) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                            </div>
                        </div>
                    </div>
                    <div class="Work parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Work.png" alt="">
                                <p>Work</p>
                            </div>
                            <div class="right2">
                                <p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(9) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                            </div>
                        </div>
                    </div>
                    <div class="Health parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Health.png" alt="">
                                <p>Health</p>
                            </div>
                            <div class="right2">
                                <p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(10) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                            </div>
                        </div>
                    </div>
                    <div class="Others parent_item">
                        <div class="parent_item1">
                            <div class="left2">
                                <img src="/QuanLyChiTieu/img/icon_activity/Others.png" alt="">
                                <p>Others</p>
                            </div>
                            <div class="right2">
                                <p>Total money: <%=formatMoneyVND(current_total_money_of_parent_item.get(11) + "") + " VND" %></p>
                            </div>
                            <i class="fa-solid fa-plus add"></i>
                        </div>
                        <div class="detail_parent_item1">
                            <div class="scroll">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="blur1"></div>
        <div class="add_expense_box">
            <div class="title">
                <p>Add Expense Eating</p>
            </div>
            <div class="input">
                <div class="info input_child">
                    <p class="left">Name:</p>
                    <input type="text">
                </div>
                <div class="money input_child">
                    <p class="left">Money:</p>
                    <input type="text">
                    <p>VND</p>
                </div>
                <div class="date input_child">
                    <p class="left">Date:</p>
                    <input id="date" type="date" lang="en">
                </div>
                <div class="add_or_subtract input_child">
                    <div class="add child">
                        <p>Add</p>
                        <input id="radio_add" type="radio" name="add_or_subtract">
                    </div>
                    <div class="subtract child">
                        <p>Subtract</p>
                        <input id="radio_subtract" type="radio" name="add_or_subtract">
                    </div>
                </div>
            </div>
            <div class="contain_button">
                <button id="add_item_button">Add</button>
                <div class="on_button"></div>
                <p id="add_expense_success" style="display: none;">Add expense successfully!</p>
            </div>
            <i id="close_add" class="fa-solid fa-xmark"></i>
        </div>
        
        
        <div id="box_update" class="add_expense_box" style="scale: 0;">
            <div class="title">
                <p>Reset Item</p>
            </div>
            <div class="input">
                <div class="info input_child">
                    <p class="left">Name:</p>
                    <input id="name_reset" type="text">
                </div>
                <div class="money input_child">
                    <p class="left">Money:</p>
                    <input id="money_reset" type="text">
                    <p>VND</p>
                </div>
                <div class="date input_child">
                    <p class="left">Date:</p>
                    <input id="date" type="date" lang="en">
                </div>
                <div class="add_or_subtract input_child">
                    <div class="add child">
                        <p>Add</p>
                        <input id="radio_add_reset" type="radio" name="add_or_subtract">
                    </div>
                    <div class="subtract child">
                        <p>Subtract</p>
                        <input id="radio_subtract_reset" type="radio" name="add_or_subtract">
                    </div>
                </div>
            </div>
            <div class="contain_button">
                <button id="reset_item_button">Reset</button>
                <button id="delete_button">Delete</button>
                <div id="on_button_update" class="on_button"></div>
                <p id="reset_success" style="display: none;">Reset Successfully!</p>
            </div>
            <i id="close_update_box" class="fa-solid fa-xmark"></i>
        </div>
        <div class="confirm_delete">
            <p>Do you want to delete this item?</p>
            <div class="button">
                <button id="confirm">Confirm</button>
                <button id="cancle">Cancel</button>
            </div>
        </div>
        
        <script type="text/javascript">
        	var date_from_end = <%=convert_all_data_to_Json(date)%>;
        	var all_data = <%=convert_all_data_to_Json(all_data)%>;
        </script>

        <script src="/QuanLyChiTieu/show_all/front_end.js"></script>
        <script src="/QuanLyChiTieu/show_all/add_item.js"></script>
        <script src="/QuanLyChiTieu/show_all/set_up_item.js"></script>
        <script src="/QuanLyChiTieu/show_all/click_setup_item.js"></script>
    </body>
</html>