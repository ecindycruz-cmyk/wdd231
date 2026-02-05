document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    const everything = currentUrl.split('?');

    if (everything.length > 1) {
        const formData = everything[1].split('&');
        const resultsContainer = document.querySelector('#results');

        const fieldsToDisplay = ['fname', 'lname', 'email', 'phone', 'organization', 'timestamp', 'membership'];

        formData.forEach(element => {
            const parts = element.split('=');
            const key = parts[0];
            const value = decodeURIComponent(parts[1].replace(/\+/g, ' '));

            if (fieldsToDisplay.includes(key)) {
                const div = document.createElement('div');
                div.className = 'result-item';
                
        
                let label = key.replace('fname', 'First Name')
                               .replace('lname', 'Last Name')
                               .replace('organization', 'Business Name')
                               .replace('membership', 'Level')
                               .toUpperCase();

                div.innerHTML = `<strong>${label}:</strong> <span>${value}</span>`;
                resultsContainer.appendChild(div);
            }
        });
    }

    
    const yearSpan = document.querySelector('#year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Verificatión Last Modified 
    const lastMod = document.querySelector('#lastModified');
    if (lastMod) lastMod.textContent = document.lastModified;
});