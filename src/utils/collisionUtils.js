export function pointHitRectangle(point, rectangle) {
  return point.x >= rectangle.xMin
    && point.x <= rectangle.xMax
    && point.y >= rectangle.yMin
    && point.y <= rectangle.yMax;
}

export function pointHitCircle(point, circle) {
  const distance = Math.sqrt(
    (point.x - circle.x) ** 2 + (point.y - circle.y) ** 2,
  );
  return distance <= circle.radius;
}
