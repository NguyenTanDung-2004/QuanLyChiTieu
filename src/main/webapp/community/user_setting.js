// chọn avatar
const avatarImg = document.querySelector('.modal .avatar-img');

avatarImg.addEventListener('click', function() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.addEventListener('change', function() {
    const file = input.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.addEventListener('load', function() {
        const imageDataUrl = reader.result;
        const img = document.querySelector('.avatar-img img');
        const img1 = document.querySelector('.avatar img');
        img.src = imageDataUrl;
        img1.src = imageDataUrl;
      });

      reader.readAsDataURL(file);
    }
  });

  input.click();
});add_expense



const closeBtn = document.querySelector('.btn-close');

closeBtn.addEventListener('click', function() {
  document.querySelector(".user-setting").classList.remove("openFlex");
});

// click user setting
const userNav = document.querySelector("body .right1 .top .right .avatar") 

userNav.addEventListener('click', function() {
  document.querySelector(".user-setting").classList.add('openFlex')
})


// xử lý save info
var saveInfoBtns = document.getElementById("save-info");

var name1 = document.querySelector(".username #name").value;
var image = document.querySelector(".user-setting .avatar-img img").src;

// kiểm tra sự thay đổi 
setInterval(checkFieldChanges, 10);

function checkFieldChanges() {
	var currentName = document.querySelector(".username #name").value;
	var currentImage = document.querySelector(".user-setting .avatar-img img").src;
	
	if (currentName == "" || currentImage == "") {
		saveInfoBtns.classList.remove("active");
		return;
	}

	
	if (currentName !== name1 || currentImage !== image) {
		saveInfoBtns.classList.add("active");
	} else {
		saveInfoBtns.classList.remove("active");
	}
}

// function to save info 
function save_info() {
  var name1 = document.querySelector(".username #name").value;
  var image = document.querySelector(".user-setting .avatar-img img").src;

  var http = new XMLHttpRequest();
  http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_calendar_receive_request", true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var params = "name=" + name1 + "&img=" + encodeURIComponent(image) + "&action=update_info";

  http.send(params);
  http.onload = function() {
    var resp = JSON.parse(http.responseText);

    if (resp === "update_info_success") {
      alert("Update successfull !")
    } else {
      alert("Update failed !")
    }
  };
}

saveInfoBtns.addEventListener('click', function() {
	if (saveInfoBtns.classList.contains("active"))
		save_info();
})