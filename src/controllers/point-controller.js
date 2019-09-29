import EventCard from '../components/event-card';
import EventForm from '../components/event-form';
import {render} from '../components/utils';
import {Offers, EventsList} from '../components/data';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export default class PointController {
  constructor(pointData, container, onDataChange, onChangeView) {
    this._pointData = pointData;
    this._eventCard = new EventCard(pointData);
    this._pointEdit = new EventForm(pointData);
    this._container = container;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._offers = Offers;
  }

  init() {
    flatpickr(this._pointEdit.getElement().querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._pointData.startDate,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      altFormat: `d/m/y H:i`
    });

    flatpickr(this._pointEdit.getElement().querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._pointData.endDate,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      altFormat: `d/m/y H:i`
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.getElement().replaceChild(this._eventCard.getElement(), this._pointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._eventCard.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onChangeView();
      this._container.getElement().replaceChild(this._pointEdit.getElement(), this._eventCard.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._pointEdit.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this._container.getElement().replaceChild(this._eventCard.getElement(), this._pointEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._pointEdit.getElement()
    .querySelector(`.event__save-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const formData = new FormData(this._pointEdit.getElement().querySelector(`.event--edit`));

      this._offers = this._offers.map((el) => {
        if (Array.from(formData.keys()).some((key) => key === `event-offer-${el.id}`)) {
          el.checked = true;
        }
        return el;
      });

      const entry = {
        eventItem: this._getEventItem(formData),
        description: this._getDescription(),
        startDate: this._changeTimeFormat(formData.get(`event-start-time`)),
        endDate: this._changeTimeFormat(formData.get(`event-end-time`)),
        cost: formData.get(`event-price`),
        offers: this._offers,
        images: this._getImages(),
        destination: formData.get(`event-destination`),
      };
      this._onDataChange(entry, this._pointData);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    render(this._container.getElement(), this._eventCard.getElement(), `beforeend`);
  }

  _changeTimeFormat(time) {
    const myExp = /[\D\s]/ig;
    time = time.replace(myExp, `,`).split(`,`);
    const year = time.splice(0, 3).reverse();
    year[0] = `20${year[0]}`;
    year[1] -= 1;
    const date = new Date(...year.concat(time));
    return date.getTime();
  }

  _getDescription() {
    return this._pointEdit.getElement().querySelector(`.event__destination-description`).textContent;
  }

  _getEventItem() {
    const eventType = this._pointEdit.getElement().querySelector(`.event__type-output`).textContent.trim().split(` `)[0].toLowerCase();
    const eventItem = EventsList.filter((el) => el.eventType === eventType);
    return eventItem[0];
  }

  _getImages() {
    let images = Array.from(this._pointEdit.getElement().querySelectorAll(`.event__photo`));
    images = images.map((el) => el.src);
    return images;
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._pointEdit.getElement())) {
      this._container.getElement().replaceChild(this._eventCard.getElement(), this._pointEdit.getElement());
    }
  }
}
