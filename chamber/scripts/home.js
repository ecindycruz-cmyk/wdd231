const lat = "13.6929";
const lon = "-89.2182";
const apiKey = "1563a5bfdde7e03d75e0de1f11eddc49";
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const memberURL = 'data/members.json';

const menuBtn = document.querySelector('#menu-btn');
const navMenu = document.querySelector('#nav-menu');

// --- MENU HAMBURGUESA ---
menuBtn.addEventListener('click', () => {
    const isShowing = navMenu.classList.toggle('show');
    menuBtn.innerHTML = isShowing ? '&times;' : '&#9776;';
});

const currentPath = window.location.pathname.split("/").pop();
document.querySelectorAll('#nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPath || (currentPath === "" && link.getAttribute('href') === "index.html")) {
        link.classList.add('active');
    }
});

// --- FETCH WEATHER ---
// --- FETCH WEATHER ---
async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        const current = data.list[0];
        const weatherInfo = document.querySelector('#weather-info');
        
        const currentIcon = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
        const currentDesc = current.weather[0].description;

        weatherInfo.innerHTML = `
            <div class="weather-flex">
                <img src="${currentIcon}" alt="${currentDesc}" width="100" height="100">
                <div>
                    <p style="font-size: 1.5rem; font-weight: bold; margin: 0;">${current.main.temp.toFixed(0)}&deg;F</p>
                    <p style="margin: 0; text-transform: capitalize;">${currentDesc}</p>
                </div>
            </div>
        `;

        // --- Forecast 3 days ---
        const forecastContainer = document.querySelector('#forecast');
    
        const daily = data.list.filter(x => x.dt_txt.includes("12:00:00")).slice(0, 3);
        
        forecastContainer.innerHTML = "";
        daily.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString('en-US', {weekday: 'long'});
            const iconCode = day.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            const temp = day.main.temp.toFixed(0);

            forecastContainer.innerHTML += `
                <div class="forecast-day" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; padding: 5px 0;">
                    <span>${date}</span>
                    <div style="display: flex; align-items: center;">
                        <img src="${iconUrl}" alt="${day.weather[0].description}">
                        <span style="font-weight: bold; width: 40px; text-align: right;">${temp}&deg;F</span>
                    </div>
                </div>
            `;
        });
    } catch (e) { 
        console.error("Weather error", e); 
        document.querySelector('#weather-info').innerHTML = "<p>Weather data unavailable</p>";
    }
}
// --- FETCH SPOTLIGHTS ---
async function fetchSpotlights() {
    try {
        const response = await fetch(memberURL);
        const data = await response.json();
        
        // Filtrar Gold (3) y Silver (2)
        const eligible = data.members.filter(m => m.membershipLevel >= 2);
        
        const shuffled = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        const container = document.querySelector('.spotlight-cards');
        container.innerHTML = "";
        
        shuffled.forEach(m => {
            container.innerHTML += `
                <div class="spotlight-card">
                    <img src="images/${m.image}" alt="${m.name} logo">
                    <h3>${m.name}</h3>
                    <p>${m.address}</p>
                    <p>${m.phone}</p>
                    <p><a href="${m.website}" target="_blank">Website</a></p>
                    <p><strong>Level: ${m.membershipLevel === 3 ? 'Gold' : 'Silver'}</strong></p>
                </div>
            `;
        });
    } catch (e) { console.error("Spotlight error", e); }
}


fetchWeather();
fetchSpotlights();
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;