function set_error_for_input(input){
    input.style.borderWidth = "1px";
    input.style.borderColor = "red";
    input.style.borderStyle = "solid";
    input.style.borderRadius = "10";
    event_for_input(input);
}
// event for forcusing input.
function event_for_input(input){
    input.addEventListener("focus", () => 
        {
            input.style.border = "none";
            input.style.borderBottom = "1px solid white";
            var password_error = document.querySelector("#error_password");
			password_error.style.display = "none";
			var password_error1 = document.querySelector("#error_password_forgot");
			password_error1.style.display = "none";
        }
    )
}

function display_eye(on_eye, off_eye, input){
	off_eye.style.display = "block";
	on_eye.style.display = "none";
	input.type = "password";
	input.value = "";
	off_eye.addEventListener("click", () => 
		{
			off_eye.style.display = "none";
			on_eye.style.display = "block";
			input.type = "text";
		}
	)
	on_eye.addEventListener("click", () => 
		{
			off_eye.style.display = "block";
			on_eye.style.display = "none";
			input.type = "password";
		}
	)
}

// function check email using express regular
function validateEmail(email) {
    // Regular expression for validating an Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email.value) == true){
		return 1;
	}
	return 0;
}

// function check_password using express regular
function validatePassword(password) {
    // Regular expression for validating the password with at least one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;

    // Test the password against the regex
    if (passwordRegex.test(password.value) == true) {
        return 1;
    } else {
        return 0;
    }
}
function display_password_error(){
	var password_error = document.querySelector("#error_password");
	password_error.style.display = "block";
}
function hide_password_error(){
	var password_error = document.querySelector("#error_password");
	password_error.style.display = "none";
}

function display_successfull(){
	var succeffull_create = document.querySelector("#successfull_create");
	succeffull_create.style.display = "block";
}
