import {getMenu} from './components/site-menu';
import {getFiltersForm} from './components/site-filters';
import {getTripInfo} from './components/trip-info';
import {getSortForm} from './components/sort-form';
import {getDaysList} from './components/days-list';
import {getDayItem} from './components/day-item';
import {getEventForm} from './components/event-form';
import {getEventCard} from './components/event-card';
import {getPointsList, getFiltersData, getMenuData, getTripData} from './components/data';
import {getEventList} from './components/event-list';

const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const infoContainer = document.querySelector(`.trip-main__trip-info`);
const contentContainer = document.querySelector(`.trip-events`);

const renderMarkup = (container, markup, method = `beforeEnd`) => {
  container.insertAdjacentHTML(method, markup);
};


const pointsList = getPointsList();


renderMarkup(controlsContainer.querySelector(`h2`), getMenu(getMenuData()), `afterEnd`);
renderMarkup(controlsContainer, getFiltersForm(getFiltersData()));
renderMarkup(infoContainer, getTripInfo(getTripData(pointsList)), `afterBegin`);
renderMarkup(contentContainer, getSortForm());
renderMarkup(contentContainer, getDaysList());

const daysList = document.querySelector(`.trip-days`);
renderMarkup(daysList, getDayItem());

const dayItem = document.querySelector(`.trip-days__item`);
renderMarkup(dayItem, getEventList());

const eventList = daysList.querySelector(`.trip-events__list`);


pointsList.forEach((point, index) => {
  if (index === 0) {
    renderMarkup(eventList, getEventForm(point));
  } else {
    renderMarkup(eventList, getEventCard(point));
  }
});

const totalCost = pointsList.reduce((acc, el) => {
  acc += el.cost + el.offers.reduce((offersAcc, offersEl) => {
    offersAcc += offersEl.checked ? +offersEl.price : 0;
    return offersAcc;
  }, 0);
  return acc;
}, 0);

const tripTotalCost = document.querySelector(`.trip-info__cost-value`);
tripTotalCost.textContent = totalCost;
