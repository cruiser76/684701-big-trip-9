import {render} from './utils';
import Menu from "./menu";
import FiltersForm from './filters-form';
import {getMenuData, getFiltersData, getTripData, SortType} from './data';
import NoPointsMsg from './no-points-msg';
import TripInfo from './trip-info';
import SortForm from './sort-form';
import DaysList from './days-list';
import DayItem from './day-item';
import EventsContainer from './event-container';
import EventCard from './event-card';
import EventForm from './event-form';

export default class TripController {
  constructor(controlsContainer, infoContainer, contentContainer, pointsList) {
    this._controlsContainer = controlsContainer;
    this._infoContainer = infoContainer;
    this._contentContainer = contentContainer;
    this._pointsList = pointsList;
    this._menu = new Menu(getMenuData());
    this._filtersForm = new FiltersForm(getFiltersData());
    this._noPointsMsg = new NoPointsMsg();
    this._tripInfo = new TripInfo(getTripData(this._pointsList));
    this._sortForm = new SortForm();
    this._daysList = new DaysList();
    this._dayItem = new DayItem();
    this._eventsContainer = new EventsContainer();
  }

  init() {
    render(this._controlsContainer.querySelector(`h2`), this._menu.getElement(), `after`);
    render(this._controlsContainer, this._filtersForm.getElement(), `beforeend`);

    if (this._pointsList.length) {

      render(this._infoContainer, this._tripInfo.getElement(), `after`);
      render(this._contentContainer, this._sortForm.getElement(), `beforeend`);
      this._sortForm.getElement().addEventListener(`click`, (evt) => this._onSortButtonClick(evt));

      render(this._contentContainer, this._daysList.getElement(), `beforeend`);
      render(this._daysList.getElement(), this._dayItem.getElement(), `beforeend`);
      render(this._dayItem.getElement(), this._eventsContainer.getElement(), `beforeend`);

      this._pointsList.forEach((el) => {
        this._renderPoint(el);
      });

      const totalCost = () => {
        return this._pointsList.reduce((acc, el) => {
          acc += el.cost + el.offers.reduce((offersAcc, offersEl) => {
            offersAcc += offersEl.checked ? +offersEl.price : 0;
            return offersAcc;
          }, 0);
          return acc;
        }, 0);
      };
      const tripTotalCost = document.querySelector(`.trip-info__cost-value`);
      tripTotalCost.textContent = totalCost();
    } else {
      render(this._contentContainer, this._noPointsMsg.getElement(), `beforeend`);
    }
  }

  _renderPoint(el) {
    const point = new EventCard(el);
    const pointEdit = new EventForm(el);
    render(this._eventsContainer.getElement(), point.getElement(), `beforeend`);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._eventsContainer.getElement().replaceChild(point.getElement(), pointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    point.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._eventsContainer.getElement().replaceChild(pointEdit.getElement(), point.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    pointEdit.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._eventsContainer.getElement().replaceChild(point.getElement(), pointEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    pointEdit.getElement()
    .querySelector(`.event__save-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._eventsContainer.getElement().replaceChild(point.getElement(), pointEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  }

  _onSortButtonClick(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }
    this._eventsContainer.getElement().innerHTML = ``;
    this._daysList.getElement().querySelector(`.day__info`).innerHTML = ``;
    this._sortForm.getElement().querySelector(`.trip-sort__item--day`).innerHTML = ``;
    switch (evt.target.dataset.sortType) {
      case SortType.TIME_DOWN:
        const sortByTimePoints = this._pointsList.slice().sort((a, b) => ((b.endDate - b.startDate) - (a.endDate - a.startDate)));
        sortByTimePoints.forEach((point) => this._renderPoint(point));
        break;
      case SortType.PRICE_DOWN:
        const sortByPricePoints = this._pointsList.slice().sort((a, b) => (b.cost - a.cost));
        sortByPricePoints.forEach((point) => this._renderPoint(point));
        break;
      case SortType.DEFAULT:
        this._daysList.removeElement();
        this._dayItem.removeElement();
        render(this._contentContainer, this._daysList.getElement(), `beforeend`);
        render(this._daysList.getElement(), this._dayItem.getElement(), `beforeend`);
        render(this._dayItem.getElement(), this._eventsContainer.getElement(), `beforeend`);
        this._pointsList.forEach((point) => this._renderPoint(point));
        break;
    }
  }
}
