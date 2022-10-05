import React, { useState } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import obstacleImage from '../images/veryLongObstacle.png';
import {
  removeObstacle, moveObstacle, addObstacle, addDualObstacle,
} from '../slices/obstacleSlice';
import { incrementScore, endGame, updateSettings } from '../slices/gameSlice';

function hasCollidedWithBird(
  x,
  y,
  obstacleWidth,
  obstacleHeight,
  birdX,
  birdY,
  birdWidth,
  birdHeight,
  isTop,
) {
  const birdLeft = birdX - birdWidth / 2;
  const birdRight = birdX + birdWidth / 2;
  const birdTop = birdY - birdHeight / 2;
  const birdBottom = birdY + birdHeight / 2;

  const obstacleLeft = x - obstacleWidth / 2;
  const obstacleRight = x + obstacleWidth / 2;
  const obstacleBottom = isTop ? y + obstacleHeight : y;
  const obstacleTop = isTop ? y : y - obstacleHeight;

  return (
    birdLeft < obstacleRight
      && birdRight > obstacleLeft
      && birdTop < obstacleBottom
      && birdBottom > obstacleTop
  );
}

function hasPassedBird(x, birdX, obstacleWidth, birdWidth) {
  const birdLeft = birdX - birdWidth / 2;
  const obstacleRight = x + obstacleWidth / 2;
  return obstacleRight < birdLeft;
}

function Obstacle({
  id, x, y, isTop, height, isDual,
}) {
  const dispatch = useDispatch();
  const obstacleSpeed = useSelector((state) => state.game.obstacleSpeed);
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const birdX = useSelector((state) => state.bird.x);
  const birdY = useSelector((state) => state.bird.y);
  const birdWidth = useSelector((state) => state.game.birdWidth);
  const birdHeight = useSelector((state) => state.game.birdHeight);
  const obstacleWidth = useSelector((state) => state.game.obstacleWidth);
  const width = useSelector((state) => state.game.width);
  const gameHeight = useSelector((state) => state.game.height);
  const gameSpeed = useSelector((state) => state.game.gameSpeed);
  // const obstacleMinSpacing = useSelector((state) => state.game.obstacleMinSpacing);
  // const obstacleMaxSpacing = useSelector((state) => state.game.obstacleMaxSpacing);
  const obstacleImageHeight = useSelector((state) => state.game.obstacleImageHeight);
  const gap = useSelector((state) => state.game.obstacleGap);
  const [scored, setScored] = useState(false);
  const score = useSelector((state) => state.game.score);
  const godMode = useSelector((state) => state.game.godMode);
  const maxGameSpeed = useSelector((state) => state.game.maxGameSpeed);
  const paused = useSelector((state) => state.game.paused);
  const speedIncrease = useSelector((state) => state.game.speedIncrease);
  const minHeight = useSelector((state) => state.game.obstacleMinHeight);

  useTick(() => {
    if (!paused && gameHasStarted) {
      if (x >= 0) {
        if (hasCollidedWithBird(
          x,
          y,
          obstacleWidth,
          height,
          birdX,
          birdY,
          birdWidth,
          birdHeight,
          isTop,
        ) && !godMode) {
          dispatch(endGame());
        } else if ((isDual && isTop) || !isDual) {
          dispatch(moveObstacle({ id, x: -obstacleSpeed * gameSpeed }));

          if (hasPassedBird(x, birdX, obstacleWidth, birdWidth) && !scored) {
            dispatch(incrementScore());
            setScored(true);

            if (score >= 19 && score % 10 === 9 && gameSpeed < maxGameSpeed) {
              dispatch(updateSettings({ gameSpeed: gameSpeed + speedIncrease }));
            }
          }
        }
      } else if ((isDual && isTop) || !isDual) {
        dispatch(removeObstacle(id));
        // const rand = Math.random() * (obstacleMaxSpacing -
        // obstacleMinSpacing) + obstacleMinSpacing;
        const rand = 0;
        const newObstacleX = width + rand;
        const newHeight = Math.floor(Math.random() * (0.5 * (gameHeight - minHeight)) + minHeight);

        const newIsDual = Math.random() >= 0.5;
        if (newIsDual) {
          dispatch(addDualObstacle({
            x: newObstacleX,
            height: newHeight,
            gap,
          }));
        } else {
          const newIsTop = Math.random() >= 0.5;

          dispatch(addObstacle({
            isTop: newIsTop, x: newObstacleX, y: newIsTop ? 0 : gameHeight, height: newHeight,
          }));
        }
      }
    }
  });
  return (
    <Sprite
      image={obstacleImage}
      x={x}
      y={isTop ? y + height : y + obstacleImageHeight - height}
      angle={isTop ? 180 : 0}
      anchor={{ x: 0.5, y: isTop ? 0 : 1 }}
    />
  );
}

Obstacle.propTypes = {
  id: PropTypes.string.isRequired,
  isTop: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isDual: PropTypes.bool.isRequired,
};

export default Obstacle;
