/**
 * 
 */
var input_name_showall = document.querySelector("body .add_expense_box .input .info input")
   var input_money_showall = document.querySelector("body .add_expense_box .input .money input")
   var input_radio_add_showall = document.querySelector('#radio_add');
   var input_radio_subtract_showall = document.querySelector("#radio_subtract")
   var input_date_showall = document.querySelector("body .add_expense_box .input .date input");
var add_item = document.querySelector("#add_item_button");
add_item.addEventListener("click", () => 
	{
		add_item.innerHTML = "Wait...";
		submit_add_item();
	}
)
function get_data_from_radio(){
	if (input_radio_add_showall.checked){
		return "add";
	}
	else{
		return "subtract";
	}
}
// function submit add item 
function submit_add_item(){
	var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_show_all", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "parent_id=" + current_parent_id + "&name=" + input_name_showall.value + "&money=" + input_money_showall.value.replace(/\D/g, '') + "&date=" + input_date_showall.value + "&radio=" + get_data_from_radio() + "&action=add_item"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	if (resp == "successfully"){
			add_item.innerHTML = "add";
			var add_expense_success = document.querySelector("#add_expense_success");
			add_expense_success.style.display = "block";
			window.location = "http://localhost:8080/QuanLyChiTieu/show_all";
		}
		else{
			
		}
    }
}