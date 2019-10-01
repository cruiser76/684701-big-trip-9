import AbstractComponent from "./abstract-component";

export default class Menu extends AbstractComponent {
  constructor(menuData) {
    super();
    this._menuData = menuData;
  }

  getTemplate() {
    return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
  ${this._menuData.map((el) => {
    return `<a class="trip-tabs__btn ${el.active && `trip-tabs__btn--active`}" id="control__${el.title.toLowerCase()}"  href="#">${el.title}</a>`;
  }).join(``)}
  </nav>`;
  }
}
