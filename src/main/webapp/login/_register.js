/**
 * 
 */
var input_in_register = document.querySelector("#email_register");
var button_continue = document.querySelector("#continue_register");
var status_register = "email";
var on_eye_register = document.querySelector("#eye_on_register");
var off_eye_register = document.querySelector("#eye_off_register");
var text_register = document.querySelector("#text_register");

var email_value_register = "";
var password_value_register = "";
var confirm_password_register = "";
button_continue.addEventListener("click", () => 
	{
		button_continue.querySelector("p").innerHTML = "Processing...";
		if (status_register == "email"){
			handle_check_email_in_register();
		}
		else if (status_register == "password"){
			handle_password();
		}
		else if (status_register == "confirm"){
			status_register = "confirm";
			handle_confirm();
		}
		console.log(status_register);
	}
)

function handle_check_email_in_register(){
	if (validateEmail(input_in_register) == 1){
		submit_check_email_in_register(); 
	}
	else{
		set_error_for_input(input_in_register);
		button_continue.querySelector("p").innerHTML = "Continue";
	}
	
}
function submit_check_email_in_register() {
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_in_login", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "input=" + input_in_register.value + "&action=check_email_in_register"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	console.log(resp);
		if (resp == "successfully"){
			status_register = "password";
			email_value_register = input_in_register.value;
			display_eye(on_eye_register, off_eye_register, input_in_register);	
			input_in_register.placeholder = "Your password:";
			text_register.innerHTML = "Password";
		}
		else{
			set_error_for_input(input_in_register);
		}
		button_continue.querySelector("p").innerHTML = "Continue";
    }
}
// handle password
function handle_password(){
	if (validatePassword(input_in_register) == 0){
		button_continue.querySelector("p").innerHTML = "Continue";
		set_error_for_input(input_in_register);
		display_password_error();
	}
	else{
		button_continue.querySelector("p").innerHTML = "Continue";
		password_value_register = input_in_register.value;
		console.log(password_value_register);
		display_eye(on_eye_register, off_eye_register, input_in_register);	
		input_in_register.placeholder = "Confirm:";
		text_register.innerHTML = "Confirm password";
		status_register = "confirm";
	}
}

// handle confirm
function handle_confirm(){
	if (input_in_register.value == password_value_register){
		submit_form_create_account();
	}
	else{
		set_error_for_input(input_in_register);
		button_continue.querySelector("p").innerHTML = "Continue";
	}
}

function submit_form_create_account(){
	var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_in_login", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "email=" + email_value_register + "&password=" + password_value_register + "&action=create_account"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
		if (resp == "successfully"){
			display_successfull();
		}
		else{
			
		}
		button_continue.querySelector("p").innerHTML = "Continue";
    }
}
function reset_register(){
	email_value_register = "";
	password_value_register = "";
	confirm_password_register = "";
	status_register = "email";
	on_eye_register.style.display = "none";
	off_eye_register.style.display = "none";
	input_in_register.type = "text";
	text_register.innerHTML = "Email";
	input_in_register.placeholder = "Email:";
	input_in_register.value = "";
}
