// eslint-disable-next-line import/prefer-default-export
export function randomNumberBetween(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}
