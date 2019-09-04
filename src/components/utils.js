export const getRandomNumber = (minNumber = 0, maxNumber = 1) => {
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
};

export const getRandomValue = (arrayOfValues) => {
  return arrayOfValues[getRandomNumber(0, arrayOfValues.length)];
};

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template.trim();
  return element.firstChild;
};

// Рендер и анрендер для компонент
const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFORE: `before`,
  AFTER: `after`
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.BEFORE:
      container.before(element);
      break;
    case Position.AFTER:
      container.after(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
