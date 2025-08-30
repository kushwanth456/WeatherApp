const apiKey = "05cf6de8b1db97d5064aa6cfc26f6451";

function fetchWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherDiv = document.getElementById("weatherDisplay");

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod !== 200) {
                weatherDiv.innerHTML = `<p>${data.message}</p>`;
                return;
            }

            const { name, main, weather } = data;
            const temp = Math.round(main.temp);
            const condition = weather[0].main;
            const icon = weather[0].icon;

            weatherDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${condition}" />
        <p style="font-size: 1.5rem;">${temp}°C - ${condition}</p>
      `;
        })
        .catch(() => {
            weatherDiv.innerHTML = "<p>Something went wrong. Please try again.</p>";
        });
}
