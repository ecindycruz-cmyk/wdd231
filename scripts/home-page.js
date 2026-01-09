// --- Datos de los Cursos ---
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true 
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true 
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes...',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true 
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// --- Selector Element ---
const courseContainer = document.querySelector('#course-container');
const totalCreditsElement = document.querySelector('#total-credits');
const allBtn = document.querySelector('#all-btn');
const cseBtn = document.querySelector('#cse-btn');
const wddBtn = document.querySelector('#wdd-btn');

// --- Funtion of Visualizatión ---

function displayCourses(filteredList) {
    courseContainer.innerHTML = "";

    filteredList.forEach(course => {
    
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        
        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        
        courseCard.addEventListener('click', () => {
            alert(`${course.title}\n\n${course.description}\n\nTechnologies: ${course.technology.join(', ')}`);
        });

        courseContainer.appendChild(courseCard);
    });

    const totalCredits = filteredList.reduce((accumulator, course) => {
        return accumulator + course.credits;
    }, 0);

    totalCreditsElement.textContent = `Total Credits for displayed courses: ${totalCredits}`;
}

// --- Event Listeners ---

allBtn.addEventListener('click', () => {
    displayCourses(courses);
});

cseBtn.addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

wddBtn.addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

// --- Inicializatión ---
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

displayCourses(courses);

const yearElement = document.getElementById("currentyear");

const currentYear = new
    Date().getFullYear();

if (yearElement) {
    yearElement.textContent = currentYear;
}

const modifiedElement = document.getElementById("lastModified");

if (modifiedElement) {
    modifiedElement.textContent += document.lastModified;
}