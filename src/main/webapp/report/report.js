
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
if (project_id !== null) {
  appear_report_sidebar();
}
else{
	
}





