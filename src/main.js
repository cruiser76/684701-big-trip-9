import {getMenu} from './components/site-menu';
import {getFiltersForm} from './components/site-filters';
import {getTripInfo} from './components/trip-info';
import {getSortForm} from './components/sort-form';
import {getDaysList} from './components/days-list';
import {getDayItem} from './components/day-item';
import {getEventForm} from './components/event-form';
import {getEventCard} from './components/event-card';

const CARDS_COUNT = 3;
const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const infoContainer = document.querySelector(`.trip-main__trip-info`);
const contentContainer = document.querySelector(`.trip-events`);

const renderMarkup = (container, markup, method = `beforeEnd`) => {
  container.insertAdjacentHTML(method, markup);
};

renderMarkup(controlsContainer.querySelector(`h2`), getMenu(), `afterEnd`);
renderMarkup(controlsContainer, getFiltersForm());
renderMarkup(infoContainer, getTripInfo(), `afterBegin`);
renderMarkup(contentContainer, getSortForm());
renderMarkup(contentContainer, getDaysList());

const daysList = document.querySelector(`.trip-days`);
renderMarkup(daysList, getDayItem());

const eventList = daysList.querySelector(`.trip-events__list`);
renderMarkup(eventList, getEventForm());

for (let i = 1; i <= CARDS_COUNT; i += 1) {
  renderMarkup(eventList, getEventCard());
}
