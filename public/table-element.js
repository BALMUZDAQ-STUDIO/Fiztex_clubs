customElements.define(
    "custom-table",
    class extends HTMLElement {
        constructor() {
            super();
            this.render()

        }
        render() {
            // Сброс содержимого
            this.innerHTML = "";

            // Массив с днями
            const days = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ];

            // Получение атрибутов
            let data = JSON.parse(this.getAttribute("data"))

            const timeOfLessons = this.getAttribute("timeOfLessons").split(',');


            // Создаем таблицу
            const table = document.createElement("table");

            // Создаем заголовок таблицы
            const thead = `<thead>
            <tr>
                <th>N</th>
                <th>Время</th>
                <th>Понедельник</th>
                <th>Вторник</th>
                <th>Среда</th>
                <th>Четверг</th>
                <th>Пятница</th>
            </tr>
        </thead>`;


            // Создаем тело таблицы
            let tbody = "<tbody>";

            // Заполнение тела таблицы
            for (let index = 0; index < 7; index++) {
                tbody += `<tr><td>${index + 1}</td><td>${timeOfLessons[index]}</td>`;
                for(let day = 0; day<5;day++){
                    tbody+=`<td>${data[days[day]][index]["subject"]} | ${data[days[day]][index]["room"]}</td>`
                }

                tbody +='</tr>'

            }
            tbody +="</tbody"

            // Добавляем тело таблицы в таблицу

            // Добавляем таблицу в кастомный элемент
            table.innerHTML=`${thead}${tbody}`
            this.appendChild(table);
        }
    }
);


