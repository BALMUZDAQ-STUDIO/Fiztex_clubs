<<<<<<< HEAD

const letterButtonsDiv = document.getElementById("letter-buttons");
const groupButtonsDiv = document.getElementById("group-buttons");
let startClass = 7;
let endClass = 8;
    const currentScheduleText = document.getElementById("current-schedule");
    let currentLetter = "A"; // Переменная для хранения текущей буквы
    let currentGroup = "1"; // Переменная для хранения подгруппы
    document.querySelectorAll(".class-button").forEach(button => {
        button.addEventListener("click", () => {
        const selectedClass = button.dataset.class;
        letterButtonsDiv.innerHTML = ""; // Очищаем кнопки букв
        groupButtonsDiv.innerHTML = ""; // Очищаем кнопки подгрупп 
        // Определяем буквы в зависимости от выбранного класса
        let letters;
        let groups = ["1", "2"];
        var getClasses = {"5" : ["AE", "A", "B", "V", "G", "D", "E", "ZH", "K"], 
                          "6" : ["AE", "A", "B", "V", "G", "D", "E", "ZH", "K", "M"], 
                          "7" : ["AE", "A", "B", "V", "G", "D", "E", "ZH"], 
                          "8": ["AE", "A", "B", "V", "G", "D", "E", "ZH"], 
                          "9" : ["AE", "A", "B", "V", "G", "D", "E", "ZH"], 
                          "10" : ["AE", "A", "B", "V"]};
        letters = getClasses[selectedClass];
        if(letters.indexOf(currentLetter) !== -1) {currentLetter = currentLetter} else { currentLetter = "А"};
        currentGroup = (currentGroup === "2") ? currentGroup : "1";
        currentScheduleText.innerText = `${selectedClass}${currentLetter}-${currentGroup}`;
        document.querySelectorAll(".schedule").forEach(schedule => schedule.classList.remove("active"));
        document.getElementById(`schedule-${selectedClass}${currentLetter}-${currentGroup}`).classList.add("active");
=======
const letterButtonsDiv = document.getElementById("letter-buttons");
    const currentScheduleText = document.getElementById("current-schedule");
    let currentLetter = "A"; // Переменная для хранения текущей буквы

    document.querySelectorAll(".class-button").forEach(button => {
      button.addEventListener("click", () => {
        const selectedClass = button.dataset.class;
        letterButtonsDiv.innerHTML = ""; // Очищаем кнопки букв
        
        // Определяем буквы в зависимости от выбранного класса
        let letters;
        if (selectedClass === "7") {
          letters = ["A", "B"];
          currentLetter = "A"; // По умолчанию 7A
          currentScheduleText.innerText = `Расписание для: 7${currentLetter} класса`;
          document.getElementById("schedule-7A").classList.add("active");
          document.getElementById("schedule-7B").classList.remove("active");
        } else if (selectedClass === "8") {
          letters = ["A", "B", "C"];
          currentScheduleText.innerText = `Расписание для: 8${currentLetter} класса`;
          document.getElementById(`schedule-8${currentLetter}`).classList.add("active");
          document.getElementById("schedule-8B").classList.remove("active");
          document.getElementById("schedule-8C").classList.remove("active");
        }
>>>>>>> e89f0dba2cbd6a7e44d940647a2a436c5facda58

        // Создание кнопок для букв
        letters.forEach(letter => {
          const letterButton = document.createElement("button");
          letterButton.className = "letter-button";
<<<<<<< HEAD
          letterButton.innerText = `${letter}`;
          letterButton.addEventListener("click", () => {
            document.querySelectorAll(".schedule").forEach(schedule => schedule.classList.remove("active"));
            document.getElementById(`schedule-${selectedClass}${letter}-${currentGroup}`).classList.add("active");
            currentScheduleText.innerText = `${selectedClass}${letter}-${currentGroup}`;
=======
          letterButton.innerText = `${selectedClass}${letter}`;
          letterButton.addEventListener("click", () => {
            document.querySelectorAll(".schedule").forEach(schedule => schedule.classList.remove("active"));
            document.getElementById(`schedule-${selectedClass}${letter}`).classList.add("active");
            currentScheduleText.innerText = `Расписание для: ${selectedClass}${letter} класса`;
>>>>>>> e89f0dba2cbd6a7e44d940647a2a436c5facda58
            currentLetter = letter; // Обновляем текущую букву
          });
          letterButtonsDiv.appendChild(letterButton);
        });
<<<<<<< HEAD
        groups.forEach(group => {
            const groupButton = document.createElement("button");
            groupButton.className = "group-button";
            groupButton.innerText = `${group}`;
            groupButton.addEventListener("click", () => {
            document.querySelectorAll(".schedule").forEach(schedule => schedule.classList.remove("active"));
            document.getElementById(`schedule-${selectedClass}${currentLetter}-${group}`).classList.add("active");
            currentScheduleText.innerText = `${selectedClass}${currentLetter}-${group}`;
            currentGroup = group;
            displaySchedule(`${currentLetter}`, `${selectedClass}`, `${currentGroup}`);
          });
          groupButtonsDiv.appendChild(groupButton);
          groupButton.onclick = displaySchedule(`${currentLetter}`, `${selectedClass}`, `${currentGroup}`);
          const data = {
            "5": {
                "AE": {
                    "1": {
                        "monday": ["Math", "Physics", "History", "Kazakh", "English"],
                        "tuesday": ["Chemistry", "Math", "Inform", "Kazakh", "English"],
                        "wednesday": ["Biology", "Math", "Inform", "Kazakh", "English"],
                        "thursday": ["Math", "Geography", "Inform", "Kazakh", "English"],
                        "friday": ["Math", "Physics", "Inform", "Kazakh", "Physical Education"],
                        "saturday": ["Math", "Physics", "Inform", "Kazakh", "English"],
                        "sunday": ["Math", "Physics", "Inform", "Kazakh", "English"]
                    },
                    "2": {
                        "monday": ["Physics", "Chemistry", "Kazakh", "English", "Math"],
                        "tuesday": ["Physics", "Inform", "Biology", "English", "Math"],
                        "wednesday": ["Physics", "History", "Kazakh", "Math", "English"],
                        "thursday": ["Physics", "Inform", "Kazakh", "Geography", "Math"],
                        "friday": ["Physics", "Inform", "Chemistry", "English", "Math"],
                        "saturday": ["Physics", "Inform", "Kazakh", "Math", "Physical Education"],
                        "sunday": ["Physics", "Inform", "Kazakh", "Math", "English"]
                    }
                },
                "А": {
                    "1": {
                        "monday": ["Math", "Physics", "Inform", "Kazakh", "English"],
                        "tuesday": ["Math", "Physics", "Inform", "Kazakh", "English"],
                        "wednesday": ["Math", "Physics", "Inform", "Kazakh", "English"],
                        "thursday": ["Math", "Physics", "Inform", "Kazakh", "English"],
                        "friday": ["Math", "Physics", "Inform", "Kazakh", "English"],
                        "saturday": ["Math", "Physics", "Inform", "Kazakh", "English"],
                        "sunday": ["Math", "Physics", "Inform", "Kazakh", "English"]
                    },
                    "2": {
                        "monday": ["Physics", "Inform", "Kazakh", "English", "Math"],
                        "tuesday": ["Physics", "Inform", "Kazakh", "English", "Math"],
                        "wednesday": ["Physics", "Inform", "Kazakh", "English", "Math"],
                        "thursday": ["Physics", "Inform", "Kazakh", "English", "Math"],
                        "friday": ["Physics", "Inform", "Kazakh", "English", "Math"],
                        "saturday": ["Physics", "Inform", "Kazakh", "English", "Math"],
                        "sunday": ["Physics", "Inform", "Kazakh", "English", "Math"]
                    }
                }
            }
        };
        const times = [
          "8:00 - 8:40", "8:45 - 9:25", "9:35 - 10:15", "10:20 - 11:00", 
          "11:15 - 11:55", "12:05 - 12:45", "12:50 - 13:30"
      ];

      function displaySchedule(classType, grade, group) {
          const scheduleContainer = document.getElementById('schedule');
          scheduleContainer.innerHTML = ''; // Clear previous content

          const classData = data[grade][classType][group];
          const table = document.createElement('table');
          const headerRow = document.createElement('tr');

          // Create header row with days of the week
          const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
          headerRow.appendChild(document.createElement('th')); // Empty top-left cell
          daysOfWeek.forEach(day => {
              const th = document.createElement('th');
              th.textContent = day.charAt(0).toUpperCase() + day.slice(1);
              headerRow.appendChild(th);
          });
          table.appendChild(headerRow);

          // Iterate through groups and create rows for each class period
          for (let period = 0; period < times.length; period++) { // Use times array length for periods
              const row = document.createElement('tr');
              const periodCell = document.createElement('td');
              periodCell.textContent = times[period]; // Display the time for each period
              row.appendChild(periodCell);

              // Fill in subjects for each day
              daysOfWeek.forEach(day => {
                  const td = document.createElement('td');
                  td.textContent = classData[day][period] || ""; // Prevents undefined error
                  row.appendChild(td);
              });

              table.appendChild(row);
          }

          scheduleContainer.appendChild(table);
      }
        });
=======
>>>>>>> e89f0dba2cbd6a7e44d940647a2a436c5facda58
      });
    });