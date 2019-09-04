import {createElement} from "./utils";

export default class DayItem {
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
    return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">1</span>
      <time class="day__date" datetime="2019-03-18">MAR 18</time>
    </div>`;
  }

  removeElement() {
    this._element = undefined;
  }
}
