// Получаем ссылки на HTML-элементы, где будут отображаться кнопки для выбора букв и подгрупп
const letterButtonsDiv = document.getElementById("letter-buttons");
const groupButtonsDiv = document.getElementById("group-buttons");

// Определяем диапазон классов (например, с 7 по 8 класс)
let startClass = 7;
let endClass = 8;

// Объект, содержащий классы и соответствующие буквы для каждого уровня (5-й, 6-й и т.д.)
const getClasses = {
  5: ["AE", "A", "B", "V", "G", "D", "E", "ZH", "K"],
  6: ["AE", "A", "B", "V", "G", "D", "E", "ZH", "K", "M"],
  7: ["AE", "A", "B", "V", "G", "D", "E", "ZH"],
  8: ["AE", "A", "B", "V", "G", "D", "E", "ZH"],
  9: ["AE", "A", "B", "V", "G", "D", "E", "ZH"],
  10: ["AE", "A", "B", "V"],
};

// Пример данных расписания, разделенных по уровням классов, буквам классов и подгруппам
const data = {
  5: {
      AE: {
          1: {
              monday: [
                  "Math",
                  "Physics",
                  "History",
                  "Kazakh",
                  "English",
              ],
              tuesday: [
                  "Chemistry",
                  "Math",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
              wednesday: [
                  "Biology",
                  "Math",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
              thursday: [
                  "Math",
                  "Geography",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
              friday: [
                  "Math",
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "Physical Education",
              ],
              saturday: [
                  "Math",
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
              sunday: [
                  "Math",
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
          },
          2: {
              monday: [
                  "Physics",
                  "Chemistry",
                  "Kazakh",
                  "English",
                  "Math",
              ],
              tuesday: [
                  "Physics",
                  "Inform",
                  "Biology",
                  "English",
                  "Math",
              ],
              wednesday: [
                  "Physics",
                  "History",
                  "Kazakh",
                  "Math",
                  "English",
              ],
              thursday: [
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "Geography",
                  "Math",
              ],
              friday: [
                  "Physics",
                  "Inform",
                  "Chemistry",
                  "English",
                  "Math",
              ],
              saturday: [
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "Math",
                  "Physical Education",
              ],
              sunday: [
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "Math",
                  "English",
              ],
          },
      },
      А: {
          1: {
              monday: [
                  "Math",
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
              tuesday: [
                  "Math",
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
              wednesday: [
                  "Math",
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
              thursday: [
                  "Math",
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
              friday: [
                  "Math",
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
              saturday: [
                  "Math",
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
              sunday: [
                  "Math",
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
              ],
          },
          2: {
              monday: [
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
                  "Math",
              ],
              tuesday: [
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
                  "Math",
              ],
              wednesday: [
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
                  "Math",
              ],
              thursday: [
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
                  "Math",
              ],
              friday: [
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
                  "Math",
              ],
              saturday: [
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
                  "Math",
              ],
              sunday: [
                  "Physics",
                  "Inform",
                  "Kazakh",
                  "English",
                  "Math",
              ],
          },
      },
  },
};

// Массив с временными интервалами для уроков
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
        letters = getClasses[selectedClass];

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

    const classData = data[grade][classType][group];
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