var input_email_login = document.querySelector("#email_login");
var input_password_login = document.querySelector("#password_login");
var button_login_in_login = document.querySelector("#button_login_in_login");
button_login_in_login.addEventListener("click", () => 
	{
		button_login_in_login.innerHTML = "Processing...";
		if (validateEmail(input_email_login) == 0){
			set_error_for_input(input_email_login);
			button_login_in_login.innerHTML = "Login";
		}
		else if (validatePassword(input_password_login) == 0){
			set_error_for_input(input_password_login);
			button_login_in_login.innerHTML = "Login";
		}
		else{
			submit_login();
		}
	}
)
function submit_login() {
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_in_login", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "email=" + input_email_login.value + "&password=" + input_password_login.value + "&action=login"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	console.log(resp);
    	if (resp == "email"){
			set_error_for_input(input_email_login);
			button_login_in_login.innerHTML = "Login";
			window.location = "http://localhost:8080/QuanLyChiTieu/home_chi_tieu";
			return;
		}
		else if (resp == "password"){
			set_error_for_input(input_password_login);
			button_login_in_login.innerHTML = "Login";
			return;
		}
		button_login_in_login.innerHTML = "Login";
		window.location = "http://localhost:8080/QuanLyChiTieu/home_chi_tieu";
		
    }
}


// continue google
var button_continue_google = document.querySelectorAll("#button_continue_google");
for (var i = 0; i < button_continue_google.length; i++){
	button_continue_google[i].addEventListener("click", () => 
		{
			window.location = "https://accounts.google.com/o/oauth2/auth?scope=email%20profile&redirect_uri=http://localhost:8080/QuanLyChiTieu/login_google&response_type=code&client_id=853526821776-n2qlqpahcjui51i13rug2h50vmahgheg.apps.googleusercontent.com&approval_prompt=force";
;
		}
	)
}