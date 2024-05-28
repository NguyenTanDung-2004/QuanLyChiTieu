/**
 * 
 */
var input_in_forgot = document.querySelector("#input_in_forgot");
var eye_off_forgot = document.querySelector("#eye_off_forgot");
var eye_on_forgot = document.querySelector("#eye_on_forgot");
var error_password_in_forgot = document.querySelector("#error_password_forgot");
var reset_successfull = document.querySelector("#successfull_create_forgot");
var button_continue_in_forgot = document.querySelector("#continue_forgot");
var forgot_title = document.querySelector("#text_forgot");
var status_forgot = "email";
var email_forgot_value = "";
var password_forgot_value = "";
button_continue_in_forgot.addEventListener("click", () => 
	{
		button_continue_in_forgot.querySelector("p").innerHTML = "Processing...";
		if (status_forgot == "email"){
			handle_email_in_forgot();
		}
		else if (status_forgot == "code"){
			handle_code();
		}
		else if (status_forgot == "new"){
			handle_new_password_in_forgot();
		}
		else if (status_forgot == "confirm"){
			handle_confirm_forgot();
		}
	}
)

// function handle email

function handle_email_in_forgot(){
	if (validateEmail(input_in_forgot) == 0){
		set_error_for_input(input_in_forgot);
		button_continue_in_forgot.querySelector("p").innerHTML = "Continue";
	}
	else{
		submit_email_forgot();
	}
}

function submit_email_forgot() {
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_in_login", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "email=" + input_in_forgot.value + "&action=email_forgot"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	if (resp == "successfully"){
			email_forgot_value = input_in_forgot.value;
			//display_eye(eye_on_forgot, eye_off_forgot, input_in_forgot);
			input_in_forgot.type = "text";
			input_in_forgot.placeholder = "Code:";
			forgot_title.innerHTML = "Your Code";
			status_forgot = "code";
			input_in_forgot.value = "";
		}
		else{
			set_error_for_input(input_in_forgot);
		}
		button_continue_in_forgot.querySelector("p").innerHTML = "Continue";
    }
}

// handle new password
function handle_new_password_in_forgot(){
	if (validatePassword(input_in_forgot) == 1){
		password_forgot_value = input_in_forgot.value;
		display_eye(eye_on_forgot, eye_off_forgot, input_in_forgot);
		input_in_forgot.type = "password";
		input_in_forgot.placeholder = "Confirm password:";
		forgot_title.innerHTML = "Confirm Password";
		status_forgot = "confirm";
	}
	else{
		set_error_for_input(input_in_forgot);
		var password_error1 = document.querySelector("#error_password_forgot");
		password_error1.style.display = "none";
		button_continue_in_forgot.innerHTML = "Continue";
		var password_error1 = document.querySelector("#error_password_forgot");
		password_error1.style.display = "block";
	}
	button_continue_in_forgot.querySelector("p").innerHTML = "Continue";
}

//function handle code
function handle_code(){
	if (input_in_forgot.value.length != 4){
		set_error_for_input(input_in_forgot);
		button_continue_in_forgot.querySelector("p").innerHTML = "Continue";
	}
	else{
		submit_code_forgot();
	}
}
function submit_code_forgot() {
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_in_login", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "code=" + input_in_forgot.value + "&action=code"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	if (resp == "successfully"){
			display_eye(eye_on_forgot, eye_off_forgot, input_in_forgot);
			input_in_forgot.type = "password";
			input_in_forgot.placeholder = "New password:";
			forgot_title.innerHTML = "New Password";
			status_forgot = "new";
		}
		else{
			set_error_for_input(input_in_forgot);
		}
		button_continue_in_forgot.querySelector("p").innerHTML = "Continue";
    }
}

// handle confirm
function handle_confirm_forgot(){
	if (input_in_forgot.value != password_forgot_value){
		set_error_for_input(input_in_forgot);
		button_continue_in_forgot.innerHTML = "Continue";
	}
	else{
		submit_confirm_forgot();
	}
}

function submit_confirm_forgot(){
	var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_in_login", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "email_forgot=" + email_forgot_value + "&password_forgot=" + input_in_forgot.value + "&action=confirm_forgot"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	if (resp == "successfully"){
			var confirm_successfull = document.querySelector("#successfull_create_forgot");
			confirm_successfull.style.display = "block";
		}
		else{
			set_error_for_input(input_in_forgot);
		}
		button_continue_in_forgot.querySelector("p").innerHTML = "Continue";
    }
}