import AbstractComponent from "./abstract-component";

export default class TripInfo extends AbstractComponent {
  constructor(tripData) {
    super();
    this._tripData = tripData;
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._tripData.title()}</h1>

    <p class="trip-info__dates">${this._tripData.date()}</p>
    </div>`;
  }
}
