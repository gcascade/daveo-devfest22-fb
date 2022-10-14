import { bonusTypes } from '../constants';

export function randomNumberBetween(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

export function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function randomBonus() {
  return randomFromList(bonusTypes);
}
