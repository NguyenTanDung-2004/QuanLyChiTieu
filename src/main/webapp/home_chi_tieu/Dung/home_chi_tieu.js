function get_index_of_date(){
		let currentDate = new Date();
	let dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
	
	// Map the getDay() output to the desired values
	let dayMapping = {
	    0: 6, // Sunday should return 6
	    1: 0, // Monday should return 0
	    2: 1, // Tuesday should return 1
	    3: 2, // Wednesday should return 2
	    4: 3, // Thursday should return 3
	    5: 4, // Friday should return 4
	    6: 5  // Saturday should return 5
	};
	
	let mappedDay = dayMapping[dayOfWeek];
	return mappedDay;
}



// annimation cho các tags.

var array_tag = document.querySelectorAll("body .left1 .tags .tag .tag1");
function annimation_for_1_tag(tag){
    tag.style.backgroundColor = "";
    
}

// annimation khi hover vào các cột.
const columns = document.querySelectorAll('body .right1 .main .left .chart .row_column .day div');
const tooltip = document.querySelector("#detail_column");

for (let i = 0; i < columns.length; i++){
	columns[i].addEventListener('mouseover', function(event) {
        const rect = this.getBoundingClientRect(); // Lấy kích thước và vị trí của phần tử
        const x = rect.right + window.scrollX + 10; // Lấy vị trí của border bên phải cộng thêm 10px
        const y = rect.top + window.scrollY; // Lấy vị trí của cột
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.display = "block";
        var date_column = document.querySelector("#date_column");
        var money_column = document.querySelector("#money_column");
        date_column.innerHTML = "Date: " + week[i];
        let formatMoney = new Intl.NumberFormat('de-DE').format(money_in_week[i]);
        money_column.innerHTML = "Money: " + formatMoney + " VND";
    });

    columns[i].addEventListener('mouseout', function() {
        tooltip.style.display = "none";
    });
}

// annimation chuyen hinh anh.
var img_array = [
    "../QuanLyChiTieu/img/image_event/cash-exp.webp",
    "../QuanLyChiTieu/img/image_event/Best-Expense-Tracker-App-That-You-Must-Use-1.jpg",
    "../QuanLyChiTieu/img/image_event/20191225043221-00000735-expensemanager-cropped.png",
    "../QuanLyChiTieu/img/image_event/Ways-to-Manage-Your-Business-Expenses-Better-2.jpg",
    "../QuanLyChiTieu/img/image_event/Why-Expense-Management-Software-is-a-good-automation-tool.jpg"
];
var link_array = [
		"https://www.investopedia.com/terms/p/personalfinance.asp",
		"https://www.thebalancemoney.com/ways-to-be-better-with-money-960664",
		"https://www.bing.com/search?q=5+Ways+to+Manage+Your+Personal+Finances&cvid=110f891495984b73b8e1e437263b35b6&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQ6QcY_FXSAQczODNqMGo5qAIIsAIB&FORM=ANAB01&adppc=EDGEESS&PC=LCTS",
		"https://www.investopedia.com/terms/p/personal-spending-plan.asp",
		"https://suitsmecard.com/blog/9-essential-rules-of-personal-finance-that-you-should-follow#:~:text=9%20Essential%20Rules%20of%20Personal%20Finance%20That%20You,Work%20on%20Fixing%20Your%20Credit%20Score%20More%20items"
	];
    //lấy ra event-img
var event_img = document.querySelector("#event-img");
var index_to_change_image = 0;
event_img.addEventListener("click", () => 
	{
		window.location = link_array[index_to_change_image];
	}
)
document.addEventListener("DOMContentLoaded", function () {
    function applyAnimation(index) {
        setTimeout(function () {
            if (index < img_array.length - 1) {
                event_img.style.backgroundImage = "url(" + img_array[index + 1] + ")";
                event_img.style.backgroundSize = "cover";
                applyAnimation(index + 1);
            } else {
            // If it's the last element, restart the animation loop
                event_img.style.backgroundImage = "url(" + img_array[0] + ")";
                event_img.style.backgroundSize = "cover";
                setTimeout(function () {
                    applyAnimation(0);
                }
                , 0); // Delay before restarting the animation
            }
            index_to_change_image = index
        }, 4000); // Duration of animation in milliseconds (same as animation-duration)
    }

    applyAnimation(0); // Start the animation with the first element
});

// responsive
var chieuRongManHinh = window.innerWidth - 200;
var chieuCao = window.innerHeight;
var right =  document.querySelector("body .right1")
right.style.minWidth = chieuRongManHinh + "px";
right.style.minHeight = chieuCao + 'px';   
var left = document.querySelector("body .left1");
left.style.minHeight = chieuCao;


// hover add project in home 
var add_project = document.querySelector("body .right1 .create_first_project .add_shape");
add_project.addEventListener("mouseenter", () => 
    {
        var row = document.querySelector("body .right1 .create_first_project .add_shape .row");
        row.style.backgroundColor = "#19609F";
        var column = document.querySelector("body .right1 .create_first_project .add_shape .column");
        column.style.backgroundColor = "#19609F";
    }
)
add_project.addEventListener("mouseleave", () => 
    {
        var row = document.querySelector("body .right1 .create_first_project .add_shape .row");
        row.style.backgroundColor = "#baddff";
        var column = document.querySelector("body .right1 .create_first_project .add_shape .column");
        column.style.backgroundColor = "#baddff";
    }
)

// setup for datepicker
const today = new Date().toISOString().split('T')[0];
    // Set the min attribute of the date input to today's date
document.getElementById('date').setAttribute('min', today);
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
const numberInput = document.querySelector("body .create_project_box .money input");

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


// turn off create project box 

var close_project_box = document.querySelector("#close_create_project_box");
var project_box = document.querySelector("body .create_project_box");
close_project_box.addEventListener("click", () => 
    {
        project_box.style.scale = "0";
        var blur = document.querySelector("body .blur");
        blur.style.display = "none";
    }
)

// turn on create project box 
var create_first_project = document.querySelector("body .right1 .create_first_project");
create_first_project.addEventListener("click", () => 
    {
        project_box.style.scale = "1";
        var blur = document.querySelector("body .blur");
        blur.style.display = "block";
    }
)




