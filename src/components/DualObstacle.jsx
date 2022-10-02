import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Obstacle from './Obstacle';

export default function DualObstacle({
  x, topHeight, gap, topId, bottomId,
}) {
  const gameHeight = useSelector((state) => state.game.height);
  const bottomHeight = gameHeight - topHeight - gap;
  return (
    <>
      <Obstacle id={topId} isTop x={x} y={0} height={topHeight} isDual />
      <Obstacle id={bottomId} isTop={false} x={x} y={gameHeight} height={bottomHeight} isDual />
    </>
  );
}

DualObstacle.propTypes = {
  x: PropTypes.number.isRequired,
  topHeight: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
  topId: PropTypes.string.isRequired,
  bottomId: PropTypes.string.isRequired,
};
