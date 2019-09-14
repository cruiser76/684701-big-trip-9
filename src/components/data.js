import {getRandomNumber, getRandomValue} from './utils';

let startDate = 0;
let endDate = Date.now() + getRandomNumber(0, 24 * 3600 * 1000);

export const SortType = {
  TIME_DOWN: `time-down`,
  PRICE_DOWN: `price-down`,
  DEFAULT: `default`
};

const PointsOfDestination = [
  `Geneva`,
  `Amsterdam`,
  `Saint Petersburg`,
  `Chamonix`
];

export const Months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const getImages = () => {
  const NUMBER_OF_IMAGES = 5;
  const imgList = [];
  for (let i = 0; i < NUMBER_OF_IMAGES; i += 1) {
    imgList[i] = `http://picsum.photos/300/150?r=${Math.random()}`;
  }
  return imgList;
};

export const EventsList = [
  {
    eventTitle: `Taxi to `,
    eventIcon: `img/icons/taxi.png`,
    eventType: `taxi`,
    groupType: `Transfer`
  },
  {
    eventTitle: `Bus to `,
    eventIcon: `img/icons/bus.png`,
    eventType: `bus`,
    groupType: `Transfer`
  },
  {
    eventTitle: `Drive to `,
    eventIcon: `img/icons/drive.png`,
    eventType: `drive`,
    groupType: `Transfer`
  },
  {
    eventTitle: `Restaurant in `,
    eventIcon: `img/icons/restaurant.png`,
    eventType: `restaurant`,
    groupType: `Activity`
  },
  {
    eventTitle: `Ship to `,
    eventIcon: `img/icons/ship.png`,
    eventType: `ship`,
    groupType: `Transfer`
  },
  {
    eventTitle: `Sightseeing in `,
    eventIcon: `img/icons/sightseeing.png`,
    eventType: `sightseeing`,
    groupType: `Activity`
  },
  {
    eventTitle: `Train to `,
    eventIcon: `img/icons/train.png`,
    eventType: `train`,
    groupType: `Transfer`
  },
  {
    eventTitle: `Transport to `,
    eventIcon: `img/icons/transport.png`,
    eventType: `transport`,
    groupType: `Transfer`
  },
  {
    eventTitle: `Check-in `,
    eventIcon: `img/icons/check-in.png`,
    eventType: `check-in`,
    groupType: `Activity`
  },
];

export const Offers = [
  {
    offerTitle: `Add luggage`,
    price: `10`,
    checked: false,
    id: `luggage`
  },
  {
    offerTitle: `Switch to comfort class`,
    price: `150`,
    checked: false,
    id: `comfort`
  },
  {
    offerTitle: `Add meal`,
    price: `2`,
    checked: false,
    id: `meal`
  },
  {
    offerTitle: `Choose seats`,
    price: `9`,
    checked: false,
    id: `seats`
  },
];

const getOffersList = () => {
  const offersList = Offers.map((el) => Object.assign({}, el));
  for (let i = 0; i < getRandomNumber(0, 3); i += 1) {
    offersList[getRandomNumber(0, 4)].checked = true;
  }
  return offersList;
};

export const getDescription = () => {
  const str = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis.
  Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus.
  In rutrum ac purus sit amet tempus.`;

  const strLength = getRandomNumber(1, 4);
  const arr = str.split(`.`);

  if (!arr[arr.length - 1]) {
    arr.pop();
  }// если последний элемент пустой уберем его

  return `${new Array(strLength).fill(``).map(() => getRandomValue(arr))
  .join(`.`)}.`;
};

const getCardData = () => {
  startDate = endDate;
  endDate = startDate + getRandomNumber(0, 24 * 3600 * 1000);
  return {
    eventItem: EventsList[Object.keys(EventsList)[getRandomNumber(0, Object.keys(EventsList).length)]],
    description: getDescription(),
    startDate,
    endDate,
    cost: getRandomNumber(5, 250),
    destination: getRandomValue(PointsOfDestination),
    offers: getOffersList(),
    images: getImages(),
  };
};

export const getPointsList = () => {
  const NUMBER_OF_POINTS = 5;
  const pointsList = [];
  for (let i = 0; i < NUMBER_OF_POINTS; i += 1) {
    pointsList[i] = getCardData();
  }
  return pointsList;
};

export const getFiltersData = () => {
  return [
    {
      title: `Everything`,
      type: `everything`,
      checked: true
    },
    {
      title: `Future`,
      type: `future`,
      checked: false
    },
    {
      title: `Past`,
      type: `past`,
      checked: false
    }
  ];
};

export const getMenuData = () => {
  return [
    {
      title: `Table`,
      active: true
    },
    {
      title: `Stats`,
      active: false
    }
  ];
};

export const getTripData = (points) => {
  return {
    title() {
      let route = points.map((el) => {
        return el.destination;
      });
      if (route.length > 3) {
        route.splice(1, route.length - 2, `...`);
      }
      return route.join(` — `);
    },
    date() {
      const tripDataStartDate = new Date(points[0].startDate);
      const tripDataEndDate = new Date(points[points.length - 1].endDate);
      return `${tripDataStartDate.getDate()} ${Months[tripDataStartDate.getMonth()].slice(0, 3)} — ${tripDataEndDate.getDate()} ${Months[tripDataEndDate.getMonth()].slice(0, 3)}`;
    }
  };
};
