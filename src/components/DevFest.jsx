import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import devfestImage from '../images/devfest.png';
import devfestImageWhite from '../images/devfest_white.png';

export default function DevFest({
  x, y, scale, color,
}) {
  const image = color === 1 ? devfestImage : devfestImageWhite;
  return (
    <Sprite image={image} scale={scale} x={x} y={y} anchor={0.5} />
  );
}

DevFest.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  color: PropTypes.number.isRequired,
};
