const classrooms = [
    { name: "А-101", seats: 15, faculty: "Інформатика" },
    { name: "Б-204", seats: 12, faculty: "Математика" },
    { name: "В-305", seats: 18, faculty: "Інформатика" },
    { name: "Г-108", seats: 20, faculty: "Фізика" }
];

function displayClassrooms() {
    const output = document.getElementById("output");
    let html = "<h2>Усі аудиторії:</h2><ul>";
    classrooms.forEach(room => {
        html += `<li>${room.name} (${room.seats} місць, ${room.faculty})</li>`;
    });
    html += "</ul>";
    output.innerHTML += html;
}

function displayClassroomsByFaculty(faculty) {
    const output = document.getElementById("output");
    let html = `<h2>Аудиторії для факультету ${faculty}:</h2><ul>`;
    classrooms.filter(room => room.faculty === faculty).forEach(room => {
        html += `<li>${room.name} (${room.seats} місць)</li>`;
    });
    html += "</ul>";
    output.innerHTML += html;
}

function displayClassroomsForGroup(group) {
    const output = document.getElementById("output");
    let html = `<h2>Аудиторії для групи ${group.name}:</h2><ul>`;
    classrooms.filter(room => room.faculty === group.faculty && room.seats >= group.students)
        .forEach(room => {
            html += `<li>${room.name} (${room.seats} місць)</li>`;
        });
    html += "</ul>";
    output.innerHTML += html;
}

function sortClassroomsBySeats() {
    const output = document.getElementById("output");
    const sorted = [...classrooms].sort((a, b) => a.seats - b.seats);
    let html = "<h2>Аудиторії, відсортовані за кількістю місць:</h2><ul>";
    sorted.forEach(room => {
        html += `<li>${room.name} (${room.seats} місць, ${room.faculty})</li>`;
    });
    html += "</ul>";
    output.innerHTML += html;
}

function sortClassroomsByName() {
    const output = document.getElementById("output");
    const sorted = [...classrooms].sort((a, b) => a.name.localeCompare(b.name));
    let html = "<h2>Аудиторії, відсортовані за назвою:</h2><ul>";
    sorted.forEach(room => {
        html += `<li>${room.name} (${room.seats} місць, ${room.faculty})</li>`;
    });
    html += "</ul>";
    output.innerHTML += html;
}

document.addEventListener("DOMContentLoaded", () => {
    displayClassrooms();
    displayClassroomsByFaculty("Інформатика");
    const group = { name: "ІПЗ-21", students: 15, faculty: "Інформатика" };
    displayClassroomsForGroup(group);
    sortClassroomsBySeats();
    sortClassroomsByName();
});