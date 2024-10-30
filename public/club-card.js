customElements.define('my-component',
    class extends HTMLElement {
      constructor() {
        super();

    let warning = `<h1 class="text">${this.getAttribute('name')}</h1>`
      this.innerHTML = warning;
    }
    });