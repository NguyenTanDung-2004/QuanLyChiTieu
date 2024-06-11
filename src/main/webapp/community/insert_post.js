document.querySelector("#iconPost").addEventListener('click', function() {
	if (document.querySelector(".createParent .contentParent").value === "" ) {
		document.querySelector("#iconPost").style.opacity = 0.5;
		document.querySelector("#iconPost").style.cursor =  "default";
	} else {
		insert_post()
	 }
});

function insert_post() {
	const contentPost = document.querySelector(".createParent .contentParent").value;
	const datePost = convertDateToMMDDYYYY(dateInput.value);
	const currentDate = new Date();
	
	const time = currentDate.toLocaleTimeString();
	
	var http = new XMLHttpRequest();
	http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_community", true);
	http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
	
	var params ="content=" + contentPost + "&date=" + datePost + "&time=" + time + "&action=insert_post"; 

	http.send(params);
	http.onload = function() {
		var resp = JSON.parse(http.responseText);
		if (resp == "successfully"){
			alert("Update post successfully")
			window.location = "http://localhost:8080/QuanLyChiTieu/community?autoClickDate=true&date=" + dateInput.value;
		} 
    };						
}