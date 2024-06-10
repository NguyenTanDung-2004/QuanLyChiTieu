var logout = document.querySelector(".log_out");
logout.addEventListener("click", () => 
	{
		submit_logout();
	}
)
function submit_logout() {
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_community", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    var params = "action=logout"; 
    http.send(params);
    http.onload = function() {
    	var resp = JSON.parse(http.responseText);
        // Sử dụng dữ liệu từ mảng
       	if (resp == "logout_successfully"){
			   window.location = "http://localhost:8080/QuanLyChiTieu/login";
		   }
			  		    
    }
}