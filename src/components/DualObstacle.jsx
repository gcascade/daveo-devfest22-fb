import React from 'react';
import PropTypes from 'prop-types';
import Obstacle from './Obstacle';

export default function DualObstacle({
  x, topHeight, gap, topId, bottomId, gameWidth, gameHeight,
}) {
  const bottomHeight = gameHeight - topHeight - gap;
  return (
    <>
      <Obstacle
        id={topId}
        isTop
        x={x}
        y={0}
        height={topHeight}
        isDual
        gameHeight={gameHeight}
        gameWidth={gameWidth}
      />
      <Obstacle
        id={bottomId}
        isTop={false}
        x={x}
        y={gameHeight}
        height={bottomHeight}
        isDual
        gameHeight={gameHeight}
        gameWidth={gameWidth}
      />
    </>
  );
}

DualObstacle.propTypes = {
  x: PropTypes.number.isRequired,
  topHeight: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
  topId: PropTypes.string.isRequired,
  bottomId: PropTypes.string.isRequired,
  gameWidth: PropTypes.number.isRequired,
  gameHeight: PropTypes.number.isRequired,
};
