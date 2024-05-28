var max_money = max_and_current_money[1];
var current_money = max_and_current_money[0];


var energy = document.querySelector("#energy");
var current_energy = document.querySelector("#current_energy");
function set_up_for_energy(){
	if (current_money > max_money){
		current_energy.style.width = "100%";
		current_energy.style.backgroundColor = "red";
	}
	else if (current_money < 0){
		current_energy.style.width = "0%";
	}
	else{
		var ratio = current_money / max_money;
		var fixed_ratio = ratio.toFixed(2);
		var real_ratio = fixed_ratio * 100;
		if (real_ratio >= 80){
			current_energy.style.width = real_ratio + "%";
			current_energy.style.backgroundColor = "red";
		}
		else{
			current_energy.style.width = real_ratio + "%";
			current_energy.style.backgroundColor = "#353E55";	
		}
	}
}
set_up_for_energy();