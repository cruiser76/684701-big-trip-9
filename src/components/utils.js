export const getRandomNumber = (minNumber = 0, maxNumber = 1) => {
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
};

export const getRandomValue = (arrayOfValues) => {
  return arrayOfValues[getRandomNumber(0, arrayOfValues.length)];
};

export const getDuration = (timeInterval) => {
  let days = Math.ceil(Math.floor(timeInterval / (24 * 3600000)));
  let hours = Math.floor((timeInterval % 86400000) / 3600000);
  let minutes = Math.round(((timeInterval % 86400000) % 3600000) / 60000);
  return {days, hours, minutes};
};
