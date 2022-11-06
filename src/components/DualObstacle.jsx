import React from 'react';
import PropTypes from 'prop-types';
import Obstacle from './Obstacle';

export default function DualObstacle({
  x, topHeight, gap, topId, bottomId, gameWidth, gameHeight, isMobile,
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
        isMobile={isMobile}
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
        isMobile={isMobile}
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
  isMobile: PropTypes.bool,
};

DualObstacle.defaultProps = {
  isMobile: false,
};
