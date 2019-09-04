import {createElement} from "./utils";

export default class Menu {
  constructor(menuData) {
    this._element = undefined;
    this._menuData = menuData;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
  ${this._menuData.map((el) => {
    return `<a class="trip-tabs__btn ${el.active && `trip-tabs__btn--active`}" href="#">${el.title}</a>`;
  }).join(``)}
  </nav>`;
  }

  removeElement() {
    this._element = undefined;
  }
}
