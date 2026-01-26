export function setTitle(course) {
  const titleElement = document.querySelector("#courseName");
  const codeElement = document.querySelector("#courseCode");
  titleElement.textContent = course.courseName;
  codeElement.textContent = course.courseCode;
}

export function renderSections(sections) {
  const html = sections.map(
    (section) => `<tr>
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td></tr>`
  );
  document.querySelector("#sections").innerHTML = html.join("");
}