async function getData() {
    const response = await fetch("data/schedule.json");
    const data = await response.json();
    return data;
}
function createButtons(data) {
    let selectedLetter = "A";
    let selectedGroup = "1";
    document.querySelectorAll('.class-button').forEach(button => {
        button.addEventListener("click", () => {
            const selectedClass = button.dataset.class;
            
            const firstClassesLetters = Object.keys(data.first[selectedClass]);
            let secondClassesLetters = [];
            if(selectedClass !== '9') {
                secondClassesLetters = Object.keys(data.second[selectedClass]);
            }

            const classLetters = [...firstClassesLetters, ...secondClassesLetters];
            const classGroups = ["1", "2"];
            const selectText = document.getElementById("current-schedule");

            const letterButtons = document.getElementById("letter-buttons"); 
            const groupButtons = document.getElementById("group-buttons");
            letterButtons.innerHTML = '';
            groupButtons.innerHTML = '';


            if(classLetters.indexOf(selectedLetter) !== -1) {
                selectedLetter = selectedLetter;
            } else {
                selectedLetter = "A";
            }
            
            if(selectedGroup === "2") {
                selectedGroup = selectedGroup;
            } else {
                selectedGroup = "1";
            }
            selectText.innerText = `${selectedClass}${selectedLetter}-${selectedGroup}`;
    

            classLetters.forEach(letter => {
                const letterButton = document.createElement("button");
                letterButton.innerText = letter;

                
                letterButton.addEventListener("click", () => {
                    selectText.innerText = `${selectedClass}${letter}-${selectedGroup}`;
                    selectedLetter = letter;
                })
                letterButtons.appendChild(letterButton);
            })
            
            groupButtons.innerHTML = '';
            classGroups.forEach(group => {
                const groupButton = document.createElement("button");
                groupButton.innerText = group;
                groupButtons.appendChild(groupButton);
                    
                groupButton.addEventListener("click", () => {
                    if(selectedClass !== "10" && selectedLetter === "AE") {
                        selectText.innerText = `${selectedClass}${selectedLetter}`;
                    } else {
                        selectText.innerText = `${selectedClass}${selectedLetter}-${group}`;
                        selectedGroup = group;
                    }
                    })
                })
            createTable(data, selectedClass, selectedLetter, selectedGroup);
            })
        });
    };

function createTable(data, Class, Letter, Group){
    let timeOfLessons;
    console.log(Object.keys(data.first[Class]))
    if(Object.keys(data.first[Class]).includes(Letter)) {
         timeOfLessons = [ 
            "8:00 - 8:40", "8:45 - 9:25", "9:35 - 10:15",
            "10:20 - 11:00", "11:15 - 11:55", "12:05 - 12:45",
            "12:50 - 13:30"
        ];
    } else {
        timeOfLessons = [
            "14:00 - 14:40", "14:45 - 15:25", "15:35 - 16:15",
            "16:20 - 17:00", "17:15 - 17:55", "18:05 - 18:45",
            "18:50 - 19:30"
        ];
    }
    console.log("Начало первого урока для вашей смены: ", timeOfLessons[0]);
}
async function main() {
    const data = await getData();
    createButtons(data);
}
main();
