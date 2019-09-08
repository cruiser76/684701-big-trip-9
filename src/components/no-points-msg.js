import AbstractComponent from "./abstract-component";

export default class NoPointsMsg extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
}
