import {getRandomNumber, getRandomValue} from './utils';

const POINTS_OF_DESTINATION = [
  `Geneva`,
  `Amsterdam`,
  `Saint Petersburg`,
  `Chamonix`
];
const MONTHS = [
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

const EventsList = [
  {
    eventTitle: `Taxi to `,
    eventIcon: `img/icons/taxi.png`,
    destination: getRandomValue(POINTS_OF_DESTINATION)
  },
  {
    eventTitle: `Bus to `,
    eventIcon: `img/icons/bus.png`,
    destination: getRandomValue(POINTS_OF_DESTINATION)
  },
  {
    eventTitle: `Drive to `,
    eventIcon: `img/icons/drive.png`,
    destination: getRandomValue(POINTS_OF_DESTINATION)
  },
  {
    eventTitle: `Restaurant in `,
    eventIcon: `img/icons/restaurant.png`,
    destination: getRandomValue(POINTS_OF_DESTINATION)
  },
  {
    eventTitle: `Ship to `,
    eventIcon: `img/icons/ship.png`,
    destination: getRandomValue(POINTS_OF_DESTINATION)
  },
  {
    eventTitle: `Sightseeing in `,
    eventIcon: `img/icons/sightseeing.png`,
    destination: getRandomValue(POINTS_OF_DESTINATION)
  },
  {
    eventTitle: `Train to `,
    eventIcon: `img/icons/train.png`,
    destination: getRandomValue(POINTS_OF_DESTINATION)
  },
  {
    eventTitle: `Transport to `,
    eventIcon: `img/icons/transport.png`,
    destination: getRandomValue(POINTS_OF_DESTINATION)
  },
  {
    eventTitle: `Check-in `,
    eventIcon: `img/icons/check-in.png`,
    destination: getRandomValue(POINTS_OF_DESTINATION)
  },
];

const getOffersList = () => {
  const offersList = [
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
  for (let i = 0; i < getRandomNumber(0, 3); i += 1) {
    offersList[getRandomNumber(0, 4)].checked = true;
  }
  return offersList;
};

const someText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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

const getDescription = (str) => {
  const strLength = getRandomNumber(1, 4);
  const arr = str.split(`.`);

  if (!arr[arr.length - 1]) {
    arr.pop();
  }// если последний элемент пустой уберем его

  return `${new Array(strLength).fill(``).map(() => getRandomValue(arr))
  .join(`.`)}.`;
};

const getCardData = () => {
  return {
    eventItem: EventsList[Object.keys(EventsList)[getRandomNumber(0, Object.keys(EventsList).length)]],
    description: getDescription(someText),
    startDate: Date.now() + getRandomNumber(0, 3 * 24 * 3600 * 1000),
    endDate: Date.now() + getRandomNumber(3 * 24 * 3600 * 1000, 7 * 24 * 3600 * 1000),
    cost: getRandomNumber(5, 250),
    destination: getRandomValue(POINTS_OF_DESTINATION),
    offers: getOffersList(),
    images: getImages(),
  };
};

export const getPointsList = () => {
  const NUMBER_OF_POINTS = 4;
  const pointsList = [];
  for (let i = 0; i < NUMBER_OF_POINTS; i += 1) {
    pointsList[i] = getCardData();
  }
  return pointsList.sort((a, b) => {
    return (a.startDate < b.startDate && a.endDate > b.endDate);
  });
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
        return el.eventItem.destination;
      });
      if (route.length > 3) {
        route.splice(1, route.length - 2, `...`);
      }
      return route.join(` — `);
    },
    date() {
      const startDate = new Date(points[0].startDate);
      const endDate = new Date(points[points.length - 1].endDate);
      return `${startDate.getDate()} ${MONTHS[startDate.getMonth()].slice(0, 3)} — ${endDate.getDate()} ${MONTHS[endDate.getMonth()].slice(0, 3)}`;
    }
  };
};
