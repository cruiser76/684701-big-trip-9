import {createElement} from "./utils";

export default class TripInfo {
  constructor(tripData) {
    this._element = undefined;
    this._tripData = tripData;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._tripData.title()}</h1>

    <p class="trip-info__dates">${this._tripData.date()}</p>
    </div>`;
  }

  removeElement() {
    this._element = undefined;
  }
}
