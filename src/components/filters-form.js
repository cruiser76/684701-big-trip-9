import AbstractComponent from "./abstract-component";

export default class FiltersForm extends AbstractComponent {
  constructor(filtersData) {
    super();
    this._filtersData = filtersData;
  }

  getTemplate() {
    return `
    <form class="trip-filters" action="#" method="get">
      ${this._filtersData.map((el) => {
    return `
      <div class="trip-filters__filter">
      <input id="filter-${el.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${el.type}" ${el.checked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${el.type}">${el.title}</label>
      </div>
    `;
  }).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
  }

}
