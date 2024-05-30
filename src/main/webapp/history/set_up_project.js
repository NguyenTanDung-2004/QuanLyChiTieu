var title_setup_project = document.querySelector("body .create_project_box .title_setup_project");
var input_name_project = document.querySelector("#input_name_setup")
var input_end_date = document.querySelectorAll("#date")[1];
var input_money_setup = document.querySelector("#input_money_setup");
var set_up_project = document.querySelectorAll("body .create_project_box")[1];
var current_setup_project_id = 0;
function create_1_project(project_name, from, to, money, index){
	// Create the main div element with class 'project main_child'
	const projectDiv = document.createElement('div');
	projectDiv.className = 'project main_child';
	// Create the p element for the project name and set its id and content
	const projectName = document.createElement('p');
	projectName.id = 'name_project_history';
	projectName.textContent = project_name;
	// Append the project name to the main div
	projectDiv.appendChild(projectName);
	// Create the div element for the date and money container
	const dateMoneyDiv = document.createElement('div');
	dateMoneyDiv.className = 'date_money';
	// Function to create a 'contain' div with a point and text
	const createContainDiv = (text) => {
	    const containDiv = document.createElement('div');
	    containDiv.className = 'contain';
	    const pointDiv = document.createElement('div');
	    pointDiv.className = 'point';
	    const pElement = document.createElement('p');
	    pElement.textContent = text;
	    containDiv.appendChild(pointDiv);
	    containDiv.appendChild(pElement);
	    return containDiv;
	};
	// Create and append the contain divs to the date_money div
	dateMoneyDiv.appendChild(createContainDiv('From: ' + from));
	dateMoneyDiv.appendChild(createContainDiv('To: ' + to));
	dateMoneyDiv.appendChild(createContainDiv('Max: ' + money + "VND"));
	// Append the date_money div to the main div
	projectDiv.appendChild(dateMoneyDiv);
	document.querySelector("body .right1 .main .main_1").appendChild(projectDiv);
	projectDiv.addEventListener("click", () => 
		{
			var set_up_project = document.querySelectorAll("body .create_project_box")[1];
			set_up_project.style.scale = '1';
			var blur = document.querySelector("body .blur");
			blur.style.display = "block";
			input_name_project.value = project_name;
			input_end_date.value = to;
			input_money_setup.value = money;
			input_end_date.min = from;
			current_setup_project_id = all_project_of_user[index][4];	
		}
	)
}

for (var i = 0; i < all_project_of_user.length; i++){
	let formattedValue = new Intl.NumberFormat('de-DE').format(all_project_of_user[i][1]);
	create_1_project(all_project_of_user[i][0], all_project_of_user[i][2], all_project_of_user[i][3], formattedValue, i);
}


// set up input max money 
function formatNumber1(input) {
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
const numberInput1 = document.querySelector("#input_money_setup");

// Add an input event listener to the input element
numberInput1.addEventListener('input', () => {
    formatNumber1(numberInput1);
});

// Add a keypress event listener to prevent non-numeric input
numberInput1.addEventListener('keypress', (e) => {
    // Allow only digits (0-9)
    if (!/^\d$/.test(e.key)) {
        e.preventDefault();
    }
});

// Prevent pasting non-numeric content
numberInput1.addEventListener('paste', (e) => {
    // Get the pasted content
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    // If the pasted content is not numeric, prevent the paste
    if (!/^\d+$/.test(paste)) {
        e.preventDefault();
    }
});

