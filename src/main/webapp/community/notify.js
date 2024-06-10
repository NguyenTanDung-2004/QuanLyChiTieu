
// click notify
const notify = document.querySelector('.notify');
const notifyBadge = notify.querySelector('.notify-badge');

notify.addEventListener('click', function() {
  notify.querySelector('.notify-container').classList.add('openFlex');
  notifyBadge.style.display = 'none';
   update_status_notify();
});

notify.addEventListener('mouseleave', function() {
  notify.querySelector('.notify-container').classList.add('openFlex');
  location.reload();
  notifyBadge.style.display = 'flex';
});

function update_status_notify() {
	var http = new XMLHttpRequest();
	http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_calendar_receive_request", true);
	http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
	var params = "action=update_status_notify"; 
	http.send(params);
	http.onload = function() {
		var resp = JSON.parse(http.responseText);
		if (resp == "update_success"){
			//
		} 
	};
}