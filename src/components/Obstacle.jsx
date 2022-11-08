import React, { useState } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import obstacleImage2 from '../images/veryLongObstacle.png';
import {
  addDualObstacle, addObstacle, moveObstacle, removeObstacle,
} from '../slices/obstacleSlice';
import {
  endGame, incrementScore, updateSettings, loseLife,
} from '../slices/gameSlice';
import { rollNextBonus, addBonus, removeOneHeartBonus } from '../slices/bonusSlice';
import { setInvincible } from '../slices/birdSlice';
import { play, stopAll } from '../slices/soundSlice';
import { balloonSprite, nautilusSprite } from '../constants';
import { pointHitRectangle } from '../utils/collisionUtils';
import { randomNumberBetween, randomBonus } from '../utils/randomUtils';

/** check body
 * isTop => anchorY = 0 !isTop => anchorY = 1
 * x
 * isTop => body goes from obstacleX - obstacleWidth / 2 + 16 to obstacleX + obstacleWidth / 2 - 14
 * !isTop => body goes from obstacleX - obstacleWidth / 2 + 14 to obstacleX + obstacleWidth / 2 -16
 * y
 * isTop => body goes from y = 0 = obstacleY to y = bodySize
 * !isTop => body goes from gameHeight = y - bodySize to gameHeight = y
 */
function checkCollisionWithObstacleBody(
  birdX,
  birdY,
  obstacleX,
  obstacleY,
  obstacleWidth,
  bodySize,
  isTop,
) {
  const bodyFirstPoint = {
    x: isTop ? obstacleX - obstacleWidth / 2 + 16 : obstacleX - obstacleWidth / 2 + 14,
    y: isTop ? obstacleY : obstacleY - bodySize,
  };
  const bodyLastPoint = {
    x: isTop ? obstacleX + obstacleWidth / 2 - 14 : obstacleX + obstacleWidth / 2 + 16,
    y: isTop ? obstacleY + bodySize : obstacleY,
  };

  const point = { x: birdX, y: birdY };
  const rectangle = {
    xMin: bodyFirstPoint.x,
    xMax: bodyLastPoint.x,
    yMin: bodyFirstPoint.y,
    yMax: bodyLastPoint.y,
  };
  return pointHitRectangle(point, rectangle);
}

/**
 * check head
 * isTop => anchor = 0 !isTop => anchor = 1
 * x
 * goes from obstacleX - obstacleWdith / 2 to obstacleX + obstacleWidth / 2
 * y
 * isTop => head goes from obstacleHeight - headSize to obstacleHeight
 * !isTop => head goes from gameHeight - obstacleHeight to gameHeight - obstacleHeight + headSize
 */
function checkCollisionWithObstacleHead(
  birdX,
  birdY,
  obstacleX,
  obstacleWidth,
  obstacleHeight,
  gameHeight,
  headSize,
  isTop,
) {
  const headFirstPoint = {
    x: obstacleX - obstacleWidth / 2,
    y: isTop ? obstacleHeight - headSize : gameHeight - obstacleHeight,
  };
  const headLastPoint = {
    x: obstacleX + obstacleWidth / 2,
    y: isTop ? obstacleHeight : gameHeight - obstacleHeight + headSize,
  };

  const point = { x: birdX, y: birdY };
  const rectangle = {
    xMin: headFirstPoint.x,
    xMax: headLastPoint.x,
    yMin: headFirstPoint.y,
    yMax: headLastPoint.y,
  };
  return pointHitRectangle(point, rectangle);
}

function checkCollisionWithObstacle(
  birdX,
  birdY,
  obstacleX,
  obstacleY,
  obstacleWidth,
  obstacleHeight,
  isTop,
  headSize,
  bodySize,
  gameHeight,
) {
  return checkCollisionWithObstacleHead(
    birdX,
    birdY,
    obstacleX,
    obstacleWidth,
    obstacleHeight,
    gameHeight,
    headSize,
    isTop,
  )
        || checkCollisionWithObstacleBody(
          birdX,
          birdY,
          obstacleX,
          obstacleY,
          obstacleWidth,
          bodySize,
          isTop,
        );
}

function customCollision(
  obstacleX,
  obstacleY,
  obstacleWidth,
  obstacleHeight,
  birdX,
  birdY,
  birdScale,
  isTop,
  gameHeight,
  isSeaWorld,
  isMobile,
) {
  // check head : head has a height of 55px
  const headSize = isMobile ? 27.5 : 55;
  const bodySize = obstacleHeight - headSize;

  const sprite = isSeaWorld ? nautilusSprite : balloonSprite;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < sprite.collisionData.coords.length; i++) {
    const birdPoint = sprite.collisionData.coords[i];
    const birdPointX = birdX + birdPoint.x * birdScale - sprite.collisionData.center.x * birdScale;
    const birdPointY = birdY + birdPoint.y * birdScale - sprite.collisionData.center.y * birdScale;

    if (checkCollisionWithObstacle(
      birdPointX,
      birdPointY,
      obstacleX,
      obstacleY,
      obstacleWidth,
      obstacleHeight,
      isTop,
      headSize,
      bodySize,
      gameHeight,
      isMobile,
    )) {
      return true;
    }
  }

  return false;
}

function hasCollidedWithBird(
  x,
  y,
  obstacleWidth,
  obstacleHeight,
  birdX,
  birdY,
  birdScale,
  isTop,
  gameHeight,
  isSeaWorld,
  isMobile,
) {
  return customCollision(
    x,
    y,
    obstacleWidth,
    obstacleHeight,
    birdX,
    birdY,
    birdScale,
    isTop,
    gameHeight,
    isSeaWorld,
    isMobile,
  );
}

function hasPassedBird(x, birdX, obstacleWidth, birdWidth) {
  const birdLeft = birdX - birdWidth / 2;
  const obstacleRight = x + obstacleWidth / 2;

  return obstacleRight < birdLeft;
}

function Obstacle({
  id, x, y, isTop, height, isDual, gameWidth, gameHeight, isMobile,
}) {
  const dispatch = useDispatch();
  const obstacleSpeed = useSelector((state) => state.game.obstacleSpeed);
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const birdX = useSelector((state) => state.bird.x);
  const birdY = useSelector((state) => state.bird.y);
  const birdWidth = useSelector((state) => state.game.birdWidth);
  const birdScale = useSelector((state) => state.game.birdScale);
  const obstacleWidth = useSelector((state) => state.game.obstacleWidth);
  const gameSpeed = useSelector((state) => state.game.gameSpeed);
  const obstacleImageHeight = useSelector((state) => state.game.obstacleImageHeight);
  const gap = useSelector((state) => state.game.obstacleGap);
  const [scored, setScored] = useState(false);
  const score = useSelector((state) => state.game.score);
  const godMode = useSelector((state) => state.game.godMode);
  const maxGameSpeed = useSelector((state) => state.game.maxGameSpeed);
  const paused = useSelector((state) => state.game.paused);
  const speedIncrease = useSelector((state) => state.game.speedIncrease);
  const minHeight = useSelector((state) => state.game.obstacleMinHeight);
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);
  const obstacles = useSelector((state) => state.obstacle.obstacles);
  const obstacleGap = useSelector((state) => state.game.obstacleGap);
  const nextBonus = useSelector((state) => state.bonus.nextBonus);
  const lives = useSelector((state) => state.game.lives);
  const birdIsInvincible = useSelector((state) => state.bird.invincible);
  const obstacleMinSpacing = useSelector((state) => state.game.obstacleMinSpacing);
  const effectVolume = useSelector((state) => state.sound.effectVolume);
  const speed = isMobile ? gameSpeed / 2 : gameSpeed;

  useTick((delta) => {
    if (!paused && gameHasStarted) {
      if (x >= 0) {
        if (hasCollidedWithBird(
          x,
          y,
          obstacleWidth,
          height,
          birdX,
          birdY,
          isMobile ? birdScale / 2 : birdScale,
          isTop,
          gameHeight,
          isSeaWorld,
          isMobile,
        ) && !godMode && !birdIsInvincible && !scored) {
          if (lives && lives > 0) {
            dispatch(loseLife());
            dispatch(removeOneHeartBonus());
            dispatch(setInvincible(true));
            dispatch(play({ name: 'hit', volume: effectVolume }));
          } else {
            dispatch(endGame());
            dispatch(stopAll());
            dispatch(play({ name: 'game_over', volume: effectVolume }));
          }
        } else if ((isDual && isTop) || !isDual) {
          dispatch(moveObstacle({ id, x: -obstacleSpeed * speed * delta }));

          if (hasPassedBird(x, birdX, obstacleWidth, birdWidth) && !scored) {
            dispatch(incrementScore());
            dispatch(setInvincible(false));
            setScored(true);
            dispatch(play({ name: 'score_point', volume: effectVolume }));

            if (score >= nextBonus) {
              dispatch(rollNextBonus());
              // between 2 pipes
              const bonusDelta = 0.125 * gameWidth > obstacleMinSpacing / 2
                ? 0.125 * gameWidth : obstacleMinSpacing / 2;
              dispatch(addBonus({
                x: gameWidth + bonusDelta - obstacleWidth / 2 - birdWidth / 2,
                y: randomNumberBetween(0.1 * gameHeight, 0.9 * gameHeight),
                scale: 0.5,
                type: randomBonus(),
              }));
            }

            if (score >= 19 && score % 10 === 9 && gameSpeed < maxGameSpeed) {
              dispatch(updateSettings({ gameSpeed: gameSpeed + speedIncrease }));
              dispatch(play({ name: 'fast', volume: effectVolume }));
            }
          }
        }
      } else if ((isDual && isTop) || !isDual) {
        // Delete current obstacle and generate a new one
        dispatch(removeObstacle(id));
        const lastObstacle = obstacles[obstacles.length - 1];

        // adjust the variation between obstacles caused by the useTick's delta
        let expectedDistanceBetweenObstacles = gameWidth / 4 > obstacleMinSpacing
          ? gameWidth / 4 : obstacleMinSpacing;
        if (isMobile) {
          expectedDistanceBetweenObstacles *= 2 / 3;
        }
        const adjustments = gameWidth - lastObstacle.x - expectedDistanceBetweenObstacles;
        const newObstacleX = gameWidth - adjustments;

        let newHeight = 0;

        const newIsDual = Math.random() >= 0.5;
        const newIsTop = Math.random() >= 0.5;

        const switchingOrientation = !newIsDual && newIsTop !== isTop;

        // cut the screen in three parts : 40% top, 20% middle, 40% bottom
        // if lastObstacle is in the top or bottom part, generate an obstacle in the middle part
        const inTopOrBottomPart = lastObstacle.height < gameHeight * 0.2
                    || lastObstacle.height > 0.6 * gameHeight;

        const startingHeight = newIsDual ? minHeight + obstacleGap / 2 : minHeight;

        if (inTopOrBottomPart) {
          // console.log('In top or bottom let\'s go mid');

          if (lastObstacle.height > gameHeight / 2) {
            // console.log("But I was so tall so I'll be nice this time");
            if (switchingOrientation) {
              // console.log("I'll be even nicer");
              newHeight = newIsDual ? gameHeight / 2 : 0.4 * gameHeight;
            } else {
              newHeight = randomNumberBetween(startingHeight, gameHeight / 3);
            }
          } else {
            newHeight = randomNumberBetween(gameHeight / 3, (gameHeight / 3) * 2);
          }
        } else {
          if (switchingOrientation) {
            // console.log("I might be mean, so I'll try to be nice");
            newHeight = randomNumberBetween(startingHeight, gameHeight / 2);
          }
          newHeight = randomNumberBetween(startingHeight, 0.7 * gameHeight);
        }

        // last adjustments
        if (newIsDual && Math.abs(lastObstacle.height - newHeight) > 0.25 * gameHeight) {
          newHeight = randomNumberBetween(0.4 * gameHeight, 0.6 * gameHeight);
        } else if (switchingOrientation && lastObstacle.height + newHeight > 0.8 * gameHeight) {
          // make a small one if the sum of the heights is too high
          newHeight = randomNumberBetween(minHeight, 0.4 * gameHeight);
        }

        if (newIsDual) {
          newHeight -= obstacleGap / 2;
        }

        if (newIsDual) {
          dispatch(addDualObstacle({
            x: newObstacleX,
            height: newHeight,
            gap,
          }));
        } else {
          dispatch(addObstacle({
            isTop: newIsTop, x: newObstacleX, y: newIsTop ? 0 : gameHeight, height: newHeight,
          }));
        }
      }
    }
  });

  const defaultScale = 0.269;
  const obstacleScale = isMobile ? 0.2 : defaultScale;
  const imageHeight = obstacleImageHeight * (obstacleScale / defaultScale);
  return (
    <Sprite
      image={obstacleImage2}
      x={x}
      y={isTop ? y + height : y + imageHeight - height}
      angle={isTop ? 180 : 0}
      anchor={{ x: 0.5, y: isTop ? 0 : 1 }}
      {...(isTop ? { scale: { x: -obstacleScale, y: obstacleScale } } : { scale: obstacleScale })}
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
  gameWidth: PropTypes.number.isRequired,
  gameHeight: PropTypes.number.isRequired,
  isMobile: PropTypes.bool,
};

Obstacle.defaultProps = {
  isMobile: false,
};

export default Obstacle;
