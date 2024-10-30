async function getData() {
    const response = await fetch("../data/clubs.json");
    const data = await response.json();
    return data;
}

function createClubs(data) {
    const listClubs = Object.entries(data).map(item => {
        `<div class = "club-card"><club-card imgSrc = "${item['image']}" clubName = "${item['name']}" aboutClub = "${item['description']}"></club-card></div>`
    }).join(' ');
    document.getElementById('club-cards').innerHTML = listClubs;
    console.log(data);
}


async function main() {
    const data = await getData();
    console.log(data);
    await createClubs(data);
}
main();
