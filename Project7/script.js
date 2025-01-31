
// OpenWeatherMap API key
const apiKey = "32844b5c8be8f133941fa2c7abd0153b"; // আপনার OpenWeatherMap API key এখানে ব্যবহার করুন
const searchBtn = document.getElementById("search-btn"); // সার্চ বাটন সিলেক্ট করা
const cityInput = document.getElementById("city-input"); // ইনপুট বক্স সিলেক্ট করা যেখানে শহরের নাম লেখা হবে

// বিভিন্ন তথ্য দেখানোর জন্য UI এলিমেন্টস সিলেক্ট করা
const tempDisplay = document.getElementById("temp"); // তাপমাত্রা দেখানোর জন্য
const cityDisplay = document.getElementById("city"); // শহরের নাম দেখানোর জন্য
const humidityDisplay = document.getElementById("humidity"); // আর্দ্রতার মান দেখানোর জন্য
const windSpeedDisplay = document.getElementById("wind-speed"); // বাতাসের গতিবেগ দেখানোর জন্য
const weatherIcon = document.getElementById("weather-icon"); // আবহাওয়ার আইকন দেখানোর জন্য

// সার্চ বাটনে ক্লিক করার ইভেন্ট হ্যান্ডলার
searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim(); // ইনপুট থেকে শহরের নাম নেয়া
    if (cityName !== "") {
        fetchWeather(cityName); // শহরের নামের ভিত্তিতে আবহাওয়া ডাটা নিয়ে আসা
    } else {
        alert("দয়া করে একটি শহরের নাম লিখুন।"); // যদি ইনপুট খালি থাকে তবে অ্যালার্ট দেখানো
    }
});

// আবহাওয়ার ডাটা নিয়ে আসার জন্য অ্যাসিঙ্ক্রোনাস ফাংশন
async function fetchWeather(city) {
    try {
        // OpenWeatherMap API থেকে ডাটা ফেচ করা
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("শহর খুঁজে পাওয়া যায়নি।"); // যদি সঠিক শহর না পাওয়া যায়, তাহলে এরর দেখানো
        }
        const data = await response.json(); // JSON ডাটা রূপান্তর করা

        // UI আপডেট করা
        tempDisplay.innerText = `${data.main.temp}°C`; // তাপমাত্রা দেখানো
        cityDisplay.innerText = data.name; // শহরের নাম দেখানো
        humidityDisplay.innerText = `${data.main.humidity}%`; // আর্দ্রতা দেখানো
        windSpeedDisplay.innerText = `${data.wind.speed} km/h`; // বাতাসের গতিবেগ দেখানো
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // আবহাওয়ার আইকন আপডেট করা

    } catch (error) {
        alert(error.message); // যদি কোনো এরর হয়, অ্যালার্ট দেখানো
    }
}
