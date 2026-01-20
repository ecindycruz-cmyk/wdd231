const url = 'data/members.json';
const container = document.querySelector('#members-container');
const gridBtn = document.querySelector('#grid');
const listBtn = document.querySelector('#list');
const menuBtn = document.querySelector('#menu-btn');
const navMenu = document.querySelector('#nav-menu');

function toggleButtonState(activeBtn, inactiveBtn) {
    activeBtn.classList.add('active');
    inactiveBtn.classList.remove('active');
}

// Fetch 
async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

const displayMembers = (members) => {
    container.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement('section');
        
        let image = document.createElement('img');
        image.src = `images/${member.image}`;
        image.alt = `Logo of ${member.name}`;
        image.loading = "lazy";
        image.width = 200;
       image.height = 150;

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="level">Membership: ${member.membershipLevel}</p>
        `;
        
        card.prepend(image);
        container.appendChild(card);
    });
}

gridBtn.addEventListener('click', () => {
    container.classList.replace('list-view', 'grid-view');
    toggleButtonState(gridBtn, listBtn);
});

listBtn.addEventListener('click', () => {
    container.classList.replace('grid-view', 'list-view');
    toggleButtonState(listBtn, gridBtn);
});

// Menu Móvil
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

const currentUrl = window.location.pathname;
document.querySelectorAll('#nav-menu a').forEach(link => {
    if (currentUrl.includes(link.getAttribute('href'))) {
        link.classList.add('active');
    }
});

// Footer
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;

// Inicializatión
gridBtn.classList.add('active');
getMembers();