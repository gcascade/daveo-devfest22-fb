import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import yellowFish from '../images/yellowFish.png';
import pinkFish from '../images/pinkFish.png';

export default function Fish({
  x, y, scale, color,
}) {
  const image = color === 1 ? yellowFish : pinkFish;
  return (
    <Sprite image={image} scale={scale} x={x} y={y} anchor={0.5} />
  );
}

Fish.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  color: PropTypes.number.isRequired,
};
