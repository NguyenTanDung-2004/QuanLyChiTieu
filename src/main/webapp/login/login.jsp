<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="utf-8"%>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home - Expense Management</title>
        <link rel="stylesheet" href="/QuanLyChiTieu/login/login.css"/>
        <!-- Unicons -->
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/fontawesome.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/brands.css">
        <link rel="stylesheet" href="/QuanLyChiTieu/fontawesome-free-6.5.1-web/css/solid.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Madimi+One&family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap" rel="stylesheet">
    </head>
    <body>
<!--blur-->
        <div class="blur1"></div>
        <div class="blur2"></div>
        <div class="blur3"></div>
        <div class="blur4"></div>
        <div class="blur_form"></div>
<!--blur-->
        <form class="form" action="">
            <div class="header">
                <p id="login_button_tab">Login</p>
                <p id="register_button_tab">Register</p>
            </div>
            <div id="login_tab" class="login" style="display: none;">
                <div class="input">
                    <div class="email input2">
                        <p>Email</p>
                        <input id="email_login" type="" placeholder="Your email: "/>
                    </div>
                    <div class="text input2">
                        <p>Password</p>
                        <input id="password_login" type="password" placeholder="Your password: ">
                        <i id="eye_on_login" class="fa-solid fa-eye" style="display: none;"></i>
                        <i id="eye_off_login" class="fa-solid fa-eye-slash" ></i>
                    </div>
                </div>
                <div class="forgot">
                    <p id="forgot_password_in_login">Forgot password?</p>
                </div>
                <div class="button">
                    <div class="login">
                        <p id="button_login_in_login">Login</p>
                    </div>
                    <div class="signup">
                        <p class="left">Don't have an account yet?</p>
                        <p id="register_in_login" class="right">Register</p>
                    </div>
                    <div class="or">
                        <div class="line"></div>
                        <p>OR</p>
                        <div class="line"></div>
                    </div>
                    <div id="button_continue_google" class="continue_google">
                        <img src="/QuanLyChiTieu/img/google.png" alt="" style="height: 25px; width: 25px;">
                        <p>Continue with Google</p>
                    </div>
                </div>
            </div>
            <div id="sign_up_tab" class="sign_up" style="display: none;">
                <div class="text">
                    <p id="text_register">Email</p>
                </div>
                <div class="input">
                    <input id="email_register" type="email" placeholder="Your email:">
                    <i id="eye_on_register" class="fa-solid fa-eye" style="display: none;"></i>
                    <i id="eye_off_register" class="fa-solid fa-eye-slash" style="display: none"></i>
                    <p id="error_password">password must be at least 8 characters including numbers, characters, special characters</p>
                	<p id="successfull_create">Congratulation! You created new account, successfully.</p>
                </div>
                <div id="continue_register" class="button">
                    <p id="button_continue_in_register">Continue</p>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <div class="have_account">
                    <p>Already have an account?</p>
                    <p id="login_in_register" class="right">Login</p>
                </div>
                <div class="or">
                    <div class="line"></div>
                    <p>OR</p>
                    <div class="line"></div>
                </div>
                <div id="button_continue_google" class="continue_with_google">
                    <img src="/QuanLyChiTieu/img/google.png" alt="" style="height: 25px; width: 25px;">
                    <p>Continue with Google</p>
                </div>
            </div>
            <div id="forgot_tab" class="forgot_password" style="display: block;">
                <div class="text">
                    <p id="text_forgot">Email</p>
                </div>
                <div class="input">
                    <input id="input_in_forgot" type="email" placeholder="Your email:">
                    <i id="eye_on_forgot" class="fa-solid fa-eye" style="display: none; color: white; cursor: pointer;"></i>
                    <i id="eye_off_forgot" class="fa-solid fa-eye-slash" style="display: none; color: white; cursor: pointer;"></i>
                    <p id="error_password_forgot">password must be at least 8 characters including numbers, characters, special characters</p>
                	<p id="successfull_create_forgot">Congratulation! You reseted successfully.</p>
                </div>
                <div id="continue_forgot" class="button">
                    <p>Continue</p>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <div class="have_account">
                    <p>Already have an account?</p>
                    <p id="login_in_forgot" class="right">Login</p>
                </div>
            </div>
            <div class="main"></div>
        </form>
        <script src="/QuanLyChiTieu/login/login.js"></script>
        <script src="/QuanLyChiTieu/login/login_register_forgot.js"></script>
        <script src="/QuanLyChiTieu/login/_register.js"></script>
        <script src="/QuanLyChiTieu/login/_login.js"></script>
        <script src="/QuanLyChiTieu/login/_forgot.js"></script>
    </body>
</html>
