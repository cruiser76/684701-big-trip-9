import {createElement} from "./utils";

export default class EventsContainerElement {
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
    return `<ul class="trip-events__list">
    </ul>`;
  }

  removeElement() {
    this._element = undefined;
  }
}
