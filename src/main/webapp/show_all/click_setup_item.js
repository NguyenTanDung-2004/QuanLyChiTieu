var setup_item_icon = document.querySelectorAll(".set_up_item");
var info_item = document.querySelectorAll(".info_item");
var money_item = document.querySelectorAll(".money_of_item");
var date_item = document.querySelectorAll(".date_of_item");
var radio_item = create_radio_item();
console.log(radio_item);
var box_update = document.querySelector("#box_update");
var close_box_update = document.querySelector("#close_update_box");
var name_reset = document.querySelector("#name_reset");
var money_reset = document.querySelector("#money_reset");
var date_reset = document.querySelector("#box_update #date");
var radio_add_reset = document.querySelector("#radio_add_reset");
var radio_subtract_reset = document.querySelector("#radio_subtract_reset");
var current_id_item = 0;
var delete_item_button = document.querySelector("#delete_button");
var confirm_button = document.querySelector("#confirm");
var cancel = document.querySelector("#cancle");
close_box_update.addEventListener("click", () => 
	{
		box_update.style.scale = "0";
		var blur = document.querySelector("body .blur1");
		blur.style.display = "none";
	}
)
for (let i = 0; i < setup_item_icon.length; i++){
	setup_item_icon[i].addEventListener("click", () => 
		{
			box_update.style.scale = "1";
			var blur = document.querySelector("body .blur1");
			blur.style.display = "block";
			var money = money_item[i].textContent;
			if (money[0] == '-'){
				money = money.replace('-', "");
			}
			set_up_data(info_item[i].textContent, money.replace(' VND', ''), date_item[i].textContent, radio_item[i]);
			current_id_item = id_array[i];
		}
	)
}
function create_radio_item(){
	var array = [];
	for (var i = 0; i < money_item.length; i++){
		if (money_item[i].innerHTML[0] == "-"){
			array.push("subtract");
		}
		else{
			array.push("add");
		}
	}
	return array;
}
function set_up_data(name, money, date, radio){
	name_reset.value = name;
	money_reset.value = money;
	date_reset.value = date;
	if (radio == "add"){
		radio_add_reset.checked = true;
	}
	else{
		radio_subtract_reset.checked = true;
	}
}
function changeDateFormat(dateString) {
  // Split the input date string
  return dateString.replace('-', '/').replace('-', '/');;
}


// setup input money
function formatNumber3(input) {
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
const numberInput3 = document.querySelector("#money_reset");

    // Add an input event listener to the input element
numberInput3.addEventListener('input', () => {
    formatNumber3(numberInput3);
});

    // Add a keypress event listener to prevent non-numeric input
numberInput3.addEventListener('keypress', (e) => {
    // Allow only digits (0-9)
    if (!/^\d$/.test(e.key)) {
        e.preventDefault();
    }
});

    // Prevent pasting non-numeric content
numberInput3.addEventListener('paste', (e) => {
    // Get the pasted content
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    // If the pasted content is not numeric, prevent the paste
    if (!/^\d+$/.test(paste)) {
        e.preventDefault();
    }
});

function checkSomethingRepeatedly3() {
    // Define the function to be repeated
    function checkSomething() {
       if (name_reset.value != "" && money_reset.value != "" && (radio_add_reset.checked || radio_subtract_reset.checked) && date_reset.value != ""){
            document.querySelector("#reset_item_button").style.opacity = "1";
		   var on_button = document.querySelector("#on_button_update");
		   on_button.style.display = "none";
	   }
	   else{
        	document.querySelector("#reset_item_button").style.opacity = "0.5";
		   var on_button = document.querySelector("#on_button_update");
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
checkSomethingRepeatedly3();
//set up for front end for button add 


 console.log(item_and_parent_item);
// event for reset button
var reset_button = document.querySelector("#reset_item_button");
reset_button.addEventListener("click", () => 
	{
		reset_button.innerHTML = "wait...";
		console.log(name_reset.value + " " + money_reset.value.replace(/\D/g, '') + " " + date_reset.value + " " + get_data_from_radio1() + " " + current_id_item + " " + item_and_parent_item[get_index(current_id_item)]);
		submit_reset_item();
	}
)

//get data of radio
function get_data_from_radio1(){
	if (radio_add_reset.checked){
		return "add";
	}
	else{
		return "subtract";
	}
}
// submit reset event
function submit_reset_item(){
	var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_show_all", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "parent_id=" + item_and_parent_item[get_index(current_id_item)] + "&item_id=" + current_id_item + "&name=" + name_reset.value + "&money=" + money_reset.value.replace(/\D/g, '') + "&date=" + date_reset.value + "&radio=" + get_data_from_radio1() + "&action=reset_item"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	if (resp == "successfully"){
			var reset_success = document.querySelector("#reset_success");
			reset_success.style.display = "block";
			reset_button.innerHTML = "Reset";
			setTimeout(function() {
			    window.location = "http://localhost:8080/QuanLyChiTieu/show_all";
			}, 1000);  // 1000 milliseconds = 1 second
		}
		else{
			
		}
    }
}

function get_index(x){
	for (var i = 0; i < id_array.length; i++){
		if (id_array[i] == x){
			return i;
		}
	}
}
//
delete_item_button.addEventListener("click", () => 
	{
		var confirm_delete = document.querySelector("body .confirm_delete");
		confirm_delete.style.scale = "1";
	}
)
cancel.addEventListener("click", () => 
	{
		var confirm_delete = document.querySelector("body .confirm_delete");
		confirm_delete.style.scale = "0";
	}
)
confirm_button.addEventListener("click", () => 
	{
		confirm_button.innerHTML = "wait...";
		submit_confirm_delete();
	}
)
function submit_confirm_delete(){
	var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_show_all", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "parent_id=" + item_and_parent_item[get_index(current_id_item)] + "&item_id=" + current_id_item + "&action=delete_item"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	if (resp == "successfully"){
			confirm_button.innerHTML = "Confirm";
			setTimeout(function() {
			    window.location = "http://localhost:8080/QuanLyChiTieu/show_all";
			}, 1000);  // 1000 milliseconds = 1 second
		}
		else{
			
		}
    }
}

