const weatherInfo = document.querySelector('#weather-info');
const forecastContainer = document.querySelector('#forecast');
const memberURL = 'data/members.json';

const lat = "13.6929";
const lon = "-89.2182";
const apiKey = "1563a5bfdde7e03d75e0de1f11eddc49";
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data); 
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Weather error:", error);
    }
}

function displayResults(data) {
    // Clima Actual
    const current = data.list[0];
    const iconsrc = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    const desc = current.weather[0].description;

    weatherInfo.innerHTML = `
        <div class="weather-details">
            <img src="${iconsrc}" alt="${desc}">
            <div class="weather-data">
                <span class="temp-main">${current.main.temp.toFixed(0)}&deg;F</span>
                <span class="desc-cap">${desc.toUpperCase()}</span>
                <span>Humidity: ${current.main.humidity}%</span>
            </div>
        </div>
    `;

    // Pronóstic 3 days
    const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    
    forecastContainer.innerHTML = ""; 
    dailyForecast.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        forecastContainer.innerHTML += `<p><strong>${dayName}:</strong> ${day.main.temp.toFixed(0)}&deg;F</p>`;
    });
}

async function fetchSpotlights() {
    try {
        const response = await fetch(memberURL);
        const data = await response.json();
        
        // Level 2 (Silver) or 3 (Gold)
        const eligible = data.members.filter(m => m.membershipLevel >= 2);
        const shuffled = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        const container = document.querySelector('.spotlight-cards');
        container.innerHTML = ""; 

        shuffled.forEach(member => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
                <p class="level">${member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member'}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Spotlight error:", error);
    }
}

// Menu Móvil 
const menuBtn = document.querySelector('#menu-btn');
const navMenu = document.querySelector('#nav-menu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    menuBtn.textContent = navMenu.classList.contains('show') ? 'X' : '≡';
});

// Footer
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;

apiFetch();
fetchSpotlights();