document.addEventListener("DOMContentLoaded", () => {
    // 1. Manejo de Modales (Sin usar onclick en el HTML)
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
            button.closest('dialog').close();
        });
    });

    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }


    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            menuBtn.textContent = navMenu.classList.contains('show') ? '✕' : '≡';
        });
    }

    // 4. Footer
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
});

