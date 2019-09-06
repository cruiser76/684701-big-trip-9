import Menu from './components/menu';
import FiltersForm from './components/filters-form';
import TripInfo from './components/trip-info';
import SortForm from './components/sort-form';
import DaysList from './components/days-list';
import DayItem from './components/day-item';
import EventsContainerElement from './components/event-container-element';
import EventCard from './components/event-card';
import EventForm from './components/event-form';
import {getPointsList, getFiltersData, getMenuData, getTripData} from './components/data';
import {render} from './components/utils';
import NoPointsMsg from './components/no-points-msg';

const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const infoContainer = document.querySelector(`.trip-main__trip-info`);
const contentContainer = document.querySelector(`.trip-events`);

const pointsList = getPointsList();

const menu = new Menu(getMenuData());
render(controlsContainer.querySelector(`h2`), menu.getElement(), `after`);

const filtersForm = new FiltersForm(getFiltersData());
render(controlsContainer, filtersForm.getElement(), `beforeend`);

if (pointsList.length > 0) {

  const tripInfo = new TripInfo(getTripData(pointsList));
  render(infoContainer, tripInfo.getElement(), `after`);

  const sortForm = new SortForm();
  render(contentContainer, sortForm.getElement(), `beforeend`);

  const daysList = new DaysList();
  render(contentContainer, daysList.getElement(), `beforeend`);

  const dayItem = new DayItem();
  const daysContainer = document.querySelector(`.trip-days`);
  render(daysContainer, dayItem.getElement(), `beforeend`);

  const eventsContainerElement = new EventsContainerElement();
  const day = document.querySelector(`.trip-days__item`);
  render(day, eventsContainerElement.getElement(), `beforeend`);

  const eventContainer = daysContainer.querySelector(`.trip-events__list`);
  pointsList.forEach((el) => {
    const point = new EventCard(el);
    const pointEdit = new EventForm(el);
    render(eventContainer, point.getElement(), `beforeend`);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        eventContainer.replaceChild(point.getElement(), pointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    point.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      eventContainer.replaceChild(pointEdit.getElement(), point.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    pointEdit.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      eventContainer.replaceChild(point.getElement(), pointEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    pointEdit.getElement()
    .querySelector(`.event__save-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      eventContainer.replaceChild(point.getElement(), pointEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  });

  const totalCost = () => {
    return pointsList.reduce((acc, el) => {
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
  const noPointsMsg = new NoPointsMsg();
  render(contentContainer, noPointsMsg.getElement(), `beforeend`);
}

