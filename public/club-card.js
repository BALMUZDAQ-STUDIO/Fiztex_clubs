customElements.define('club-card',
    class extends HTMLElement {
      constructor() {
        super();
        let image = `<img src="${this.getAttribute('imgSrc')}" alt = "logotype" class = "image">`
        let clubName = `<h1 class="text">${this.getAttribute('clubName')}</h1>`
        let about = `<p class = "about-club">${this.getAttribute('aboutClub')}</p>`
        let whatsappLink = `<a class = "links">${this.getAttribute('whatsappLink')}</a>`
        let discordLink = `<a class = "links">${this.getAttribute('discordLink')}</a>`
        this.innerHTML = "";
        this.innerHTML += image;
        this.innerHTML += clubName;
        this.innerHTML += about;
    }
});