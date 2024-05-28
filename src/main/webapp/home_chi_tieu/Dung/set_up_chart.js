console.log(week);
console.log(money_in_week);

var max_money = 0;
for (var i = 0; i < money_in_week.length; i++){
	if (money_in_week[i] > max_money){
		max_money = money_in_week[i];
	}
}


var all_chart = document.querySelectorAll("body .right1 .main .left .chart .row_column .day div");

if (max_money == 0){
	for (var i = 0; i < all_chart.length; i++){
		all_chart[i].style.height = "5%";
	}
}
else{
	for (var i = 0; i < all_chart.length; i++){
		all_chart[i].style.height = ((money_in_week[i] / max_money) * 100) + "%";
	}
}
all_chart[get_index_of_date()].style.backgroundColor = "#19609F";