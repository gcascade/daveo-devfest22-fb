import React from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import obstacleImage from '../images/obstacle.png';
import { removeObstacle, moveObstacle, addObstacle } from '../slices/obstacleSlice';
import { incrementScore, endGame } from '../slices/gameSlice';

function hasCollidedWithBird(
  x,
  y,
  obstacleWidth,
  obstacleHeight,
  birdX,
  birdY,
  birdWidth,
  birdHeight,
) {
  const birdLeft = birdX - birdWidth / 2;
  const birdRight = birdX + birdWidth / 2;
  const birdTop = birdY - birdHeight / 2;
  const birdBottom = birdY + birdHeight / 2;

  const obstacleLeft = x - obstacleWidth / 2;
  const obstacleRight = x + obstacleWidth / 2;
  const obstacleTop = y - obstacleHeight / 2;
  const obstacleBottom = y + obstacleHeight / 2;

  return (
    birdLeft < obstacleRight
      && birdRight > obstacleLeft
      && birdTop < obstacleBottom
      && birdBottom > obstacleTop
  );
}

function Obstacle({
  id, angle, x, y,
}) {
  const dispatch = useDispatch();
  const obstacleSpeed = useSelector((state) => state.game.obstacleSpeed);
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const birdX = useSelector((state) => state.bird.x);
  const birdY = useSelector((state) => state.bird.y);
  const birdWidth = useSelector((state) => state.game.birdWidth);
  const birdHeight = useSelector((state) => state.game.birdHeight);
  const obstacleWidth = useSelector((state) => state.game.obstacleWidth);
  const obstacleHeight = useSelector((state) => state.game.obstacleHeight);
  const width = useSelector((state) => state.game.width);

  useTick(() => {
    if (gameHasStarted) {
      if (x >= 0) {
        if (hasCollidedWithBird(
          x,
          y,
          obstacleWidth,
          obstacleHeight,
          birdX,
          birdY,
          birdWidth,
          birdHeight,
        )) {
          dispatch(endGame());
        } else {
          dispatch(moveObstacle({ id, x: -obstacleSpeed }));
        }
      } else {
        dispatch(removeObstacle(id));
        dispatch(addObstacle({ angle, x: width, y }));
        dispatch(incrementScore());
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
