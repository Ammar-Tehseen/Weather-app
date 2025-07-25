
const searchBox = document.querySelector("#searchbox");
const searchBtn = document.querySelector("#searchbtn");
const weather = document.querySelector(".weather")

const weatherIcon = document.querySelector("#weatherIcon");

let apiKey = "447f8802943c899d93183dc9cdbb25e7";

async function checkWeather(city) {

    try {
        const respone = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await respone.json();
        console.log(data);

        if (respone.status === 404) {
            document.querySelector(".error").style.display = "block";
            weather.style.display = "none";
        }

        if (data.weather[0].main === "Clear") {
            weatherIcon.src = "clear.png"
        }

        if (data.weather[0].main === "Rain") {
            weatherIcon.src = "rain.png"
        }

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "clouds.png"
        }

        document.querySelector(".cityname").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = data.main.temp + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherData = {
            name: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed,
        }


        weather.style.display = "block";
        document.querySelector(".error").style.display = "none";

        localStorage.setItem(data.name, JSON.stringify(weatherData));


    } catch (err) {
        console.log("Please enter the valid url ", err);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});