import {getMenu} from './components/site-menu';
import {getFilters} from './components/site-filters';
import {getTrip} from './components/trip-info';
import {getSort} from './components/trip-sort';
import {getDaysList} from './components/days-list';
import {getDayItem} from './components/day-item';
import {getEventEdit} from './components/event-edit';
import {getEventCard} from './components/event-card';

const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const infoContainer = document.querySelector(`.trip-main__trip-info`);
const contentContainer = document.querySelector(`.trip-events`);

const renderMarkup = (container, markup, method = `beforeEnd`) => {
  container.insertAdjacentHTML(method, markup);
};

renderMarkup(controlsContainer.querySelector(`h2`), getMenu(), `afterEnd`);
renderMarkup(controlsContainer, getFilters());
renderMarkup(infoContainer, getTrip(), `afterBegin`);
renderMarkup(contentContainer, getSort());
renderMarkup(contentContainer, getDaysList());

const daysList = document.querySelector(`.trip-days`);
renderMarkup(daysList, getDayItem());

const eventList = daysList.querySelector(`.trip-events__list`);
renderMarkup(eventList, getEventEdit());

new Array(3).fill(``).forEach(() => {
  renderMarkup(eventList, getEventCard());
});
