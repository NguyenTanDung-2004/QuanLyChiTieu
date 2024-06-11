var all_tab = document.querySelectorAll("body .left1 .tags .tag .tag1");
for (let i = 0; i < all_tab.length; i++){
	all_tab[i].addEventListener("click", () => 
		{
			if (i == 0){
				window.location = "http://localhost:8080/QuanLyChiTieu/home_chi_tieu"
			}
			else if (i == 1){
				window.location = "http://localhost:8080/QuanLyChiTieu/calendar"
			}
			else if (i == 2)[
				window.location = "http://localhost:8080/QuanLyChiTieu/community"
			]
			else if (i == 3){
				window.location = "http://localhost:8080/QuanLyChiTieu/history"
			}
		}
	)
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