import AbstractComponent from "./abstract-component";

export default class EventsContainer extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<ul class="trip-events__list">
    </ul>`;
  }
}
