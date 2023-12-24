const isLeapYear = (year) => {
    return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
    );
};
const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector('.calendar');
const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
};

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];

    let currentDate = new Date();

    month_picker.innerHTML = month_names[month];

    calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month);


    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

        let day = document.createElement('div');

        if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1;

            if (i - first_day.getDay() + 1 === currentDate.getDate() &&
                year === currentDate.getFullYear() &&
                month === currentDate.getMonth()
            ) {
                day.classList.add('current-date');
            }
        }
        calendar_days.appendChild(day);
    }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;

    month_list.append(month);
    month.onclick = () => {
        currentMonth.value = index;
        generateCalendar(currentMonth.value, currentYear.value);
        month_list.classList.replace('show', 'hide');
        dayTextFormate.classList.remove('hideTime');
        dayTextFormate.classList.add('showtime');
        timeFormate.classList.remove('hideTime');
        timeFormate.classList.add('showtime');
        dateFormate.classList.remove('hideTime');
        dateFormate.classList.add('showtime');
    };
});

(function () {
    month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
};
const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(() => {
    const timer = new Date();
    const option = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
        2,
        '0'
    )}:${`${timer.getMinutes()}`.padStart(
        2,
        '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
}, 1000);





document.addEventListener('DOMContentLoaded', function () {
    const calendarDays = document.querySelector('.calendar-days');

    // Retrieve stored dates array from localStorage
    const storedDates = JSON.parse(localStorage.getItem('markedDates')) || [];

    // Render the calendar initially
    renderCalendar();

    // Mark the dates if they were stored
    storedDates.forEach(date => {
        const markedElement = findDateElementByValue(calendarDays, date);
        if (markedElement) {
            markedElement.classList.add('marked');
        }
    });

    calendarDays.addEventListener('click', function (event) {
        const clickedDate = event.target.textContent;

        if (!isNaN(clickedDate)) {
            toggleDateMarking(event.target);

            // Update the array of marked dates and store in localStorage
            updateMarkedDates(clickedDate);
        }
    });

    const monthPicker = document.querySelector('#month-picker');
    monthPicker.addEventListener('click', function () {
        // Clear localStorage when changing the month
        // localStorage.removeItem('markedDates');

        // Re-render the calendar after changing the month
        renderCalendar();
    });
});

function renderCalendar() {
    const calendarDays = document.querySelector('.calendar-days');
    calendarDays.innerHTML = '';

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    generateCalendar(currentMonth, currentYear);
}

function toggleDateMarking(element) {
    // Toggle the marking class
    element.classList.toggle('marked');
}

function updateMarkedDates(clickedDate) {
    // Retrieve stored dates array from localStorage
    const storedDates = JSON.parse(localStorage.getItem('markedDates')) || [];

    // Check if the date is already in the array
    const index = storedDates.indexOf(clickedDate);

    if (index !== -1) {
        // If date is already in the array, remove it
        storedDates.splice(index, 1);
    } else {
        // If date is not in the array, add it
        storedDates.push(clickedDate);
    }

    // Store the updated array of marked dates in localStorage
    localStorage.setItem('markedDates', JSON.stringify(storedDates));
}

function findDateElementByValue(calendarDays, value) {
    // Find and return the element with the specified value
    const dateElements = calendarDays.querySelectorAll('div');
    for (const dateElement of dateElements) {
        if (dateElement.textContent.trim() === value.trim()) {
            return dateElement;
        }
    }
    return null;
}
