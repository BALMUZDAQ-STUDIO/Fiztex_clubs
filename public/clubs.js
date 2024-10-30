async function getData() {
    const response = await fetch("../data/clubs.json");
    const data = await response.json(); // Добавлен await перед response.json()
    return data; // Теперь возвращаем данные
}

async function main() {
    const data = await getData(); // Добавлено await для получения результата
    console.log(data);
}

main();