import React from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import obstacleImage from '../images/obstacle.png';
import { removeObstacle, moveObstacle } from '../slices/obstacleSlice';

function Obstacle({
  id, angle, x, y,
}) {
  const dispatch = useDispatch();
  const obstacleSpeed = useSelector((state) => state.game.obstacleSpeed);
  const gameHasStarted = useSelector((state) => state.game.hasStarted);

  useTick(() => {
    if (gameHasStarted) {
      if (x >= 0) {
        dispatch(moveObstacle({ id, x: -obstacleSpeed }));
      } else {
        dispatch(removeObstacle(id));
      }
    }
  });

  return (
    <Sprite image={obstacleImage} x={x} y={y} angle={angle} anchor={0.5} />
  );
}

Obstacle.propTypes = {
  id: PropTypes.string.isRequired,
  angle: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Obstacle;
