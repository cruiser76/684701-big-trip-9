import {EventsList, getDescription} from "./data";
import AbstractComponent from "./abstract-component";

export default class EventForm extends AbstractComponent {
  constructor({images, description, offers, startDate, endDate, eventItem, cost, destination}) {
    super();
    this._images = images;
    this._destination = destination;
    this._description = description;
    this._offers = offers;
    this._startDate = new Date(startDate);
    this._endDate = new Date(endDate);
    this._eventItem = eventItem;
    this._cost = cost;
    this._eventsList = EventsList;
    this._subscribeOnEvents();
  }

  _getUcFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  _getEventTypeTemplate(groupType) {
    return this._eventsList.map((el) => {
      if (el.groupType === groupType) {
        return `<div class="event__type-item">
        <input id="event-type-${el.eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${el.eventType}">
        <label class="event__type-label  event__type-label--${el.eventType}" for="event-type-${el.eventType}-1">${this._getUcFirst(el.eventType)}</label>
        </div>`;
      }
      return ``;
    }).join(``);
  }

  _getOffersTemplate(offersData) {
    if (offersData) {
      return `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersData.map((el) => {
    return `
        <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${el.id}-1" type="checkbox" name="event-offer-${el.id}" ${el.checked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${el.id}-1">
          <span class="event__offer-title">${el.offerTitle}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${el.price}</span>
        </label>
        </div>`;
  }).join(``)}
      </div>
    </section>`;
    }
    return ``;
  }

  _getPhotos() {
    return this._images.map((el) => {
      return `<img class="event__photo" src=${el} alt="Event photo">`;
    }).join(``);
  }

  getTemplate() {
    return ` <li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src=${this._eventItem.eventIcon} alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${this._getEventTypeTemplate(`Transfer`)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${this._getEventTypeTemplate(`Activity`)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${this._eventItem.eventTitle}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${this._startDate.getDate()}/${this._startDate.getMonth() + 1}/${this._startDate.getFullYear().toString().slice(2)} ${this._startDate.getHours()}:${this._startDate.getMinutes()}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${this._endDate.getDate()}/${this._endDate.getMonth() + 1}/${this._endDate.getFullYear().toString().slice(2)} ${this._endDate.getHours()}:${this._endDate.getMinutes()}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._cost}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
      ${this._getOffersTemplate(this._offers)}
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${this._description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
      ${this._getPhotos()}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
  }

  _subscribeOnEvents() {
    this._onDestinationChange();
    this._onEventTypeChange();
  }

  _onEventTypeChange() {
    this.getElement().querySelector(`.event__type-list`)
    .addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `LABEL`) {
        return;
      }
      const eventType = evt.target.textContent.toLowerCase();
      const eventInfo = this._eventsList.filter((el) => el.eventType === eventType);
      this.getElement().querySelector(`.event__type-icon`).src = eventInfo[0].eventIcon;
      this.getElement().querySelector(`.event__type-output`).textContent = eventInfo[0].eventTitle;
    });
  }

  _onDestinationChange() {
    this.getElement().querySelector(`#event-destination-1`)
    .addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this.getElement().querySelector(`.event__destination-description`).innerHTML = getDescription();

    });
  }
}
