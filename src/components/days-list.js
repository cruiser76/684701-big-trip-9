import {createElement} from "./utils";

export default class DaysList {
  constructor() {
    this._element = undefined;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<ul class="trip-days">
    </ul>`;
  }

  removeElement() {
    this._element = undefined;
  }
}
