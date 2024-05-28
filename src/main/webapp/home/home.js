// dữ liệu ban đầu, mảng title, mảng content.
    var title_array = [
            "What is personal financial management?",
            "Money Management Tips", 
            "5 Ways to Manage Your Personal Finances", 
            "Personal Spending Plan: What it Means, How it Works",
            "9 Essential Rules of Personal Finance That You Should Follow"
        ];
    var content_array = [
        "While the moniker “personal financial management” is often used to refer to ways of managing your personal finances, it is also an actual term often known by its acronym, PFM, and refers to the type of software used for personal finance apps.",
            "Most people talk about earning more money, however, not many people talk about how to effectively manage it. While creating wealth is essential, it is equally important to protect your funds and use them prudently",
            "Money can evoke a range of difficult emotions for many of us. This anxiety only grows when we’re living through economically fragile times or don’t come from wealth.",
            "A spending plan is an informal document used to determine the cash flow of an individual or household. A personal spending plan, similar to one's budget, helps outline where income is earned and where expenses are incurred.",         
            "Managing, budgeting and saving money is certainly no easy task – discover the essential rules of personal finance that will make your life easier and your money last longer"
        ];
    var link_array = [
		"https://www.investopedia.com/terms/p/personalfinance.asp",
		"https://www.thebalancemoney.com/ways-to-be-better-with-money-960664",
		"https://www.bing.com/search?q=5+Ways+to+Manage+Your+Personal+Finances&cvid=110f891495984b73b8e1e437263b35b6&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQ6QcY_FXSAQczODNqMGo5qAIIsAIB&FORM=ANAB01&adppc=EDGEESS&PC=LCTS",
		"https://www.investopedia.com/terms/p/personal-spending-plan.asp",
		"https://suitsmecard.com/blog/9-essential-rules-of-personal-finance-that-you-should-follow#:~:text=9%20Essential%20Rules%20of%20Personal%20Finance%20That%20You,Work%20on%20Fixing%20Your%20Credit%20Score%20More%20items"
	];

// xử lí sự kiện see all
    var button_see_all = document.querySelector("#see-all");
    button_see_all.addEventListener("click", () => 
        {
            window.location="https://www.investopedia.com/personal-financial-management-pfm-5181311";
        }
    )
// xử lí chuyển sự kiện.
    var dot_array = document.querySelectorAll("body .footer .dot .dot_child");
    event_for_1_dot(dot_array[0]); // thêm vào ngay từ đầu.
    function event_for_1_dot(element){
        element.style.backgroundColor = "#baddff";
    }
    function delete_style_dot(){
        for (i = 0; i < dot_array.length; i++){
            dot_array[i].style.backgroundColor = "white";
        }
    }
    var move_left = document.querySelector("#move_left");
    var move_right = document.querySelector("#move_right");
    var move_count = 0;
    move_right.addEventListener("click", () =>
        {
            move_count++;
            if (move_count <= 4){
                delete_style_dot();
                event_for_1_dot(dot_array[move_count]);
                change_text(move_count, -1);
            }
            else{
                delete_style_dot();
                move_count = 0;
                event_for_1_dot(dot_array[move_count]);
                change_text(move_count, -1);
            }
        }
    )
    move_left.addEventListener("click", () =>
        {
            move_count--;
            if (move_count >= 0){
                delete_style_dot();
                event_for_1_dot(dot_array[move_count]);
                change_text(move_count, 1)
            }
            else{
                delete_style_dot();
                move_count = 4;
                event_for_1_dot(dot_array[move_count]);
                current = -300;
                change_text(move_count, 1)
            }
        }
    )
    var current = 0;
    function change_text(count, flag){
        var main = document.querySelector("body .main")
        if (flag == -1){
            var x = 200 - count * 100;
            current = x;
            console.log(x);
            main.style.transform = "translateX(" + x + "vw)";
        }
        else{
            var x = current + 100;
            current = current + 100;
            main.style.transform = "translateX(" + x + "vw)";
        }
    }
    
    // button home 
 	var button_home = document.querySelector("#button_login");
 	button_home.addEventListener("click", () => 
 		{
			window.location = "http://localhost:8080/QuanLyChiTieu/login";	 
		}
 	)
 	// see_all
 	var button_see_all = document.querySelector("#see-all");
 	button_see_all.addEventListener("click", () => 
 		{
			 window.location = link_array[move_count];
		 }
 	)
    
    
    
