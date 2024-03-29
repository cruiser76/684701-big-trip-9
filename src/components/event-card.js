import AbstractComponent from './abstract-component';
import moment from 'moment';

export default class EventCard extends AbstractComponent {
  constructor({eventItem, startDate, endDate, cost, offers, destination}) {
    super();
    this._eventItem = eventItem;
    this._startDate = moment(startDate);
    this._endDate = moment(endDate);
    this._cost = cost;
    this._offers = offers;
    this._duration = this._getDuration(this._endDate.diff(this._startDate));
    this._destination = destination;
  }

  _getDuration(timeInterval) {
    let days = Math.ceil(Math.floor(timeInterval / (24 * 3600000)));
    let hours = Math.floor((timeInterval % 86400000) / 3600000);
    let minutes = Math.round(((timeInterval % 86400000) % 3600000) / 60000);
    return {days, hours, minutes};
  }

  getTemplate() {
    return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src=${this._eventItem.eventIcon} alt="Event type icon">
      </div>
      <h3 class="event__title">${this._eventItem.eventTitle}${this._destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${this._startDate.format(`HH:mm`)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${this._endDate.format(`HH:mm`)}</time>
        </p>
        <p class="event__duration">${this._duration.days}D ${this._duration.hours}H ${this._duration.minutes}M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${this._cost}</span>
      </p>

      ${this._offers.some((el) => el.checked) ? `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${this._offers.map((el) => {
    return el.checked ? `<li class="event__offer">
          <span class="event__offer-title">${el.offerTitle}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${el.price}</span>
         </li>` : ``;
  }).join(``)}</ul>` : ``}


      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
  }
}
