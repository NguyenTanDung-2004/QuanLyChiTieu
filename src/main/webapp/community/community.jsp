<%@page import="com.google.gson.Gson"%>
<%@page import="database.interact_with_comment"%>
<%@page import="java.time.format.DateTimeFormatter"%>
<%@page import="java.time.LocalDate"%>
<%@page import="database.interact_with_post"%>
<%@page import="java.util.ArrayList"%>
<%@page import="database.interact_with_notify"%>
<%@page import="database.interact_with_user"%>
<%@page import="database.interact_with_project"%>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Community</title>
        <link rel="stylesheet" href="/QuanLyChiTieu/community/css.css"/>
        <link rel="stylesheet" href="/QuanLyChiTieu/community/css1.css"/>
        <!-- Unicons -->
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/fontawesome.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/brands.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/solid.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Madimi+One&family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap" rel="stylesheet">
    </head>
        <%
    	int id_user = (Integer) request.getSession().getAttribute("user_id");
        int project_id = (Integer) request.getSession().getAttribute("project_id");
    
    	interact_with_user obj = new interact_with_user();
    	ArrayList<Object> info = obj.get_info_user(id_user);
    	
    	String username = (String) info.get(0);
    	String img = (String) info.get(1);
    	if (img == "") img = "/QuanLyChiTieu/img/default_avatar.png";
    	
    	interact_with_project obj1 = new interact_with_project();
    	String project_name = obj1.get_name_project(project_id);
    	
       ArrayList<ArrayList<Object>> notifyList = interact_with_notify.get_list_notify(id_user,1);
       int size_of_notify = notifyList.size();
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
                <div class="log_out">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span class="link">Log out</span>
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
                    <div class="notify">
                        <i class="fa-solid fa-bell"></i>
						<div class="notify-container">
						    <%if (size_of_notify > 0) { %> 
						    <% for (ArrayList<Object> notify : notifyList) {
						        if (!notify.isEmpty()) { // Kiểm tra mảng notify có phần tử không
						            String name = (String) notify.get(0);
						            String img1 = (String) notify.get(1);
						            String date = (String) notify.get(2);
						            
						            if (img1 == "") { // Kiểm tra mảng notify có ít nhất 2 phần tử
						                img1 = "/QuanLyChiTieu/img/default_avatar.png";
						            }
						    %>
						    <div class="notify-item">
						        <div class="notify-item__avatar">
						            <img src="<%=img1%>" alt="Avatar">
						        </div>
						        <div class="text">
						            <span class="content1"><%=name %> mentioned you in a comment</span>
						            <span class="date"><%=date %></span>
						        </div>
						    </div>
						    <% } }
							} else {%>
							<span class="no-notify" >You have no notifications.</span>
							<% } %>
						</div>
						<%if (size_of_notify > 0) { %>
	                        <div class="notify-badge">
	                        <% String notify_number = "";
	                           if (size_of_notify > 99) notify_number = "99+";
	                           else notify_number = size_of_notify + "";%>
	                            <span class="notify-badge__number"><%=notify_number %></span>
	                        </div>
	                    <%} %>
	                    </div>
                    <div class="avatar">
                        <img  src="<%=img%>" alt="Avatar">
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="title">
                    <p class="titleName">FORUM SHARING</p>
                    <div class="titleTime">
                        <!-- <i class="fa-solid fa-caret-left" id="prevDay"></i> -->
                        <input id="date" type="date" lang="en">
                        <!-- <i class="fa-solid fa-caret-right" id="nextDay"></i> -->
                    </div>
                </div>
                <div class="mainScroll" id="forumContent">
                
                </div>
            </div>
            <div class="createParent">
                    <input class="contentParent" type="text" placeholder="Write your question....">
                    <i class="fa-regular fa-paper-plane" id="iconPost"></i>
             </div>
        </div>
        
                <div class="modal user-setting">
            <div class="overlay"></div>
            <div class="body">
                <div class="btn-close">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <span class="title">User setting</span>
                <div class="avatar-img">
                    <img src="<%=img %>" alt="Avatar">
                </div>
                <div class="username">
                    <span class="name">Username:</span>
                    <input type="text" name="name" id="name" value="<%=username%>">
                </div>
                <button class="btn-save" id="save-info">SAVE</button>
            </div>
        </div>
            <script src="/QuanLyChiTieu/community/change_tab.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
            <script src="/QuanLyChiTieu/community/community.js"></script>
            <script src="/QuanLyChiTieu/community/insert_post.js"></script>
            <script src="/QuanLyChiTieu/community/logout.js"></script>
            <script src="/QuanLyChiTieu/community/notify.js"></script>
            <script src="/QuanLyChiTieu/community/user_setting.js"></script>
    </body>
</html>