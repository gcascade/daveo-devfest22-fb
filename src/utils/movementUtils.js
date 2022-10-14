export function moveElementHorizontally(x, setX, resetValue, speed) {
  if ((speed < 0 && x > 0) || (speed > 0 && x < 1920)) {
    setX(x + speed);
  } else {
    setX(resetValue);
  }
}

export function moveElementVertically(y, setY, resetValue, speed, threshold) {
  const minY = threshold ?? 0;
  const maxY = threshold ?? 1080;
  if ((speed < 0 && y > minY) || (speed > 0 && y < maxY)) {
    setY(y + speed);
  } else {
    setY(resetValue);
  }
}

export function moveElementVerticallyAndScaleUp(
  y,
  setY,
  resetValue,
  speed,
  threshold,
  scale,
  setScale,
  scaleSpeed,
  resetScaleValue,
) {
  const minY = threshold ?? 0;
  const maxY = threshold ?? 1080;
  if ((speed < 0 && y > minY) || (speed > 0 && y < maxY)) {
    setY(y + speed);

    if (scale < resetScaleValue) {
      setScale(scale + 0.001);
    } else {
      setScale(scale + scaleSpeed);
    }
  } else {
    setY(resetValue);
    setScale(0);
  }
}
