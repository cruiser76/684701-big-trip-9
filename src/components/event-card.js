import {getDuration} from './utils';

export const getEventCard = ({event, startDate, endDate, cost, offers}) => {
  let date = new Date(startDate);
  let targetDate = new Date(endDate);
  let duration = getDuration(targetDate - date);
  return `<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src=${event.eventIcon} alt="Event type icon">
    </div>
    <h3 class="event__title">${event.eventTitle}${event.destination}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${date.getHours()}:${date.getMinutes()}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${targetDate.getHours()}:${targetDate.getMinutes()}</time>
      </p>
      <p class="event__duration">${duration.days ? `${duration.days}D ` : ``}${duration.hours ? `${duration.hours}H ` : ``}${duration.minutes}M</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${cost}</span>
    </p>

    ${offers.some((el) => el.checked) ? `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${offers.map((el) => {
    return el.checked ? `<li class="event__offer">
        <span class="event__offer-title">${el.offerTitle}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${el.price}</span>
       </li>` : ``;
  }).join(``)}</ul>` : ``}


    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};
