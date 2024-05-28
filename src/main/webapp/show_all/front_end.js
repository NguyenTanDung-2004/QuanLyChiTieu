var parent_item = document.querySelectorAll("body .right1 .main .main_child .parent_item");
var detail_parent_item = document.querySelectorAll("body .right1 .main .main_child .parent_item .detail_parent_item1")
var scroll = document.querySelectorAll("body .right1 .main .main_child .parent_item .detail_parent_item1 .scroll")
var add_item = document.querySelectorAll("body .right1 .main .main_child .parent_item .parent_item1 .add");
var current_parent_id = 0;
//event for add item
for (let i = 0; i < add_item.length; i++){
    add_item[i].addEventListener("click", () => 
        {
			current_parent_id = i;
            flag_click_parent_item[i] = 1;
            var name_parent = parent_item[i].classList[0];
            var title_add = document.querySelector("body .add_expense_box .title p");
            title_add.textContent = "Add Expense " + name_parent;
            var add_box = document.querySelector("body .add_expense_box");
            add_box.style.scale = "1";
            var blur = document.querySelector("body .blur1");
            blur.style.display = "block";
        }
    )
}
//event for add item


var flag_click_parent_item = [];
// create flag_click_parent_item
for (var i = 0; i < scroll.length; i++){
    flag_click_parent_item.push(0);
    detail_parent_item[i].style.height = "0px";
    detail_parent_item[i].style.minHeight = "0px";
    detail_parent_item[i].style.padding = "0";
    detail_parent_item[i].style.border = "none";
    scroll[i].style.height = "0px"
}
// create flag_click_parent_item

// event for click parent item
for (let i = 0; i < flag_click_parent_item.length; i++){
    parent_item[i].addEventListener("click", () => 
        {
            if (flag_click_parent_item[i] == 1){
                flag_click_parent_item[i] = 0;
                detail_parent_item[i].style.height = "0px";
                detail_parent_item[i].style.minHeight = "0px";
                detail_parent_item[i].style.padding = "0";
                detail_parent_item[i].style.border = "none";
                scroll[i].style.height = "0px"
            }
            else{
                flag_click_parent_item[i] = 1;
                detail_parent_item[i].style.minHeight = "320px";
                detail_parent_item[i].style.maxHeight = "320px";
                detail_parent_item[i].style.padding = "10px 10px";
                detail_parent_item[i].style.border = "1px solid black";
                detail_parent_item[i].style.borderTop = "none";
                scroll[i].style.maxHeight = "300px"
                scroll[i].style.height = "300px"
            }
        }
    )
}
function event_for_parent_item(index){
    if (flag_click_parent_item[index] == 1){
        flag_click_parent_item[index] = 0;
        detail_parent_item[index].style.height = "0px";
        detail_parent_item[index].style.minHeight = "0px";
        detail_parent_item[index].style.padding = "0";
        detail_parent_item[index].style.border = "none";
        scroll[index].style.height = "0px"
    }
    else{
        flag_click_parent_item[index] = 1;
        detail_parent_item[index].style.minHeight = "320px";
        detail_parent_item[index].style.maxHeight = "320px";
        detail_parent_item[index].style.padding = "10px 10px";
        detail_parent_item[index].style.border = "1px solid black";
        detail_parent_item[index].style.borderTop = "none";
        scroll[index].style.maxHeight = "300px"
        scroll[index].style.height = "300px"
    }
}

// set up input max money 
function formatNumber(input) {
    // Remove any non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // If the first character is '0', remove it
    if (value.startsWith('0')) {
        value = value.substring(1);
    }

    // Format the number with periods as thousand separators
    let formattedValue = new Intl.NumberFormat('de-DE').format(value);

    // Update the input value with the formatted value
    input.value = formattedValue;
}

    // Get the input element
const numberInput = document.querySelector("body .add_expense_box .input .money input");

    // Add an input event listener to the input element
numberInput.addEventListener('input', () => {
    formatNumber(numberInput);
});

    // Add a keypress event listener to prevent non-numeric input
numberInput.addEventListener('keypress', (e) => {
    // Allow only digits (0-9)
    if (!/^\d$/.test(e.key)) {
        e.preventDefault();
    }
});

    // Prevent pasting non-numeric content
numberInput.addEventListener('paste', (e) => {
    // Get the pasted content
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    // If the pasted content is not numeric, prevent the paste
    if (!/^\d+$/.test(paste)) {
        e.preventDefault();
    }
});
// set up input max money 

// close add 
    var close_add = document.querySelector("#close_add");
    close_add.addEventListener("click", () => 
        {
            var add_box = document.querySelector("body .add_expense_box");
            add_box.style.scale = "0";
            var blur = document.querySelector("body .blur1");
            blur.style.display = "none";
            document.querySelector("body .add_expense_box .input .info input").value = "";
            document.querySelector("body .add_expense_box .input .money input").value = "";
          	document.querySelector('#radio_add').checked = false;
  			document.querySelector("#radio_subtract").checked = false;
			document.querySelector("body .add_expense_box .input .date input").value = "";
			var add_expense_success = document.querySelector("#add_expense_success");
			add_expense_success.style.display = "none";
        }
    )
// close add 


//set up for front end for button add 
function checkSomethingRepeatedly() {
    // Define the function to be repeated
    function checkSomething() {
       var name = document.querySelector("body .add_expense_box .input .info input").value
       var money = document.querySelector("body .add_expense_box .input .money input").value
       var radio_add = document.querySelector('#radio_add');
       var radio_subtract = document.querySelector("#radio_subtract")
       var date_input = document.querySelector("body .add_expense_box .input .date input");
       if (name != "" && money != "" && (radio_add.checked || radio_subtract.checked) && date_input.value != ""){
            document.querySelector("body .add_expense_box button").style.opacity = "1";
		   var on_button = document.querySelector("body .add_expense_box .on_button");
		   on_button.style.display = "none";
	   }
	   else{
        document.querySelector("body .add_expense_box button").style.opacity = "0.5";
		   var on_button = document.querySelector("body .add_expense_box .on_button");
		   on_button.style.display = "block";
	   }
	   
    }

    // Call the function immediately
    checkSomething();

    // Set interval to repeat the function every second (1000 milliseconds)
    var intervalId = setInterval(checkSomething, 10);

    // Optionally, you can return the intervalId if you want to clear the interval later
    return intervalId;
}
checkSomethingRepeatedly();
//set up for front end for button add


var datePicker_update = document.querySelectorAll("#date");
datePicker_update[0].setAttribute('min', date_from_end[1]); // Minimum selectable date
datePicker_update[0].setAttribute('max', date_from_end[0]); // Maximum selectable date 
datePicker_update[1].setAttribute('min', date_from_end[1]); // Minimum selectable date
datePicker_update[1].setAttribute('max', date_from_end[0]); // Maximum selectable date 






