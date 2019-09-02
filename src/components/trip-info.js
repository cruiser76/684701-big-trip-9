export const getTripInfo = (tripData) => {
  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${tripData.title()}</h1>

  <p class="trip-info__dates">${tripData.date()}</p>
  </div>`;
};
