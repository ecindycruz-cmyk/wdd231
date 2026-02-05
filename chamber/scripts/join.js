document.addEventListener("DOMContentLoaded", () => {
    // 1. Manejo de Modales
    const openButtons = document.querySelectorAll('.open-modal-btn');
    const closeButtons = document.querySelectorAll('.close-modal-btn');

    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.showModal();
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('dialog');
            if (modal) modal.close();
        });
    });

    // 2. Timestamp
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // 3. Menú Móvil
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            menuBtn.textContent = navMenu.classList.contains('show') ? '✕' : '≡';
        });
    }

    // 4. Footer info
    const yearSpan = document.getElementById('year');
    const lastModSpan = document.getElementById('lastModified');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModSpan) lastModSpan.textContent = document.lastModified;
});
