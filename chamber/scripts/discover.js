import { members } from '../data/members.mjs';

// --- VISITOR MESSAGE LOGIC ---
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

// --- MENU LOGIC ---
const menuBtn = document.querySelector('#menu-btn');
const navMenu = document.querySelector('#nav-menu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        const isShowing = navMenu.classList.toggle('show');
        menuBtn.setAttribute('aria-expanded', isShowing);
        menuBtn.innerHTML = isShowing ? '&times;' : '&#9776;';
    });
}

// --- DISCOVER GRID LOGIC ---
const container = document.querySelector("#discover-grid");

if (container) {
    members.forEach((member, index) => {
        const card = document.createElement("section");
        card.className = "item-card";
       
        card.style.gridArea = `area${index + 1}`; 

        const loadingStrategy = index < 2 ? "eager" : "lazy";
        const priority = index < 2 ? 'fetchpriority="high"' : '';

        card.innerHTML = `
    <h2>${member.name}</h2>
    <figure>
        <img src="images/${member.image}" 
             alt="${member.name}" 
             width="400" 
             height="250" 
             loading="${index < 2 ? 'eager' : 'lazy'}" 
             ${index < 2 ? 'fetchpriority="high"' : ''}
             decoding="async"> </figure>
    <address>${member.address}</address>
    <p>${member.description}</p>
    <a href="${member.facebook}" class="learn-more-btn" target="_blank" rel="noopener">Learn More</a>
`;
        container.appendChild(card);
    });
}

// --- FOOTER DATES ---
const yearSpan = document.querySelector('#year');
const lastModSpan = document.querySelector('#lastModified');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = document.lastModified;
