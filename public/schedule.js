async function getData() {
    const response = await fetch("data/schedule.json");
    const data = await response.json();
    return data;
}
// При обновлении страницы если выбрать класс который выбирал до этого сохраняет букву и группу, но не рендерит её и я хз почему
function createButtons(data) {
    
    const classGroups = ["1", "2"];
    const selectText = document.getElementById("current-schedule");
    const letterButtons = document.getElementById("letter-buttons");
    const groupButtons = document.getElementById("group-buttons");
    
    
    let selectedClass = localStorage.getItem("selectedClass") || "5";
    let selectedLetter = localStorage.getItem("selectedLetter") || "A";
    let selectedGroup = localStorage.getItem("selectedGroup") || "1";

    
    function saveSelection() {
        localStorage.setItem("selectedClass", selectedClass);
        localStorage.setItem("selectedLetter", selectedLetter);
        localStorage.setItem("selectedGroup", selectedGroup);
    }

    
    function updateSelectText() {
        if (selectedClass !== "10" && selectedLetter === "AE") {
            selectText.innerText = `${selectedClass}${selectedLetter}`;
        } else {
            selectText.innerText = `${selectedClass}${selectedLetter}-${selectedGroup}`;
        }
    }


    function renderClassButtons() {
        const classButtonsContainer = document.querySelector('.class-buttons');
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
            });

            classButtonsContainer.appendChild(button);
        }
    }

    
    function renderLetterAndGroupButtons() {
        letterButtons.innerHTML = "";
        groupButtons.innerHTML = "";

        const firstClassesLetters = Object.keys(data.first[selectedClass]);
        let secondClassesLetters = [];
        if (selectedClass !== "9") {
            secondClassesLetters = Object.keys(data.second[selectedClass]);
        }
        const classLetters = [...firstClassesLetters, ...secondClassesLetters].sort();

        
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
            });
            letterButtons.appendChild(letterButton);
        });

        renderGroupButtons();
    }

    
    function renderGroupButtons() {
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
            });
            groupButtons.appendChild(groupButton);
        });

        updateSelectText();
        createTable(data, selectedClass, selectedLetter, selectedGroup);
    }

    
    document.addEventListener("DOMContentLoaded", () => {
        renderClassButtons();
        updateSelectText();
        renderLetterAndGroupButtons();

        
        createTable(data, selectedClass, selectedLetter, selectedGroup);
    });

    document.querySelectorAll(".class-button").forEach((button) => {
        button.addEventListener("click", () => {
            
            const selectedClass = button.dataset.class;
            const firstClassesLetters = Object.keys(data.first[selectedClass]);
            let secondClassesLetters = [];
            if (selectedClass !== "9") {
                secondClassesLetters = Object.keys(data.second[selectedClass]);
            }
            const classLetters = [
                ...firstClassesLetters,
                ...secondClassesLetters,
            ].sort();
            letterButtons.innerHTML = "";
            groupButtons.innerHTML = "";
            if (classLetters.indexOf(selectedLetter) !== -1) {
                selectedLetter = selectedLetter;
            } else {
                selectedLetter = "A";
            }

            if (selectedClass !== "10" && selectedLetter === "AE") {
                selectText.innerText = `${selectedClass}${selectedLetter}`;
            } else {
                selectText.innerText = `${selectedClass}${selectedLetter}-${selectedGroup}`;
                classGroups.forEach((group) => {
                    const groupButton =
                        document.createElement("button");
                    groupButton.innerText = group;
                    groupButton.className = "group-button";
                    groupButtons.appendChild(groupButton);
                });
            }
            classLetters.forEach((letter) => {
                const letterButton = document.createElement("button");
                letterButton.innerText = letter;
                letterButton.className = "letter-button";
                letterButton.addEventListener("click", () => {
                    selectedLetter = letter;
                    if (selectedClass !== "10" && selectedLetter === "AE") {
                        selectText.innerText = `${selectedClass}${letter}`;
                    } else {
                        selectText.innerText = `${selectedClass}${letter}-${selectedGroup}`;
                    }
            
                    groupButtons.innerHTML = "";
                    if (selectedLetter !== "AE" || selectedClass === "10") {
                        classGroups.forEach((group) => {
                            const groupButton =
                                document.createElement("button");
                            groupButton.innerText = group;
                            groupButton.className = "group-button";
                            groupButtons.appendChild(groupButton);

                            groupButton.addEventListener("click", () => {
                                groupButtons.querySelectorAll('.group-button').forEach(btn => {
                                    btn.classList.remove('active');
                                });
                                groupButton.classList.add('active');
                                if (
                                    selectedClass !== "10" &&
                                    selectedLetter === "AE"
                                ) {
                                    selectText.innerText = `${selectedClass}${selectedLetter}`;
                                } else {
                                    selectText.innerText = `${selectedClass}${selectedLetter}-${group}`;
                                    selectedGroup = group;
                                    saveSelection();
                                }
                                createTable(
                                    data,
                                    selectedClass,
                                    selectedLetter,
                                    selectedGroup
                                );
                            });
                            
                        });
                    } else {
                        selectedGroup = "1";
                        saveSelection();
                    }
                    createTable(
                        data,
                        selectedClass,
                        selectedLetter,
                        selectedGroup
                    );
                });
                letterButtons.appendChild(letterButton);
                  
                  document.querySelectorAll('.button').forEach(row => {
                    row.addEventListener('click', event => {
                      const clickedButton = event.target;
                  
                      
                      if (clickedButton.classList.contains('class-button') ||
                          clickedButton.classList.contains('letter-button') ||
                          clickedButton.classList.contains('group-buttons')) {
                        
                        row.querySelectorAll('button').forEach(button => {
                          button.classList.remove('active');
                        });
                  
                        
                        clickedButton.classList.add('active');
                        
                      }
                    });
                  });
                  
            });
            createTable(data, selectedClass, selectedLetter, selectedGroup);
        });
    });
}
/*function createButtons(data) {
    let selectedLetter = "AE";
    let selectedGroup = "1";
    const classGroups = ["1", "2"];
    const selectText = document.getElementById("current-schedule");
    const letterButtons = document.getElementById("letter-buttons");
    const groupButtons = document.getElementById("group-buttons");

    document.querySelectorAll(".class-button").forEach(button => {
        button.addEventListener("click", () => {
            const selectedClass = button.dataset.class;
            updateClassLetters(data, selectedClass);
        });
    });

    function updateClassLetters(data, selectedClass) {
        const classLetters = getClassLetters(data, selectedClass);
        letterButtons.innerHTML = "";
        groupButtons.innerHTML = "";

        selectedLetter = classLetters.includes(selectedLetter) ? selectedLetter : "A";
        updateSelectText(selectedClass, selectedLetter, selectedGroup);

        classLetters.forEach(letter => {
            const letterButton = createButton(letter, () => handleLetterClick(data, selectedClass, letter));
            letterButtons.appendChild(letterButton);
        });

        createTable(data, selectedClass, selectedLetter, selectedGroup);
    }

    function getClassLetters(data, selectedClass) {
        const firstClassesLetters = Object.keys(data.first[selectedClass]);
        const secondClassesLetters = selectedClass !== "9" ? Object.keys(data.second[selectedClass]) : [];
        return [...firstClassesLetters, ...secondClassesLetters].sort();
    }

    function updateSelectText(selectedClass, letter, group) {
        selectText.innerText = selectedClass !== "10" && letter === "AE" ? `${selectedClass}${letter}` : `${selectedClass}${letter}-${group}`;
    }

    function handleLetterClick(data, selectedClass, letter) {
        selectedLetter = letter;
        updateSelectText(selectedClass, selectedLetter, selectedGroup);

        groupButtons.innerHTML = "";
        if (selectedLetter !== "AE" || selectedClass === "10") {
            classGroups.forEach(group => {
                const groupButton = createButton(group, () => handleGroupClick(data, selectedClass, selectedLetter, group));
                groupButtons.appendChild(groupButton);
            });
        } else {
            selectedGroup = "1";
        }

        createTable(data, selectedClass, selectedLetter, selectedGroup);
    }

    function handleGroupClick(data, selectedClass, letter, group) {
        selectedGroup = group;
        updateSelectText(selectedClass, letter, group);
        createTable(data, selectedClass, letter, group);
    }

    function createButton(text, onClick) {
        const button = document.createElement("button");
        button.innerText = text;
        button.addEventListener("click", onClick);
        return button;
    }
}
*/

function createTable(data, grade, letter, group) {
    let shift, timeOfLessons, tableRow, tableChild;
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
    const currentGradeData = JSON.stringify(data[shift][grade][letter][group])
        .replaceAll(" ",'')


    let table = `<custom-table data=${currentGradeData} timeOfLessons=${timeOfLessons}></custom-table>`;

    document.getElementById("schedule-table").innerHTML = table;
}
async function main() {
    const data = await getData();
    createButtons(data);
}
main();
