customElements.define(
    "tbody-row",
    class Table extends HTMLElement {
        constructor() {
            super();

        
            const data = JSON.parse(this.getAttribute("data"));
            const num = this.getAttribute("numOfLesson");
            const time = this.getAttribute("time");
            const day = this.getAttribute("day");

            this.innerHTML = "";
            this.innerHTML += `<td>${num}</td>`;
            this.innerHTML += `<td>${time}</td>`;
            // this.innerHTML += `<td>${data[day][num]['subject']} | ${data[day][num]['room']}</td>`;
            // Что то типо такого разберись что делает таблица эта, и напиши также через компонент

      /* <table class="table w-9/12 text-lg text-center whitespace-pre-line">
      <thead>
      <tr class="text-lg bg-base-200">
          <th>N</th>
          <th>{{ $t("time") }}</th>
          <th :class="day == 1 ? 'active' : ''">{{ $t("monday") }}</th>
          <th :class="day == 2 ? 'active' : ''">{{ $t("tuesday") }}</th>
          <th :class="day == 3 ? 'active' : ''">{{ $t("wednesday") }}</th>
          <th :class="day == 4 ? 'active' : ''">{{ $t("thursday") }}</th>
          <th :class="day == 5 ? 'active' : ''">{{ $t("friday") }}</th>
      </tr>
  </thead>
  <tbody>
      <tr v-for="(items, index) in filteredData" :key="index">
          <th>{{ index + 1 }}</th>
          <th>{{ times[index] }}</th>
          <td v-for="(item, idx) in items" :key="idx">{{ item }}</td>
      </tr>
  </tbody>
</table>
*/
    }
}
);
