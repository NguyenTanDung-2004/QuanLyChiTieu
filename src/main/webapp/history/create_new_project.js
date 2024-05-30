// hover add project in home 
var add_project = document.querySelector("body .right1 .create_new_project .add_shape");
add_project.addEventListener("mouseenter", () => 
    {
        var row = document.querySelector("body .right1 .create_new_project .add_shape .row");
        row.style.backgroundColor = "#19609F";
        var column = document.querySelector("body .right1 .create_new_project .add_shape .column");
        column.style.backgroundColor = "#19609F";
    }
)
add_project.addEventListener("mouseleave", () => 
    {
        var row = document.querySelector("body .right1 .create_new_project .add_shape .row");
        row.style.backgroundColor = "#baddff";
        var column = document.querySelector("body .right1 .create_new_project .add_shape .column");
        column.style.backgroundColor = "#baddff";
    }
)

// setup for datepicker
const today = new Date().toISOString().split('T')[0];
    // Set the min attribute of the date input to today's date
document.getElementById('date').setAttribute('min', today);
// set up input max money 
function formatNumber(input) {
    // Remove any non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // If the first character is '0', remove it
    if (value.startsWith('0')) {
        value = value.substring(1);
    }

    // Format the number with periods as thousand separators
    let formattedValue = new Intl.NumberFormat('de-DE').format(value);

    // Update the input value with the formatted value
    input.value = formattedValue;
}

// Get the input element
const numberInput = document.querySelector("body .create_project_box .money .create_project");

// Add an input event listener to the input element
numberInput.addEventListener('input', () => {
    formatNumber(numberInput);
});

// Add a keypress event listener to prevent non-numeric input
numberInput.addEventListener('keypress', (e) => {
    // Allow only digits (0-9)
    if (!/^\d$/.test(e.key)) {
        e.preventDefault();
    }
});

// Prevent pasting non-numeric content
numberInput.addEventListener('paste', (e) => {
    // Get the pasted content
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    // If the pasted content is not numeric, prevent the paste
    if (!/^\d+$/.test(paste)) {
        e.preventDefault();
    }
});


// turn off create project box 

var close_project_box = document.querySelector("#close_create_project_box");
var project_box = document.querySelector("body .create_project_box");
close_project_box.addEventListener("click", () => 
    {
        project_box.style.scale = "0";
        var blur = document.querySelector("body .blur");
        blur.style.display = "none";
    }
)

// turn on create project box 
var create_first_project = document.querySelector("body .right1 .create_new_project .add_shape");
create_first_project.addEventListener("click", () => 
    {
        project_box.style.scale = "1";
        var blur = document.querySelector("body .blur");
        blur.style.display = "block";
    }
)

//asdffffffffffffffffffffffffffffffffffffffffffffffffffffffff


// function handle create project
var input_money = document.querySelector("body .create_project_box .money .create_project");
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
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_history", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "name=" + input_name.value + "&max_money=" + input_money.value.replace(/\D/g, '') + "&date=" + input_date.value + "&action=create_project"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	if (resp == "successfully"){
			var create_project_successfully = document.querySelector("#create_project_successfully");
			create_project_successfully.style.display = "block";
			window.location = "http://localhost:8080/QuanLyChiTieu/history";
		}
		else{
			
		}
		save_create_project.innerHTML = "Save";
    }
}