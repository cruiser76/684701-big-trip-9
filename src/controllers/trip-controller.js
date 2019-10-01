import {render, unrender} from '../components/utils';
import {getTripData, SortType, Months, Offers, EventsList} from '../components/data';
import NoPointsMsg from '../components/no-points-msg';
import TripInfo from '../components/trip-info';
import SortForm from '../components/sort-form';
import DaysContainer from '../components/days-container';
import DayItem from '../components/day-item';
import EventsContainer from '../components/event-container';
import PointController from './point-controller';

export default class TripController {
  constructor(controlsContainer, infoContainer, contentContainer, pointsList) {
    this._controlsContainer = controlsContainer;
    this._infoContainer = infoContainer;
    this._contentContainer = contentContainer;
    this._pointsList = this._sortPoints(pointsList);
    this._daysList = this._getDaysList();
    this._noPointsMsg = new NoPointsMsg();
    this._tripInfo = new TripInfo(getTripData(this._pointsList));
    this._sortForm = new SortForm();
    this._daysContainer = new DaysContainer();
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._subscriptions = [];
  }

  init() {
    this._setInfo();
    this._setSortPanel();
    this._setContentContainer();
    this._setTotalCost();
  }

  _setContentContainer() {
    unrender(this._daysContainer.getElement());
    this._daysContainer.removeElement();
    if (this._pointsList.length) {
      render(this._contentContainer, this._daysContainer.getElement(), `beforeend`);
      this._daysList.forEach((day) => {
        this._renderDay(day);
      });

    } else {
      render(this._contentContainer, this._noPointsMsg.getElement(), `beforeend`);
    }
  }

  _setSortPanel() {
    unrender(this._sortForm.getElement());
    this._sortForm.removeElement();
    if (this._pointsList.length) {
      render(this._contentContainer, this._sortForm.getElement(), `beforeend`);
      this._sortForm.getElement().addEventListener(`click`, (evt) => this._onSortButtonClick(evt));
    }
  }

  _setInfo() {
    unrender(this._tripInfo.getElement());
    this._tripInfo.removeElement();
    if (this._pointsList.length) {
      render(this._infoContainer, this._tripInfo.getElement(), `after`);
    }
  }

  _setTotalCost() {
    const totalCost = () => {
      return this._pointsList.reduce((acc, el) => {
        acc += +el.cost + el.offers.reduce((offersAcc, offersEl) => {
          offersAcc += offersEl.checked ? +offersEl.price : 0;
          return offersAcc;
        }, 0);
        return acc;
      }, 0);
    };
    const tripTotalCost = document.querySelector(`.trip-info__cost-value`);
    tripTotalCost.textContent = totalCost();
  }

  show() {
    this._contentContainer.classList.remove(`visually-hidden`);
  }

  hide() {
    this._contentContainer.classList.add(`visually-hidden`);
  }

  createPoint() {
    const defaultPoint = {
      eventItem: EventsList[0],
      description: ``,
      startDate: new Date(),
      endDate: new Date(),
      cost: 0,
      offers: Offers.slice().map((el) => Object.assign({}, el)),
      images: [],
      destination: ``,
    };
    if (!this._daysContainer._element) {
      this._contentContainer.innerHTML = ``;
      render(this._contentContainer, this._daysContainer.getElement(), `beforeend`);
    }
    const newPoint = new PointController(defaultPoint, this._daysContainer, this._onDataChange, this._onChangeView, `adding`);
    newPoint.init();
  }

  _sortPoints(points) {
    return points.sort((a, b) => {
      return a.startDate - b.startDate;
    });
  }

  _renderDay(day) {
    const dayItem = new DayItem(day);
    const eventsContainer = new EventsContainer();
    render(this._daysContainer.getElement(), dayItem.getElement(), `beforeend`);
    render(dayItem.getElement(), eventsContainer.getElement(), `beforeend`);

    this._pointsList.forEach((el) => {
      if (new Date(el.startDate).getDate() === day.day && Months[new Date(el.startDate).getMonth()].slice(0, 3) === day.month) {
        const pointController = new PointController(el, eventsContainer, this._onDataChange, this._onChangeView);
        pointController.init();
        this._subscriptions.push(pointController.setDefaultView.bind(pointController));
      }
    });
  }

  // сортировка
  _onSortButtonClick(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }
    this._daysContainer.getElement().innerHTML = ``;
    this._sortForm.getElement().querySelector(`.trip-sort__item--day`).innerHTML = ``;
    const emptyDayDate = {
      day: ``,
      month: ``,
      count: ``
    };
    const dayItem = new DayItem(emptyDayDate);
    const eventsContainer = new EventsContainer();

    switch (evt.target.dataset.sortType) {
      case SortType.TIME_DOWN:
        render(this._daysContainer.getElement(), dayItem.getElement(), `beforeend`);
        render(dayItem.getElement(), eventsContainer.getElement(), `beforeend`);
        const sortByTimePoints = this._pointsList.slice().sort((a, b) => ((b.endDate - b.startDate) - (a.endDate - a.startDate)));
        sortByTimePoints.forEach((point) => {
          const pointController = new PointController(point, eventsContainer, this._onDataChange, this._onChangeView);
          pointController.init();
        });
        break;
      case SortType.PRICE_DOWN:
        render(this._daysContainer.getElement(), dayItem.getElement(), `beforeend`);
        render(dayItem.getElement(), eventsContainer.getElement(), `beforeend`);
        const sortByPricePoints = this._pointsList.slice().sort((a, b) => (b.cost - a.cost));
        sortByPricePoints.forEach((point) => {
          const pointController = new PointController(point, eventsContainer, this._onDataChange, this._onChangeView);
          pointController.init();
        });
        break;
      case SortType.DEFAULT:
        this._sortForm.getElement().querySelector(`.trip-sort__item--day`).innerHTML = `DAY`;
        this._daysList = this._getDaysList();
        this._daysList.forEach((day) => {
          this._renderDay(day);
        });
        break;
    }
  }

  // делаем массив не повторяющихся дней с месяцами
  _getDaysList() {
    const daysList = this._pointsList
    .map((el, index) => {
      return {
        day: new Date(el.startDate).getDate(),
        month: Months[new Date(el.startDate).getMonth()].slice(0, 3),
        count: (1 + Math.floor((this._getDayBegin(this._pointsList[index].startDate) - this._getDayBegin(this._pointsList[0].startDate)) / 86400000)),
      };
    });

    return Array.from(new Set(daysList.map(JSON.stringify))).map(JSON.parse);
    // new Set(daysList.map(JSON.stringify)) создает Set объект, использующий строковые элементы массива объектов точек.
    // Set object гарантирует, что каждый элемент уникален, причем без потери сортировки.
    // затем я создаю массив на основе элементов созданного набора с помощью Array.from.
    // наконец, я использую JSON.parse для преобразования строкового элемента обратно в объект.
  }

  // приводим дату к началу дня, иначе поиск разницы дней глючит
  _getDayBegin(day) {
    const daydate = new Date(day);
    return new Date(daydate.getFullYear(), daydate.getMonth(), daydate.getDate());
  }

  _onDataChange(newData, oldData) {
    if (newData === null) {
      this._pointsList.splice(this._pointsList.findIndex((it) => it === oldData), 1);
    } else if (oldData === null) {
      this._pointsList.unshift(newData);
    } else {
      this._pointsList[this._pointsList.findIndex((it) => it === oldData)] = newData;
    }

    this._pointsList = this._sortPoints(this._pointsList);
    this._daysList = this._getDaysList();
    this.init();
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
}
