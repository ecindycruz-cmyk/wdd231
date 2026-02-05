document.addEventListener("DOMContentLoaded", () => {
    // --- MENU ---
    const menuBtn = document.querySelector('#menu-btn');
    const navMenu = document.querySelector('#nav-menu');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const isShowing = navMenu.classList.toggle('show');
            menuBtn.innerHTML = isShowing ? '&times;' : '≡';
        });
    }

    // --- ACTIVE LINK ---
    const currentPath = window.location.pathname.split("/").pop();
    document.querySelectorAll('#nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPath || (currentPath === "" && link.getAttribute('href') === "index.html")) {
            link.classList.add('active');
        }
    });

    // --- TIMESTAMP ---
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toLocaleString();
    }

    // --- FOOTER DATES ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const lastMod = document.getElementById('lastModified');
    if (lastMod) lastMod.textContent = document.lastModified;
});

// --- MODAL ---
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.showModal();
    }
}

