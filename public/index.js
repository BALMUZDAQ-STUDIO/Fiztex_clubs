// Получаем ссылки на HTML-элементы, где будут отображаться кнопки для выбора букв и подгрупп
var data;
async function loadData() {
    try {
      const response = await fetch('../data/schedule.json');
      if (!response.ok) {
        throw new Error('Ошибка загрузки JSON файла');
      }
      const jsonData = await response.json();
      data = jsonData;
      console.log(jsonData["5"]["A"]["1"]); // Выводим jsonData после получения данных
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
loadData();
console.log(data);
const classData = data;
console.log(classData);
const letterButtonsDiv = document.getElementById("letter-buttons");
const groupButtonsDiv = document.getElementById("group-buttons");

// Определяем диапазон классов (например, с 7 по 8 класс)
let startClass = 7;
let endClass = 8;


const times = [
  "8:00 - 8:40", "8:45 - 9:25", "9:35 - 10:15",
  "10:20 - 11:00", "11:15 - 11:55", "12:05 - 12:45",
  "12:50 - 13:30"
];

// Дни недели, для которых будет отображаться расписание
const daysOfWeek = [
  "monday", "tuesday", "wednesday", "thursday", 
  "friday", "saturday", "sunday"
];
// Элемент для отображения текущего выбранного расписания
const currentScheduleText = document.getElementById("current-schedule");

// Переменные для отслеживания текущей буквы класса и подгруппы
let currentLetter = "A"; // Текущая буква класса
let currentGroup = "1"; // Текущая подгруппа
let letters; // Массив для хранения букв текущего класса

// Назначаем события для всех кнопок выбора класса
document.querySelectorAll(".class-button").forEach((button) => {
    // При клике на кнопку класса выполняется функция
    button.addEventListener("click", () => {
        const selectedClass = button.dataset.class; // Определяем класс, на который кликнули

        // Очищаем старые кнопки для выбора букв и подгрупп
        letterButtonsDiv.innerHTML = ""; 
        groupButtonsDiv.innerHTML = ""; 

        // Определяем подгруппы для текущего класса (обычно 1 и 2)
        let groups = ["1", "2"];

        // Получаем массив букв класса на основе выбранного класса
        letters = ["AE", "A", "B", "V", "G"];

        // Проверяем, есть ли текущая буква в доступных для этого класса
        if (letters.indexOf(currentLetter) !== -1) {
            currentLetter = currentLetter;
        } else {
            currentLetter = "А"; // Если нет, то устанавливаем первую букву
        }

        // Определяем текущую подгруппу
        currentGroup = currentGroup === "2" ? currentGroup : "1";

        // Обновляем отображение текущего выбранного расписания
        currentScheduleText.innerText = `${selectedClass}${currentLetter}-${currentGroup}`;

        // Деактивируем другие расписания и активируем только выбранное
        document.querySelectorAll(".schedule").forEach((schedule) => 
            schedule.classList.remove("active")
        );

        document.getElementById(`schedule-${selectedClass}${currentLetter}-${currentGroup}`)
            .classList.add("active");

        // Создаем кнопки для выбора букв класса
        letters.forEach((letter) => {
            const letterButton = document.createElement("button");
            letterButton.className = "letter-button";
            letterButton.innerText = `${letter}`;

            // При нажатии на кнопку буквы обновляем расписание
            letterButton.addEventListener("click", () => {
                document.querySelectorAll(".schedule").forEach((schedule) => 
                    schedule.classList.remove("active")
                );

                document.getElementById(`schedule-${selectedClass}${letter}-${currentGroup}`)
                    .classList.add("active");

                currentScheduleText.innerText = `${selectedClass}${letter}-${currentGroup}`;
                currentLetter = letter; // Обновляем текущую букву
            });
            letterButtonsDiv.appendChild(letterButton);
        });

        // Создаем кнопки для выбора подгрупп
        groups.forEach((group) => {
            const groupButton = document.createElement("button");
            groupButton.className = "group-button";
            groupButton.innerText = `${group}`;

            // При нажатии на кнопку подгруппы обновляем расписание
            groupButton.addEventListener("click", () => {
                document.querySelectorAll(".schedule").forEach((schedule) => 
                    schedule.classList.remove("active")
                );
                document.getElementById(`schedule-${selectedClass}${currentLetter}-${group}`)
                    .classList.add("active");

                currentScheduleText.innerText = `${selectedClass}${currentLetter}-${group}`;
                currentGroup = group;

                // Отображаем расписание для выбранной подгруппы
                displaySchedule(currentLetter, selectedClass, currentGroup);
            });
            groupButtonsDiv.appendChild(groupButton);

            // При создании кнопки также отображаем расписание
            displaySchedule(currentLetter, selectedClass, currentGroup);
        });
    });
});

// Функция для отображения расписания на основе класса, буквы и подгруппы
function displaySchedule(classType, grade, group) {
    const scheduleContainer = document.getElementById("schedule");
    scheduleContainer.innerHTML = ""; // Очищаем предыдущий контент

    const classData = JSON.stringify(data[grade][classType][group]);
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    // Создаем заголовок с днями недели
    headerRow.appendChild(document.createElement("th")); // Пустая ячейка
    daysOfWeek.forEach((day) => {
        const th = document.createElement("th");
        th.textContent = day.charAt(0).toUpperCase() + day.slice(1); // Название дня с заглавной буквы
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Заполняем строки таблицы временем уроков и предметами
    for (let period = 0; period < times.length; period++) {
        const row = document.createElement("tr");
        const periodCell = document.createElement("td");
        periodCell.textContent = times[period]; // Время урока
        row.appendChild(periodCell);

        // Заполняем ячейки предметами на каждый день
        daysOfWeek.forEach((day) => {
            const td = document.createElement("td");
            td.textContent = classData[day][period] || ""; // Если нет предмета, пустая ячейка
            row.appendChild(td);
        });

        table.appendChild(row);
    }

    scheduleContainer.appendChild(table); // Отображаем таблицу на странице
}
