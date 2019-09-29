import {render} from '../components/utils';
import Menu from "../components/menu";
import FiltersForm from '../components/filters-form';
import {getMenuData, getFiltersData, getTripData, SortType, Months} from '../components/data';
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
    this._menu = new Menu(getMenuData());
    this._filtersForm = new FiltersForm(getFiltersData());
    this._noPointsMsg = new NoPointsMsg();
    this._tripInfo = new TripInfo(getTripData(this._pointsList));
    this._sortForm = new SortForm();
    this._daysContainer = new DaysContainer();
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._subscriptions = [];
  }

  init() {
    render(this._controlsContainer.querySelector(`h2`), this._menu.getElement(), `after`);
    render(this._controlsContainer, this._filtersForm.getElement(), `beforeend`);

    if (this._pointsList.length) {

      render(this._infoContainer, this._tripInfo.getElement(), `after`);
      render(this._contentContainer, this._sortForm.getElement(), `beforeend`);
      this._sortForm.getElement().addEventListener(`click`, (evt) => this._onSortButtonClick(evt));

      render(this._contentContainer, this._daysContainer.getElement(), `beforeend`);


      this._daysList.forEach((day) => {
        this._renderDay(day);
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
    this._pointsList[this._pointsList.findIndex((it) => it === oldData)] = newData;
    this._sortPoints(this._pointsList);
    this._daysContainer.getElement().innerHTML = ``;
    this._daysList = this._getDaysList();
    this._daysList.forEach((day) => {
      this._renderDay(day);
    });
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
}
