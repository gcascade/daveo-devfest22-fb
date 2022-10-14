import React from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import coin from '../images/coin_100x100.png';
import heart from '../images/heart_100x100.png';
import { pointHitCircle } from '../utils/collisionUtils';
import {
  collectBonus, moveBonus, resetBonus, updateBonus,
} from '../slices/bonusSlice';
import { balloonSprite, nautilusSprite } from '../constants';

const baseRadius = 50;

function checkCollision(x, y, radius, birdX, birdY, isSeaWorld) {
  const sprite = isSeaWorld ? nautilusSprite : balloonSprite;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < sprite.collisionData.coords.length; i++) {
    const birdPoint = sprite.collisionData.coords[i];
    const birdPointX = birdX + birdPoint.x - sprite.collisionData.center.x;
    const birdPointY = birdY + birdPoint.y - sprite.collisionData.center.y;

    if (pointHitCircle({ x: birdPointX, y: birdPointY }, { x, y, radius })) {
      return true;
    }
  }

  return false;
}

function Bonus({
  id, x, y, type, scale, active, goingUp, minY, maxY,
}) {
  const dispatch = useDispatch();
  const birdX = useSelector((state) => state.bird.x);
  const birdY = useSelector((state) => state.bird.y);
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const paused = useSelector((state) => state.game.paused);
  const gameSpeed = useSelector((state) => state.game.gameSpeed);

  let image;

  if (type === 'coin') {
    image = coin;
  } else if (type === 'heart') {
    image = heart;
  }

  if (type !== 'coin' && type !== 'heart') {
    return null;
  }

  useTick(() => {
    if (!gameHasStarted || paused || !active) {
      return;
    }

    const yMovement = goingUp ? -1 : 1;

    dispatch(moveBonus({ x: -gameSpeed, y: yMovement }));

    if (y + yMovement < minY || y + yMovement > maxY) {
      dispatch(updateBonus({ goingUp: !goingUp }));
    }

    if (checkCollision(x, y, baseRadius * scale, birdX, birdY, isSeaWorld)) {
      dispatch(collectBonus({ id, type }));
    }

    if (x < 0) {
      dispatch(resetBonus());
    }
  });

  return (
    <Sprite
      image={image}
      x={x}
      y={y}
      anchor={0.5}
      scale={scale}
    />
  );
}

Bonus.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  goingUp: PropTypes.bool.isRequired,
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
};

export default Bonus;
