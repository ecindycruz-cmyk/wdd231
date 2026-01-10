const hamBtn = document.querySelector("#ham-btn");
const navList = document.querySelector("#nav-list");

// Menu Hamburguer
hamBtn.addEventListener("click", () => {
    navList.classList.toggle("show");
    hamBtn.classList.toggle("show");
});
// --- Dates of the Courses ---
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

function displayCourses(filteredList) {
    courseContainer.innerHTML = "";

    filteredList.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        if (course.completed) courseCard.classList.add("completed");

        courseCard.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        
        courseCard.addEventListener('click', () => {
            alert(`${course.title}\n\n${course.description}\n\nTech: ${course.technology.join(', ')}`);
        });

        courseContainer.appendChild(courseCard);
    });

    const total = filteredList.reduce((acc, c) => acc + c.credits, 0);
    totalCreditsElement.textContent = `Total Credits: ${total}`;
}

function setActiveButton(btn) {
    [allBtn, cseBtn, wddBtn].forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

allBtn.addEventListener('click', (e) => {
    displayCourses(courses);
    setActiveButton(e.target);
});

cseBtn.addEventListener('click', (e) => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
    setActiveButton(e.target);
});

wddBtn.addEventListener('click', (e) => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
    setActiveButton(e.target);
});

const options = {
    month: "short",
    day: "2-digit",
    year: "numeric"
};

const todayElement = document.getElementById('today1');
if (todayElement) {
    todayElement.textContent = new Date().toLocaleDateString("en-US", options);
}

const yearElement = document.getElementById('currentyear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const modifiedElement = document.getElementById('lastModified');
if (modifiedElement) {
    modifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}

displayCourses(courses);