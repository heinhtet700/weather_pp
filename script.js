
const main = async (city) => {
    const ulr = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9a508c531ab5c45f57178455e7fd71a9`;
    const response = await fetch(ulr);
    const data = await response.json();
    showAndHide(data);
    search();
}

const showAndHide = (data) => {
    const loading = document.querySelector(".d-flex");
    const error = document.querySelector(".error");
    const weather = document.querySelector(".weather");
    const details = document.querySelector(".details");

    loading.style.opacity = 0;

    if (data.cod == 404) {
        details.style.display = "none";
        weather.style.display = "none";
        error.style.display = "block";
    } else {
        error.style.display = "none";
        details.style.display = "flex";
        weather.style.display = "flex";

        change_data(data);
    }
}

const change_data = (data) => {
    change_image(data);

    const temp = document.querySelector(".weather h2");
    const country = document.querySelector(".weather h3");
    const humidity = document.querySelector(".humidity");
    const wind_speed = document.querySelector(".wind");

    temp.innerText = Math.round(data.main.temp) + "°C";
    country.innerText = data.name;
    humidity.innerText = data.main.humidity + "%";
    wind_speed.innerText = data.wind.speed + "km/h";
}

const change_image = (data) => {
    const weather = data.weather[0].main;
    const weather_img = document.querySelector(".weather img");

    switch(weather) {
        case "Clouds":
            weather_img.src = "images/clouds.png";
            break;
        case "Clear":
            weather_img.src = "images/clear.png";
            break;
        case "Drizzle":
            weather_img.src = "images/clear.png";
            break;
        case "Mist":
            weather_img.src = "images/clear.png";
            break;
        case "Rain":
            weather_img.src = "images/rain.png";
            break;
        case "Snow":
            weather_img.src = "images/snow.png";
            break;
    }
}

const search = () => {
    const search_box = document.querySelector(".search input");
    const search_btn = document.querySelector(".search button");
    
    search_box.addEventListener("keyup", (eve) => {
        if (eve.key == "Enter") {
            search_city();
        }
    })

    search_btn.onclick = () => {
        search_city();
    }
}

const search_city = () => {
    const search_box = document.querySelector(".search input");
    const loading = document.querySelector(".d-flex");
    const weather = document.querySelector(".weather");
    const details = document.querySelector(".details");

    loading.style.opacity = 1;
    details.style.display = "none";
    weather.style.display = "none";
    main(search_box.value);
    search_box.value = "";
}

window.onload = () => {
    main("Yangon");
}