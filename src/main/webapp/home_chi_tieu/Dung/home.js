
var main = document.querySelector("body .right1 .main");
var create_first_project = document.querySelector("body .create_first_project");
if (user_have_project == 1){
	main.style.display = "flex";
	create_first_project.style.display = "none";
}
else{
	main.style.display = "none";
	create_first_project.style.display = "flex";
}
// function handle create project
var input_money = document.querySelector("body .create_project_box .money input");
var input_name = document.querySelector("body .create_project_box .name input");
var input_date = document.querySelector("#date");
var save_create_project = document.querySelector("#save_create_project");
save_create_project.addEventListener("click", () => {
	handle_save_click();
})
function handle_save_click(){
	save_create_project.innerHTML = "saving...";
	submit_save_project();
}

function checkSomethingRepeatedly() {
    // Define the function to be repeated
    function checkSomething() {
       var date = input_date.value;
       var money = input_money.value;
       var name = input_name.value;
       if (date != "" && money != "" && name != ""){
		   save_create_project.style.opacity = "1";
		   var on_button = document.querySelector("#on_button");
		   on_button.style.display = "none";
	   }
	   else{
		   save_create_project.style.opacity = "0.5";
		   var on_button = document.querySelector("#on_button");
		   on_button.style.display = "block";
	   }
	   
    }

    // Call the function immediately
    checkSomething();

    // Set interval to repeat the function every second (1000 milliseconds)
    var intervalId = setInterval(checkSomething, 10);

    // Optionally, you can return the intervalId if you want to clear the interval later
    return intervalId;
}
function hover_for_button(button){
	button.addEventListener("mouseenter", () => 
		{
			
		}
	)
	button.addEventListener("mouseleave", () => 
		{
			
		}
	)
}

        // Start repeating the function
        checkSomethingRepeatedly();
// submit save project.
function submit_save_project(){
	var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_home_chi_tieu", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "name=" + input_name.value + "&max_money=" + input_money.value.replace(/\D/g, '') + "&date=" + input_date.value + "&action=create_project"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	if (resp == "successfully"){
			var create_project_successfully = document.querySelector("#create_project_successfully");
			create_project_successfully.style.display = "block";
			window.location = "http://localhost:8080/QuanLyChiTieu/home_chi_tieu";
		}
		else{
			
		}
		save_create_project.innerHTML = "Save";
    }
}

var show_all_activity = document.querySelector("#show_all_activity");
show_all_activity.addEventListener("click", () => 
	{
		window.location = "http://localhost:8080/QuanLyChiTieu/show_all";
	}
)