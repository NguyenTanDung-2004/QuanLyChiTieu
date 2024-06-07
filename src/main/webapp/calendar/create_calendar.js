const calendarGrid = document.querySelector('.calendar-grid');
const monthYearEl = document.querySelector('.month-year');
const moneyActivityEl = document.querySelector('.activities .money');

const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth(); // 0 là tháng 1

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// hàm tạo lịch
function generateCalendar(year, month) {
    calendarGrid.innerHTML = ''; // Xóa lịch cũ

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0); // Lấy ngày cuối cùng của tháng

    const numDays = lastDayOfMonth.getDate(); // Số ngày trong tháng
    const startingDay = firstDayOfMonth.getDay(); // Thứ trong tuần của ngày đầu tiên

    let dayCount = 1;
    let selectedDate = today;
    updateSelectedDate(selectedDate);

    for (let i = 0; i < 6; i++) { // Tạo 6 hàng cho tuần
        for (let j = 0; j < 7; j++) { // Tạo 7 cột cho
            const dayIndex = i * 7 + j - startingDay;
            const dayEl = document.createElement('div');
            dayEl.classList.add('day');

            const dayNumberEl = document.createElement('span');
            dayNumberEl.classList.add('day-number');

            if (dayIndex >= 0 && dayIndex < numDays) {
                const dayNumber = dayIndex + 1;
                dayNumberEl.textContent = dayNumber;
            } else {
                dayEl.classList.add('other-month');
                const previousMonthDays = new Date(year, month, 0).getDate();
                const dayNumber = dayIndex < 0 ? previousMonthDays + dayIndex + 1 : dayIndex - numDays + 1;
                dayNumberEl.textContent = dayNumber;
            }

            const moneyEl = document.createElement('span');
            moneyEl.classList.add('money');

            // Lấy ngày đang được set money
            const date = new Date(year, month, dayIndex + 1);

			// Chỉnh lại tham số date theo định dạng "yyyy-MM-dd"
			const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
			
			// Gọi hàm get_money_of_date để lấy dữ liệu từ máy chủ
			get_money_of_date(formattedDate).then(response => {
			    if (response && response !== "" && response !== "0") {
			        moneyEl.textContent = response + " VND";
			    }
			});

            dayEl.appendChild(dayNumberEl);
            dayEl.appendChild(moneyEl);

            // Thêm sự kiện click cho ngày
            dayEl.addEventListener('click', () => {
                clearSelectedDays();
                dayEl.classList.add('selected');
                const money = moneyEl.textContent;

                let selectedDayNumber = dayNumberEl.textContent - 0;
                let selectedYear = currentYear;
                let selectedMonth = currentMonth;

                if (dayEl.classList.contains('other-month')) {
                    if (dayIndex < 0) {
                        selectedMonth--;
                        if (selectedMonth < 0) {
                            selectedMonth = 11;
                            selectedYear--;
                        }
                        selectedDayNumber = new Date(selectedYear, selectedMonth + 1, 0).getDate() + dayIndex + 1;
                    } else {
                        selectedMonth++;
                        if (selectedMonth > 11) {
                            selectedMonth = 0;
                            selectedYear++;
                        }
                        selectedDayNumber = dayIndex - numDays + 1;
                    }
                }

                selectedDate = new Date(selectedYear, selectedMonth, selectedDayNumber);
                updateSelectedDate(selectedDate);
                updateMoneyActivity(selectedDate);
            });
            calendarGrid.appendChild(dayEl);
            dayCount++;
        }
    }

    updateMonthYearDisplay();
}

function get_money_of_date(date) {
    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_calendar_receive_request", true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

        const params = "date=" + date + "&action=get_money_of_date";
        http.send(params);

        http.onload = function () {
            const resp = JSON.parse(http.responseText);
            resolve(resp);
        };

        http.onerror = function () {
            reject(new Error("Request error"));
        };
    });
}

function get_list_item_of_date(date) {
    return new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_calendar_receive_request", true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

        const params = "date=" + date + "&action=get_list_item_of_date";
        http.send(params);

        http.onload = function() {
            try {
                const resp = JSON.parse(http.responseText);
                resolve(resp);
            } catch (error) {
                reject(error);
            }
        };

        http.onerror = function() {
            reject(new Error("Network error"));
        };
    });
}
function updateSelectedDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = day + "/" + month + "/" + year;
  const selectedDateEl = document.querySelector('.selected-date');
  selectedDateEl.textContent = formattedDate;
}
function updateMonthYearDisplay() {
  monthYearEl.textContent = months[currentMonth] + " " + currentYear;
}
function updateMoneyActivity(selectedDate) {
    const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

    get_list_item_of_date(formattedDate)
        .then(itemList => {
            const listContainer = document.querySelector('.activities .list');
            listContainer.innerHTML = ''; // Xóa danh sách cũ

            console.log(itemList);

            itemList.forEach(itemData => {
                const [itemName, itemInfo, itemMoney] = itemData;

                const itemEl = document.createElement('div');
                itemEl.classList.add('item');

                const itemContentEl = document.createElement('div');
                itemContentEl.classList.add('item-content');

                const itemImageEl = document.createElement('img');
                itemImageEl.src = '/QuanLyChiTieu/img/icon_activity/' + itemName + '.png';
                itemImageEl.alt = '';

                const textContainerEl = document.createElement('div');
                textContainerEl.classList.add('text');

                const itemNameEl = document.createElement('h3');
                itemNameEl.classList.add('name');
                itemNameEl.textContent = itemName;

                const itemInfoEl = document.createElement('p');
                itemInfoEl.classList.add('note');
                itemInfoEl.textContent = itemInfo;

                const itemMoneyEl = document.createElement('p');
                itemMoneyEl.classList.add('money');
                itemMoneyEl.textContent = itemMoney + ' VND';

                textContainerEl.appendChild(itemNameEl);
                textContainerEl.appendChild(itemInfoEl);

                itemContentEl.appendChild(itemImageEl);
                itemContentEl.appendChild(textContainerEl);
                itemContentEl.appendChild(itemMoneyEl);

                itemEl.appendChild(itemContentEl);
                listContainer.appendChild(itemEl);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

// Thêm sự kiện click cho các nút "Prev" và "Next"
const prevBtn = document.querySelector('.prev-month');
const nextBtn = document.querySelector('.next-month');

prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
});

// Khởi tạo lịch cho tháng hiện tại
// Tạo lịch cho tháng hiện tại
generateCalendar(currentYear, currentMonth);

// Xóa các ngày đã được chọn trước đó
function clearSelectedDays() {
  const selectedDays = document.querySelectorAll('.selected');
  selectedDays.forEach(day => {
    day.classList.remove('selected');
  });
}

// Áp dụng lớp CSS cho ngày hiện tại
const todayEl = document.querySelector('.day-number');
todayEl.classList.add('selected');

// Tự động chọn ngày hiện tại khi mới hiển thị 
function autoSelectCurrentDate() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const days = document.querySelectorAll('.day');
  days.forEach(day => {
    const dayNumberEl = day.querySelector('.day-number');
    const dayNumber = parseInt(dayNumberEl.textContent);
    const isOtherMonth = day.classList.contains('other-month');

    if (
      dayNumber === currentDay &&
      currentMonth === currentMonth &&
      currentYear === currentYear &&
      !isOtherMonth
    ) {
      clearSelectedDays();
      day.classList.add('selected');
      const moneyEl = day.querySelector('.money');
      updateSelectedDate(currentDate);
      updateMoneyActivity(currentDate);
    }
  });
}

autoSelectCurrentDate();


