/**
 * 
 */
var item_and_parent_item = [];
function create_1_item_for_1_parent_item(scroll, info_value, money_value, date_value){
	// create 
	// Create the line div
    const lineDiv = document.createElement('div');
    lineDiv.className = 'line';

    // Create the detail item container
    const detailItem = document.createElement('div');
    detailItem.className = 'detail_item';

    // Create the left3 container
    const leftContainer = document.createElement('div');
    leftContainer.className = 'left3';

    // Create and append info paragraph
    const infoParagraph = document.createElement('p');
    infoParagraph.className = 'info_item';
    infoParagraph.textContent = info_value;
    leftContainer.appendChild(infoParagraph);

    // Create and append price paragraph
    const priceParagraph = document.createElement('p');
    priceParagraph.className = "money_of_item";
    priceParagraph.textContent = money_value + " VND";
    leftContainer.appendChild(priceParagraph);

    // Create the right3 container
    const rightContainer = document.createElement('div');
    rightContainer.className = 'right3';

    // Create and append date paragraph
    const dateParagraph = document.createElement('p');
    dateParagraph.className = "date_of_item";
    dateParagraph.textContent = date_value;
    rightContainer.appendChild(dateParagraph);

    // Create and append icon
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-gear set_up_item';
    rightContainer.appendChild(icon);

    // Append left and right containers to the detail item
    detailItem.appendChild(leftContainer);
    detailItem.appendChild(rightContainer);
    
    scroll.appendChild(lineDiv);
    scroll.appendChild(detailItem);
}
function crreate_all_item_for_1_parent_item(scroll, index){
	for (var i = 0; i < all_data[index].length; i++){
		if (all_data[index][i][3] == "subtract"){
			all_data[index][i][1] = all_data[index][i][1] * (-1);
		}
		var money = all_data[index][i][1] + "";
		let formattedValue = new Intl.NumberFormat('de-DE').format(money);
		create_1_item_for_1_parent_item(scroll, all_data[index][i][0], formattedValue, all_data[index][i][2])
		item_and_parent_item.push(index);
	}
}
var all_scroll = document.querySelectorAll("body .right1 .main .main_child .parent_item .detail_parent_item1 .scroll");
for (var i = 0; i < all_scroll.length; i++){
	all_scroll[i].innerHTML = "";
	crreate_all_item_for_1_parent_item(all_scroll[i], i);
}

// setup_scroll
for (let i = 0; i < all_scroll.length; i++){
	all_scroll[i].addEventListener("click", () => 
		{
			flag_click_parent_item[i] = 0;
		}
	)
}

// create id item 
var id_array = [];
for (var i = 0; i < 12; i++){
	for (var j = 0; j < all_data[i].length; j++){
		id_array.push(all_data[i][j][4]);
	}
}