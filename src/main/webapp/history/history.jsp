<%@page import="utils.convert_JavaObject_to_Json"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="utf-8"%>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home - Expense Management</title>
        <link rel="stylesheet" href="/QuanLyChiTieu/history/css.css"/>
        <link rel="stylesheet" href="/QuanLyChiTieu/history/css1.css"/>
        <!-- Unicons -->
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/fontawesome.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/brands.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/solid.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Madimi+One&family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap" rel="stylesheet">
    </head>
    <% 
    	List<List<Object>> all_project_of_user = (List<List<Object>>)request.getAttribute("all_project_of_user");
    	String all_project_of_user_json = convert_JavaObject_to_Json.convertObjectToJson(all_project_of_user);
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
                    <div class="Report tag1">
                        <i class="fa-solid fa-clock"></i>
                        <p>Report</p>
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
                <p>YOUR HISTORY</p>
            </div>
            <div class="main">
                <div class="main_1">
                    <div class="create_new_project">
                        <div class="add_shape" style="transform: translateX(50px); cursor: pointer; transition: 0.3s;">
                            <div class="row" style="height: 20px; width: 80px; background-color:#baddff; position: absolute; border-radius: 10px; box-shadow: 1px 1px 2px 1px gray;"></div>
                            <div class="column" style="height: 80px; width: 20px; background-color: #baddff; position: absolute; top: -30px; left: 30px; border-radius: 10px; box-shadow: 0px 0px 2px -3px gray;"></div>
                        </div>
                        <p style="font-size: 20px; font-weight: 500;">Create New Project.</p>
                    </div>
                
             
                </div>
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
                    <input type="text" class="input create_project">
                    <p>VND</p>
                </div>
            </div>
            <p id="create_project_successfully" style="color: #baddff; display: none; position: absolute; bottom: 70px" >Create successfully! See it in history.</p>
            <div style="position: relative">
            	<button id="save_create_project">Save</button>
            	<div id="on_button" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"></div>
            </div>
            
        </div>
        
        <div class="create_project_box" style="scale: 0;">
            <i id="close_create_project_box" class="fa-solid fa-xmark"></i>
            <p class="title_setup_project" id="title_create_project_box">Set Up Project</p>
            <div class="contain_child_create_project">
                <div class="name child_create_project_box">
                    <p class="left">Name:</p>
                    <input type="text" id="input_name_setup" class="input name_project">
                </div>
                <div class="to child_create_project_box">
                    <p class="left">End Date:</p>
                    <input class="end_date" id="date" type="date" lang="en">
                </div>
                <div class="money child_create_project_box">
                    <p class="left">Max Money:</p>
                    <input id="input_money_setup" type="text" class="input input_money">
                    <p>VND</p>
                </div>
            </div>
            <div class="button">
                <button id="save_edit">Save</button>
                <button id="choose_edit">Choose</button>
                <button id="delete">Delete</button>
            </div>
        </div>
		<script type="text/javascript">
			var all_project_of_user = <%=all_project_of_user_json%>;
			console.log(all_project_of_user);
			var history_tag = document.querySelector("body .left1 .tags .tag .history");
			history_tag.style.backgroundColor = "#F8F9F9";
			var history_point = document.querySelector("body .left1 .tags .tag .history .point");
			history_point.style.display = "block";
		</script>
        <script src="/QuanLyChiTieu/history/create_new_project.js"></script>
        <script src="/QuanLyChiTieu/history/edit_project.js"></script>
        <script src="/QuanLyChiTieu/history/set_up_project.js"></script>
         <script src="/QuanLyChiTieu/history/change_tab.js"></script>
    </body>
</html>