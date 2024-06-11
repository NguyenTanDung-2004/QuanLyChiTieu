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


var calendar_tag = document.querySelector("body .left1 .tags .tag .report");
		calendar_tag.style.backgroundColor = "#F8F9F9";
		var calendar_point = document.querySelector("body .left1 .tags .tag .report .point");
		calendar_point.style.display = "block";