async function getData() {
    const response = await fetch("data/schedule.json");
    const data = await response.json();
    return data;
}
function createButtons(data) {
    let selectedLetter = "AE";
    let selectedGroup = "1";
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
            ];
            const classGroups = ["1", "2"];
            const selectText = document.getElementById("current-schedule");

            const letterButtons = document.getElementById("letter-buttons");
            const groupButtons = document.getElementById("group-buttons");
            letterButtons.innerHTML = "";
            groupButtons.innerHTML = "";

            if (classLetters.indexOf(selectedLetter) !== -1) {
                selectedLetter = selectedLetter;
            } else {
                selectedLetter = "AE";
            }

            if (selectedGroup === "2") {
                selectedGroup = selectedGroup;
            } else {
                selectedGroup = "1";
            }

            if (selectedClass !== "10" && selectedLetter === "AE") {
                selectText.innerText = `${selectedClass}${selectedLetter}`;
            } else {
                selectText.innerText = `${selectedClass}${selectedLetter}-${selectedGroup}`;
            }

            classLetters.forEach((letter) => {
                const letterButton = document.createElement("button");
                letterButton.innerText = letter;
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
                            groupButtons.appendChild(groupButton);

                            groupButton.addEventListener("click", () => {
                                if (
                                    selectedClass !== "10" &&
                                    selectedLetter === "AE"
                                ) {
                                    selectText.innerText = `${selectedClass}${selectedLetter}`;
                                } else {
                                    selectText.innerText = `${selectedClass}${selectedLetter}-${group}`;
                                    selectedGroup = group;
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
                    }
                    createTable(
                        data,
                        selectedClass,
                        selectedLetter,
                        selectedGroup
                    );
                });
                letterButtons.appendChild(letterButton);
            });
            createTable(data, selectedClass, selectedLetter, selectedGroup);
        });
    });
}

function createTable(data, grade, letter, group) {
    console.log(Object.keys(data.first[grade]));
    let shift, timeOfLessons;
    if (Object.keys(data.first[grade]).includes(letter)) {
        shift = "first";
    } else {
        shift = "second";
    }

    if (shift === "first") {
        timeOfLessons = [
            "8:00 - 8:40",
            "8:45 - 9:25",
            "9:35 - 10:15",
            "10:20 - 11:00",
            "11:15 - 11:55",
            "12:05 - 12:45",
            "12:50 - 13:30",
        ];
    } else {
        timeOfLessons = [
            "14:00 - 14:40",
            "14:45 - 15:25",
            "15:35 - 16:15",
            "16:20 - 17:00",
            "17:15 - 17:55",
            "18:05 - 18:45",
            "18:50 - 19:30",
        ];
    }
    console.log("Начало первого урока для вашей смены: ", timeOfLessons[0]);
    console.log(data[shift][grade][letter][group]);
    const currentGradeData = data[shift][grade][letter][group];
    const table = document.getElementById("schedule-table");
    table.innerHTML = "";
    for (let day in currentGradeData) {
        console.log(currentGradeData[day]);
        for (let i in currentGradeData[day]) {
            console.log(currentGradeData[day][i]);
            table.innerHTML += currentGradeData[day][i]["subject"];
            table.innerHTML += currentGradeData[day][i]["room"];
            table.innerHTML += "    ";
            table.innerHTML += "<br>";
        }
        table.innerHTML += "<br>";
        table.innerHTML += "<br>";
        table.innerHTML += "<br>";
    }
}

async function main() {
    const data = await getData();
    createButtons(data);
}
main();
