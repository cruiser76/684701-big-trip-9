import AbstractComponent from "./abstract-component";

export default class DayItem extends AbstractComponent {
  constructor({day, month, count}) {
    super();
    this._day = day;
    this._month = month;
    this._count = count;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${this._count}</span>
      <time class="day__date" datetime="2019-03-18">${this._month} ${this._day}</time>
    </div>
    </li>`;
  }
}
