import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import yellowCoral from '../images/yellowCoral.png';
import pinkCoral from '../images/pinkCoral.png';

export default function Coral({
  x, y, scale, color,
}) {
  const image = color === 1 ? yellowCoral : pinkCoral;
  return (
    <Sprite image={image} scale={scale} x={x} y={y} anchor={0.5} />
  );
}

Coral.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  color: PropTypes.number.isRequired,
};
