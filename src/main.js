import {getPointsList, getMenuData, getFiltersData} from './components/data';
import TripController from './controllers/trip-controller';
import Statistics from './components/stats';
import {render} from './components/utils';
import Menu from './components/menu';
import FiltersForm from './components/filters-form';

const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const infoContainer = document.querySelector(`.trip-main__trip-info`);
const contentContainer = document.querySelector(`.trip-events`);

const pointsList = getPointsList();

const menu = new Menu(getMenuData());
render(controlsContainer.querySelector(`h2`), menu.getElement(), `after`);

const filtersForm = new FiltersForm(getFiltersData());
render(controlsContainer, filtersForm.getElement(), `beforeend`);

const tripController = new TripController(controlsContainer, infoContainer, contentContainer, pointsList);
tripController.init();

const stats = new Statistics();
render(contentContainer, stats.getElement(), `after`);

menu.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `A`) {
    return;
  }
  evt.target.classList.add(`trip-tabs__btn--active`);

  switch (evt.target.id) {
    case `control__table`:
      stats.getElement().classList.add(`visually-hidden`);
      menu.getElement().querySelector(`#control__stats`).classList.remove(`trip-tabs__btn--active`);
      tripController.show();


      break;
    case `control__stats`:
      tripController.hide();
      stats.getElement().classList.remove(`visually-hidden`);
      menu.getElement().querySelector(`#control__table`).classList.remove(`trip-tabs__btn--active`);
      break;
  }
});

const newPointBtn = document.querySelector(`.trip-main__event-add-btn`);
newPointBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripController.createPoint();
});
