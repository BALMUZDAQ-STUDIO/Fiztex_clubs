async function getData() {
    const response = await fetch("data/clubs.json");
    const data = await response.json();
    return data;
}

function createClubs(data) {
    let listClubs = " ";
    for (let key in data) {
        let item = data[key];
        listClubs += `<div class="club-card">
                    <club-card imgSrc="${item.image}" 
                               clubName="${item.name}" 
                               aboutClub="${item.description}">
                    </club-card>
                </div>`;
    }

    document.getElementById("club-cards").innerHTML = listClubs;
    let savedTheme = localStorage.getItem("theme");
    
    function saveSelection() {
        localStorage.setItem("theme", savedTheme);
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
    changeThemeColor();
}

async function main() {
    const data = await getData();
    createClubs(data);
}
main();
