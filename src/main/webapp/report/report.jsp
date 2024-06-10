<%@page import="java.text.NumberFormat"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="com.google.gson.Gson"%>
<%@ page import="com.google.gson.GsonBuilder"%>
<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="utf-8"%>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Report</title>
        <link rel="stylesheet" href="/QuanLyChiTieu/report/report.css"/>
        <link rel="stylesheet" href="/QuanLyChiTieu/report/scrollbar.css"/>
        <!-- Unicons -->
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/fontawesome.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/brands.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/solid.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Madimi+One&family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap" rel="stylesheet">
    </head>
    <%
	    NumberFormat numberFormat = NumberFormat.getInstance();
	    numberFormat.setGroupingUsed(false);
	    numberFormat.setMaximumFractionDigits(0);
	    numberFormat.setMinimumFractionDigits(0);
	
	    ArrayList<String> detail_project = (ArrayList<String>) request.getAttribute("detail_project");
	    ArrayList<ArrayList<String>> detail_item = (ArrayList<ArrayList<String>>) request.getAttribute("detail_item");
	    ArrayList<ArrayList<String>> detail_parent_item = (ArrayList<ArrayList<String>>) request.getAttribute("detail_parent_item");
	    float totalMoney1 = (float) request.getAttribute("totalMoney");
	    String totalMoney = numberFormat.format(totalMoney1);
    	float expenseMoney1 = (float)request.getAttribute("expenseMoney");
    	String expenseMoney = numberFormat.format(expenseMoney1);
    %>
    <%! 
    public String formatMoneyVND(String numberString) {
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

        // Reverse back to the correct order
        return formatted.reverse().toString();
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
            <div class="main">
                <div class="main1">
                    <div class="infoProject">
                        <p class="title">Information</p>
                        <div class="nameProject">
                            <i class="fa-solid fa-circle"></i>
                            <p class="name"><%= detail_project.get(1)%></p>
                        </div>
                        <div class="timeProject">
                            <i class="fa-regular fa-calendar-days"></i>
                            <div class="time">
                                <div class="from">
                                    <p>FROM:</p>
                                    <p class="timeFrom"><%= detail_project.get(3)%></p>
                                </div>
                                <div class="to">
                                    <p>TO:</p>
                                    <p class="timeTo"><%= detail_project.get(4)%></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="expenditure">
                        <p class="title">Expenditure</p>
                        <div class="content">
						    <div class="contentName">
						        <p class="name1">Origin</p>
						        <p class="name1">Total Current</p>
						        <p class="name1">Expense</p>
						        <!-- <p class="name1">Rest</p> -->
						    </div>
						    <div class="contentMoney">
						    <%String originMoney = formatMoneyVND(detail_project.get(2)); %>
						        <p class="money1"><%= originMoney + " VND"%></p>
						        <p class="money1"><%= formatMoneyVND(totalMoney)+ " VND"%></p>
						        <p class="money1"><%= formatMoneyVND(expenseMoney)+ " VND"%></p>
						        <!-- <p class="money1">-15.000.000 VND</p> -->
						    </div>
						</div>
                    </div>
                </div>

                 <div class="main2">
                    <div class="chart">
                        <canvas id="doughnut" width="50" height="50"></canvas>
                    </div>
                    <div class="items">
                    <% 
                    float total = Math.abs(totalMoney1);
                    ArrayList<Float> rate = new ArrayList<Float>();
                    ArrayList<String> subject = new ArrayList<String>();
                    for(int i = 0 ; i < detail_parent_item.size() ; i++) { 
                    	subject.add(detail_parent_item.get(i).get(1));
                    	Float moneyValue = Float.parseFloat(detail_parent_item.get(i).get(2));
                        float rateValue = (moneyValue / total) * 100;
                        rateValue = Float.parseFloat(String.format("%.2f", rateValue));
                        if (!Float.isNaN(rateValue) && !Float.isInfinite(rateValue)) {
                            rate.add(rateValue);
                        } else {
                            rate.add(0.0f);  
                        }

                    %>
                        <div class="item1">
                            <img class="imgItem" src="../QuanLyChiTieu/img/icon_activity/<%= detail_parent_item.get(i).get(1)%>.png" />
                            <div class="detailItem">
                                <p class="subject"><%= detail_parent_item.get(i).get(1)%></p>
                                <p class="money"><%= formatMoneyVND(detail_parent_item.get(i).get(2)) + " VND"%></p>
                                <p class="rate"><%= rate.get(i) + "%" %></p>
                            </div>
                        </div>
                        <% }   
                    	Gson gson = new Gson();
                        String subjectsJson = gson.toJson(subject);
                        String ratesJson = gson.toJson(rate); %>
                    </div>
                </div>


                <div class="main3">
                    <div class="filter">
                        <button>
                            <p>Filter</p>
                            <i class="fa-solid fa-filter"></i>
                        </button>
                    </div>
    
                    <div class="tableItem">
                        <table class="detailActivities" border="0" cellspacing="0">
                            <thead>
                                <tr class="row1">
                                    <th>Item</th>
                                    <th>Detail</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Money</th>
                                </tr>
                            </thead>
                            <tbody class="tbody1">
                            <% 
                            if (detail_item != null && !detail_item.isEmpty()) {
                                for(int j = 0 ; j < detail_item.size(); j++) { %>
                                    <tr class="row2">
                                        <td><%= detail_item.get(j).get(4) %></td>
                                        <td><%= detail_item.get(j).get(0) %></td>
                                        <td><%= detail_item.get(j).get(2) %></td>
                                        <% if(detail_item.get(j).get(3).equals("subtract")) { %>
                                            <td><img src="../QuanLyChiTieu/img/minus.png" /></td>
                                        <% } else { %>
                                            <td><img src="../QuanLyChiTieu/img/plus.png" /></td>
                                        <% } %>
                                        <td><%= formatMoneyVND(detail_item.get(j).get(1)) + " VND" %></td>
                                    </tr>
                              <% }
                            } else { %>
                                    <tr class="row2">
                                        <td colspan="5">No data available</td>
                                    </tr>
                            <% } %>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="/QuanLyChiTieu/report/report.js"></script>
        <script src="/QuanLyChiTieu/report/change_tab.js"></script>
        
        
        <script>
        //CHART
        // Chuyển đổi mảng subjects từ JSP sang JavaScript
        const subjects = <%= subjectsJson %>;
        const rates = <%= ratesJson %>;

        const ctx = document.getElementById('doughnut');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: subjects,
                datasets: [{
                    label: '# of Votes',
                    data: rates,
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    </script>
    </body>
</html>