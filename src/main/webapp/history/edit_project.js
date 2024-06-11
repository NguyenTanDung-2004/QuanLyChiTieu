var all_project = document.querySelectorAll("body .main .main_1 .main_child");
for (var i = 0; i < all_project.length; i++){
	all_project[i].addEventListener("click", () => 
		{
			var create_project_box1 = document.querySelectorAll("body .create_project_box");
			create_project_box1[1].style.scale = "1";
			var blur = document.querySelector("body .blur");
			blur.style.display = "block";
		}
	)
}
var all_close_project = document.querySelectorAll("#close_create_project_box");
all_close_project[1].addEventListener("click", () => 
	{
		var create_project_box1 = document.querySelectorAll("body .create_project_box");
		create_project_box1[1].style.scale = "0";
		var blur = document.querySelector("body .blur");
			blur.style.display = "none";
	}
)
// input
var input_name_project_edit = document.querySelector("#input_name_setup")
var input_end_date_edit = document.querySelectorAll("#date")[1];
var input_money_setup_edit = document.querySelector("#input_money_setup");
//button

var save_edit = document.querySelector("#save_edit");
var choose_edit = document.querySelector("#choose_edit");
var delete_edit = document.querySelector("#delete");
save_edit.addEventListener("click", () => 
	{
		save_edit.innerHTML = "saving...";
		submit_update_project();
	}
)
delete_edit.addEventListener("click", () => 
	{
		delete_edit.innerHTML = "deleting...";
		submit_delete_project();
	}
)
choose_edit.addEventListener("click", () => 
	{
		choose_edit.innerHTML = "waiting...";
		submit_choose_project();		
	}
)




// submit save project.
function submit_update_project(){
	var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_history", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "project_id=" + current_setup_project_id + "&name=" + input_name_project_edit.value + "&money=" + input_money_setup_edit.value.replace(/\D/g, '') + "&date=" + input_end_date_edit.value + "&action=update_project"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	if (resp == "successfully"){
			window.location = "http://localhost:8080/QuanLyChiTieu/history";
		}
		else{
			
		}
		save_edit.innerHTML = "Save";
    }
}

// submit delete project.
function submit_delete_project(){
	var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_history", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "project_id=" + current_setup_project_id + "&action=delete_project"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	if (resp == "successfully"){
			window.location = "http://localhost:8080/QuanLyChiTieu/history";
		}
		else{
			
		}
		delete_edit.innerHTML = "delete";
    }
}

// submit choose project.
function submit_choose_project(){
	var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_history", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "project_id=" + current_setup_project_id + "&action=choose_project"; // probably use document.getElementById(...).value
    http.send(params);
    //http.send(param1);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	if (resp == "successfully"){
			window.location = "http://localhost:8080/QuanLyChiTieu/home_chi_tieu";
		}
		else{
			window.location = "http://localhost:8080/QuanLyChiTieu/home_chi_tieu";
		}
		choose_edit.innerHTML = "Choose";
		sessionStorage.setItem("project_id",current_setup_project_id);
    }
}

//QUỲNH ANH
//Report appears
function appear_report_sidebar(){
	//create report tag
	const reportElement = document.createElement('div');
	reportElement.classList.add('Report', 'tag1');
	reportElement.id = 'reportTag';
	const chartIcon = document.createElement('i');
	chartIcon.classList.add('fa-solid', 'fa-chart-pie');
	const reportText = document.createElement('p');
	reportText.textContent = 'Report';
	const point = document.createElement('div');
	point.classList.add('point');
	reportElement.appendChild(chartIcon);
	reportElement.appendChild(reportText);
	reportElement.appendChild(point);
	const tag = document.querySelector("body .left1 .tags .tag"); 
	tag.appendChild(reportElement);
}

const project_id = sessionStorage.getItem('project_id');
appear_report_sidebar();
//Get Detail Project (projectID, nameProject, moneyProject, dateProject)
function report_click(){
var http = new XMLHttpRequest();
http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_report", true);
http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
var params = "project_id=" + project_id + "&action=get_data_project"; 
http.send(params);
http.onload = function() {
    	var resp = JSON.parse(http.responseText);
    	console.log(resp);
    	if (resp == "successfully"){
			window.location = "http://localhost:8080/QuanLyChiTieu/report";
		}
		else{
			
		}
}
}
let report = document.getElementById('reportTag');
report.addEventListener("click", () => 
	{
		report_click();
	}
)
