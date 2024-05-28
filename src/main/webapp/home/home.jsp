
<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="utf-8"%>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home - Expense Management</title>
        <link rel="stylesheet" href="../home/home.css"/>
        <!-- Unicons -->
        <link rel="stylesheet" href="../fontawesome-free-6.5.1-web/css/fontawesome.css">
        <link rel="stylesheet" href="../fontawesome-free-6.5.1-web/css/brands.css">
        <link rel="stylesheet" href="../fontawesome-free-6.5.1-web/css/solid.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Madimi+One&family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap" rel="stylesheet">
    </head>
    <body>
        <div class="img">
        </div>
<!--header-->
        <div class="header">
            <div class="logo">
                <img src="../img/logo.png" alt="" style="width: 100px;">
                <div class="text">
                    <p class="big">Money Keeper</p>
                    <p class="small">Simplify Expense Management</p>
                </div>
            </div>
            <div id="button_login" class="button_login">
                <button>Login</button>
            </div>
        </div>
<!--main-->
        <div class="main">
            <div class="text0 text">
                <p id="title" style="transition: 0.3s;" class="title">What is personal financial management?</h1>
                <p id="content" style="transition: 0.3s;" class="content">While the moniker “personal financial management” is often used to refer to ways of managing your personal finances, it is also an actual term often known by its acronym, PFM, and refers to the type of software used for personal finance apps. </p>
            </div>
            <div class="text1 text">
                <p id="title" style="transition: 0.3s;" class="title">Money Management Tips</h1>
                <p id="content" style="transition: 0.3s;" class="content">While the moniker “personal financial management” is often used to refer to ways of managing your personal finances, it is also an actual term often known by its acronym, PFM, and refers to the type of software used for personal finance apps.</p>
            </div>
            <div class="text2 text">
                <p id="title" style="transition: 0.3s;" class="title">5 Ways to Manage Your Personal Finances</h1>
                <p id="content" style="transition: 0.3s;" class="content">Money can evoke a range of difficult emotions for many of us. This anxiety only grows when we’re living through economically fragile times or don’t come from wealth.</p>
             
            </div>
            <div class="text3 text">
                <p id="title" style="transition: 0.3s;" class="title">Personal Spending Plan: What it Means, How it Works</h1>
                <p id="content" style="transition: 0.3s;" class="content">A spending plan is an informal document used to determine the cash flow of an individual or household. A personal spending plan, similar to one's budget, helps outline where income is earned and where expenses are incurred.</p>
         
            </div>
            <div class="text4 text">
                <p id="title" style="transition: 0.3s;" class="title">9 Essential Rules of Personal Finance That You Should Follow</h1>
                <p id="content" style="transition: 0.3s;" class="content">Managing, budgeting and saving money is certainly no easy task – discover the essential rules of personal finance that will make your life easier and your money last longer</p>
                
            </div>
        </div>
        <div id="see-all" class="button">
            <p>See All</p>
            <i class="fa-solid fa-arrow-right"></i>
        </div>
<!--footer-->        
        <div class="footer">
            <div class="button">
                <i id="move_left" class="fa-solid fa-chevron-left"></i>
                <i id="move_right" class="fa-solid fa-chevron-right"></i>
            </div>
            <div class="dot">
                <div class="dot1 dot_child"></div>
                <div class="dot2 dot_child"></div>
                <div class="dot3 dot_child"></div>
                <div class="dot4 dot_child"></div>
                <div class="dot5 dot_child"></div>
            </div>
        </div>
        <script src="../home/home.js"></script>
    </body>

</html>