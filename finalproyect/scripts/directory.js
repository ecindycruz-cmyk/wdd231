const jsonPath = 'data/inventory.json';
const display = document.querySelector('#directory-grid');
const gridBtn = document.querySelector('#gridView');
const listBtn = document.querySelector('#listView');

async function getItems() {
    try {
        const response = await fetch(jsonPath);
        const data = await response.json();
        renderItems(data.destinations);
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

function renderItems(items) {
    display.innerHTML = ""; 
    items.forEach(item => {
        let card = document.createElement('section');
        card.className = "card";
        card.innerHTML = `
            <div class="card-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="250">
            </div>
            <div class="card-header" style="background: var(--secondary)"></div>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>📍 ${item.location}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <span class="tag" style="background:#eee; padding:2px 8px; border-radius:4px; font-size:0.8rem;">
                    ${item.tags}
                </span>
            </div>
        `;
        display.appendChild(card);
    });
}

// Lógic  view
gridBtn.addEventListener('click', () => {
    display.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    display.classList.add('list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

// Info footer
if(document.querySelector('#lastModified')) {
    document.querySelector('#lastModified').textContent = document.lastModified;
}

// Menu Hamburger
const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#primaryNav');
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.textContent = nav.classList.contains('open') ? 'X' : '☰';
});

getItems();