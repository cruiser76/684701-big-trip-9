import {getPointsList} from './components/data';
import TripController from './components/trip-controller';

const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const infoContainer = document.querySelector(`.trip-main__trip-info`);
const contentContainer = document.querySelector(`.trip-events`);

const pointsList = getPointsList();

const tripController = new TripController(controlsContainer, infoContainer, contentContainer, pointsList);
tripController.init();
