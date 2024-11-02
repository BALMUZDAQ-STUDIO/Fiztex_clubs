async function getData() {
    const response = await fetch("data/schedule.json");
    const data = await response.json();
    return data;
}

function initializeSchedule(data) {
    const classGroups = ["1", "2"];
    const selectText = document.getElementById("current-schedule");
    const letterButtons = document.getElementById("letter-buttons");
    const groupButtons = document.getElementById("group-buttons");

    let selectedClass = localStorage.getItem("selectedClass") || "5";
    let selectedLetter = localStorage.getItem("selectedLetter") || "A";
    let selectedGroup = localStorage.getItem("selectedGroup") || "1";
    let savedTheme = localStorage.getItem("theme");

    function saveSelection() {
        localStorage.setItem("selectedClass", selectedClass);
        localStorage.setItem("selectedLetter", selectedLetter);
        localStorage.setItem("selectedGroup", selectedGroup);
        localStorage.setItem("theme", savedTheme);
    }

    function updateSelectText() {
        selectText.innerText =
            selectedClass !== "10" && selectedLetter === "AE"
                ? `${selectedClass}${selectedLetter}`
                : `${selectedClass}${selectedLetter}-${selectedGroup}`;
    }

    function renderClassButtons() {
        const classButtonsContainer = document.querySelector(".class-buttons");
        classButtonsContainer.innerHTML = "";

        for (let i = 5; i <= 10; i++) {
            const button = document.createElement("button");

            button.innerText = i;
            button.className = "class-button";
            button.dataset.class = i;

            if (i.toString() === selectedClass) {
                button.classList.add("active");
            }

            button.addEventListener("click", () => {
                selectedClass = i.toString();
                saveSelection();
                updateSelectText();
                renderLetterAndGroupButtons();
                setActiveButton(classButtonsContainer, button);
            });

            classButtonsContainer.appendChild(button);
        }
    }

    function renderLetterAndGroupButtons() {
        letterButtons.innerHTML = "";
        groupButtons.innerHTML = "";
        const firstClassesLetters = Object.keys(data.first[selectedClass]);
        const secondClassesLetters =
            selectedClass !== "9"
                ? Object.keys(data.second[selectedClass])
                : [];
        const classLetters = [
            ...firstClassesLetters,
            ...secondClassesLetters,
        ].sort();

        if (classLetters.indexOf(selectedLetter) === -1) {
            selectedLetter = "A";
        }

        classLetters.forEach((letter) => {
            const letterButton = document.createElement("button");
            letterButton.innerText = letter;
            letterButton.className = "letter-button";
            if (letter === selectedLetter) {
                letterButton.classList.add("active");
            }
            letterButton.addEventListener("click", () => {
                selectedLetter = letter;
                saveSelection();
                updateSelectText();
                renderGroupButtons();
                setActiveButton(letterButtons, letterButton);
            });
            letterButtons.appendChild(letterButton);
        });

        renderGroupButtons();
    }

    function renderGroupButtons() {
        groupButtons.innerHTML = "";
        const isSingleGroup = selectedLetter === "AE" && selectedClass !== "10";
        if (isSingleGroup) {
            selectedGroup = "1";
        }

        classGroups.forEach((group) => {
            const groupButton = document.createElement("button");
            groupButton.innerText = group;
            groupButton.className = "group-button";
            if (group === selectedGroup) {
                groupButton.classList.add("active");
            }
            groupButton.addEventListener("click", () => {
                selectedGroup = group;
                saveSelection();
                updateSelectText();
                createTable(data, selectedClass, selectedLetter, selectedGroup);
                setActiveButton(groupButtons, groupButton);
            });
            groupButtons.appendChild(groupButton);
        });

        updateSelectText();
        createTable(data, selectedClass, selectedLetter, selectedGroup);
    }

    function setActiveButton(container, activeButton) {
        container.querySelectorAll("button").forEach((button) => {
            button.classList.remove("active");
        });
        activeButton.classList.add("active");
    }
    function changeThemeColor() {
        const themeToggle = document.getElementById("theme-toggle");
        const body = document.body;

        if (savedTheme === "dark") {
            body.classList.add("dark-theme");
        }

        themeToggle.addEventListener("click", (e) => {
            e.preventDefault();
            body.classList.toggle("dark-theme");
        
            if (body.classList.contains("dark-theme")) {
                savedTheme = "dark";
                saveSelection();
            } else {
                savedTheme = "light";
                saveSelection();
            }
        });
    }
    renderClassButtons();
    renderLetterAndGroupButtons();
    updateSelectText();
    changeThemeColor();
    createTable(data, selectedClass, selectedLetter, selectedGroup);
}
function createTable(data, grade, letter, group) {
    let shift, timeOfLessons;
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    if (Object.keys(data.first[grade]).includes(letter)) {
        shift = "first";
    } else {
        shift = "second";
    }

    if (shift === "first") {
        timeOfLessons =
            "8:00-8:40,8:45-9:25,9:35-10:15,10:20-11:00,11:15-11:55,12:05-12:45,12:50-13:30";
    } else {
        timeOfLessons =
            "14:00-14:40,14:45-15:25,15:35-16:15,16:20-17:00,17:15-17:55,18:05-18:45,18:50-19:30";
    }
    const currentGradeData = JSON.stringify(
        data[shift][grade][letter][group]
    ).replaceAll(" ", "");

    let table = `<custom-table data=${currentGradeData} timeOfLessons=${timeOfLessons}></custom-table>`;

    document.getElementById("schedule-table").innerHTML = table;
}
async function main() {
    const data = await getData();
    initializeSchedule(data);
}



main();
