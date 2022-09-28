import React from 'react';

import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';

import mountainImage from '../images/mountain.png';

export default function Mountain({ x, y, scale }) {
  return (
    <Sprite image={mountainImage} scale={scale} x={x} y={y} anchor={(0.5, 1)} />
  );
}

Mountain.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};
