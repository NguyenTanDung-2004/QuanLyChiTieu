// xử lí sự kiện nhấn button chuyển tab.
    var button_forgot_in_login = document.querySelector("#forgot_password_in_login");
    var forgot_tab = document.querySelector("#forgot_tab");
    var login_tab = document.querySelector("#login_tab");
    var signup_tab = document.querySelector("#sign_up_tab");
    var button_login_tab = document.querySelector("#login_button_tab");
    var button_register_tab = document.querySelector("#register_button_tab");
    button_login_tab.addEventListener("click", () =>
        {
            button_login_tab.style.color = "white";
            button_login_tab.style.transform = "scale(1.2)";
            button_login_tab.style.borderBottom = "3px solid #baddff";
            button_register_tab.style.transform = "scale(1)";
            button_register_tab.style.borderBottom = "none";
            button_register_tab.style.color = "#B5C0D0";
            signup_tab.style.display = "none";
            forgot_tab.style.display = "none";
            login_tab.style.display = "block";
        }
    )
    button_login_tab.click();
    button_register_tab.addEventListener("click", () =>
        {
			reset_register();
            button_register_tab.style.color = "white";
            button_register_tab.style.transform = "scale(1.2)";
            button_register_tab.style.borderBottom = "3px solid #baddff";
            button_login_tab.style.transform = "scale(1)";
            button_login_tab.style.borderBottom = "none";
            button_login_tab.style.color = "#B5C0D0";
            signup_tab.style.display = "block";
            login_tab.style.display = "none";
            forgot_tab.style.display = "none";
        }
    )

    // event to change tab forgot in login
    button_forgot_in_login.addEventListener("click", () => 
        {
            button_login_tab.style.color = "#B5C0D0";
            button_login_tab.style.transform = "scale(1)";
            button_login_tab.style.borderBottom = "none";
            button_register_tab.style.transform = "scale(1)";
            button_register_tab.style.borderBottom = "none";
            button_register_tab.style.color = "#B5C0D0";
            signup_tab.style.display = "none";
            login_tab.style.display = "none";
            forgot_tab.style.display = "block";
        }
    )

    // event for changing login tab in forgot
    var button_login_in_forgot = document.querySelector("#login_in_forgot");
    button_login_in_forgot.addEventListener("click", () => 
        {
            button_login_tab.style.color = "white";
            button_login_tab.style.transform = "scale(1.2)";
            button_login_tab.style.borderBottom = "3px solid #baddff";
            button_register_tab.style.transform = "scale(1)";
            button_register_tab.style.borderBottom = "none";
            button_register_tab.style.color = "#B5C0D0";
            signup_tab.style.display = "none";
            forgot_tab.style.display = "none";
            login_tab.style.display = "block";
        }
    )
    // event for changing register tab in login.
    var button_register_in_login = document.querySelector("#register_in_login");
    button_register_in_login.addEventListener("click", () => 
        {
			reset_register();
            button_register_tab.style.color = "white";
            button_register_tab.style.transform = "scale(1.2)";
            button_register_tab.style.borderBottom = "3px solid #baddff";
            button_login_tab.style.transform = "scale(1)";
            button_login_tab.style.borderBottom = "none";
            button_login_tab.style.color = "#B5C0D0";
            signup_tab.style.display = "block";
            login_tab.style.display = "none";
            forgot_tab.style.display = "none";
        }
    )
    // event for changing login tab in register
    var button_login_in_register = document.querySelector("#login_in_register");
    button_login_in_register.addEventListener("click", () => 
        {
            button_login_tab.style.color = "white";
            button_login_tab.style.transform = "scale(1.2)";
            button_login_tab.style.borderBottom = "3px solid #baddff";
            button_register_tab.style.transform = "scale(1)";
            button_register_tab.style.borderBottom = "none";
            button_register_tab.style.color = "#B5C0D0";
            signup_tab.style.display = "none";
            forgot_tab.style.display = "none";
            login_tab.style.display = "block";
        }
    )



// xử lí sự kiện hiển thị password.
    var eye_on_login = document.querySelector("#eye_on_login");
    var eye_off_login = document.querySelector("#eye_off_login");
    eye_off_login.addEventListener("click", () => 
        {
            var password_login = document.querySelector("#password_login");
            password_login.type = "text";
            eye_on_login.style.display = "block";
            eye_off_login.style.display = "none";
        }
    )
    eye_on_login.addEventListener("click", () =>
        {
            var password_login = document.querySelector("#password_login");
            password_login.type = "password";
            eye_on_login.style.display = "none";
            eye_off_login.style.display = "block";
        }
    )
