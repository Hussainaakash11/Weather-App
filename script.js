const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".location");
const dateAndTimeField = document.querySelector(".datetime");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'Sultanpur';

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=1fe73d2d57fc44f99a093230251602&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch weather data.");
        }
        const data = await res.json();

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Could not fetch weather data. Please try again.");
    }
}

function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(' ')[0]; // Extract date
    let splitTime = time.split(' ')[1]; // Extract time
    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateAndTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value.trim();

    if (target) {
        fetchResults(target);
        searchField.value = ''; // Clear input after search
    }
}

fetchResults(target);

function getDayName(number) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[number] || "Unknown";
}
