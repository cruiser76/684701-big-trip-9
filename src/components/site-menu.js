export const getMenu = (menuData) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${menuData.map((el) => {
    return `<a class="trip-tabs__btn ${el.active && `trip-tabs__btn--active`}" href="#">${el.title}</a>`;
  }).join(``)}
  </nav>`;
};
