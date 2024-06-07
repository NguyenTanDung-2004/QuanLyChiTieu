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