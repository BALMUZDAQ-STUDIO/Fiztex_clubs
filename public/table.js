const data = {
    "7A": [
        "1" : ["Math|101", "Physics|102", "Chemistry|103"],
              ["Biology|104", "History|105", "Geography|106"],
        "2" : ["Math|101", "Physics|102", "Chemistry|103"],
              ["Biology|104", "History|105", "Geography|106"]
    ],
    "8B": [
        ["Math|101", "Physics|102", "Chemistry|103"],
        ["Biology|104", "History|105", "Geography|106"]
    ]
};

const bodyTable = document.querySelector('tbody');
function fillTable(classKey, day) {
    const tableBody = document.getElementById("schedule-body");
    const classSchedule = data[classKey];

    // Проверяем, есть ли данные для выбранного класса и дня
    if (!classSchedule[day]) {
        console.error("Нет данных для данного класса или дня");
        return;
    }