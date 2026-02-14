const lat = "13.6929";
const lon = "-89.2182";
const apiKey = "1563a5bfdde7e03d75e0de1f11eddc49";
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const memberURL = 'data/inventory.json'; 

async function fetchHomeData() {
    const weatherInfo = document.querySelector('#weather-display'); 
    const eventsDiv = document.querySelector('#events-display');
    const forecastDisplay = document.querySelector('#forecast-display'); 

    // --- weather ---
    try {
        if (weatherInfo || forecastDisplay) {
            const response = await fetch(weatherUrl);
            const data = await response.json();

            if (weatherInfo) {
                const current = data.list[0];
                weatherInfo.innerHTML = `
                    <div class="weather-flex" style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" width="80" alt="weather icon">
                        <div>
                            <p style="font-size: 2rem; font-weight: bold; margin: 0;">${current.main.temp.toFixed(0)}&deg;F</p>
                            <p style="margin: 0; text-transform: capitalize;">${current.weather[0].description}</p>
                        </div>
                    </div>`;
            }

            if (forecastDisplay) {
                const daily = data.list.filter(x => x.dt_txt.includes("12:00:00")).slice(0, 3);
                forecastDisplay.innerHTML = ""; 
                daily.forEach(day => {
                    const date = new Date(day.dt_txt).toLocaleDateString('en-US', {weekday: 'short'});
                    forecastDisplay.innerHTML += `
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 5px 0;">
                            <span>${date}</span>
                            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" width="40" alt="icon">
                            <span>${day.main.temp.toFixed(0)}&deg;F</span>
                        </div>`;
                });
            }
        }
    } catch (e) { console.error("Weather error:", e); }

    // --- (JSON) ---
    if (eventsDiv) {
        try {
            const resMembers = await fetch(memberURL);
            if (!resMembers.ok) throw new Error("No se pudo cargar el JSON");
            
            const memberData = await resMembers.json();
            
            // Verification 'destinations'
            if (memberData.destinations) {
                const topThree = memberData.destinations.slice(0, 3);
                eventsDiv.innerHTML = topThree.map(dest => `
                    <div class="event-item" style="padding: 10px 0; border-bottom: 1px solid #eee;">
                        <p style="margin:0; font-weight:bold; color: var(--primary);">${dest.name}</p>
                        <p style="margin:0; font-size: 0.85rem; color: var(--secondary);">${dest.category}</p>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error("Error cargando eventos:", error);
            eventsDiv.innerHTML = "<p>Events temporary unavailable.</p>";
        }
    }
}

// --- FUNCTIONS SOPORT ---
function setupNavigation() {
    const menuBtn = document.querySelector('#menuBtn');
    const nav = document.querySelector('#primaryNav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuBtn.textContent = nav.classList.contains('open') ? 'X' : '☰';
        });
    }
}

function updateFooterInfo() {
    const yearSpan = document.querySelector('#year');
    const lastModSpan = document.querySelector('#lastMod');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModSpan) lastModSpan.textContent = document.lastModified;
}

function updateVisitCount() {
    const visitDisplay = document.querySelector("#visitCount");
    const lastVisit = window.localStorage.getItem("lastVisit-ls");
    const now = Date.now();

    if (visitDisplay) {
        if (!lastVisit) {
            visitDisplay.textContent = "Welcome! This is your first visit.";
        } else {
            const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
            visitDisplay.textContent = days < 1 ? "Back so soon? Awesome!" : `Last visit: ${days} days ago`;
        }
    }
    localStorage.setItem("lastVisit-ls", now);
}

// INICIALIZATIÓN
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    updateFooterInfo();
    updateVisitCount();
    fetchHomeData();

    const timestampInput = document.querySelector('#timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }
});