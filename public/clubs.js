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
                    <club-card imgSrc="${item.image}" clubName="${item.name}" aboutClub="${item.description}">
                    </club-card>
                </div>`;
    }

    document.getElementById("club-cards").innerHTML = listClubs;
}

async function main() {
    const data = await getData();
    console.log(data);
    createClubs(data);
}
main();
