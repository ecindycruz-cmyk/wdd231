import { members } from '../data/members.mjs';

const messageDisplay = document.querySelector("#visitor-message");
const lastVisit = localStorage.getItem("lastVisitDate");
const now = Date.now();

if (messageDisplay) {
    if (!lastVisit) {
        messageDisplay.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const msBetween = now - lastVisit;
        const daysBetween = Math.floor(msBetween / (1000 * 60 * 60 * 24));

        if (msBetween < (1000 * 60 * 60 * 24)) {
            messageDisplay.textContent = "Back so soon! Awesome!";
        } else {
            const unit = daysBetween === 1 ? "day" : "days";
            messageDisplay.textContent = `You last visited ${daysBetween} ${unit} ago.`;
        }
    }
    localStorage.setItem("lastVisitDate", now);
}

const menuBtn = document.querySelector('#menu-btn');
const navMenu = document.querySelector('#nav-menu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    
    // Opcional: Cambia el icono de hamburguesa (☰) por una X
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
    menuBtn.setAttribute('aria-expanded', !expanded);
    menuBtn.innerHTML = expanded ? '&#9776;' : '&times;';
});

const container = document.querySelector("#discover-grid");

if (container) {
    members.forEach((member, index) => {
        const card = document.createElement("section");
        card.className = "item-card";
        card.style.gridArea = `area${index + 1}`; 

        card.innerHTML = `
            <h2>${member.name}</h2>
            <figure>
                <img src="images/${member.image}" alt="${member.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${member.address}</address>
            <p>${member.description}</p>
            <a href="${member.facebook}" class="learn-more-btn" target="_blank" rel="noopener noreferrer">Learn More</a>
        `;
        container.appendChild(card);
    });

    document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;
};

