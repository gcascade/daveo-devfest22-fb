import React from 'react';

import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';

import rockImage from '../images/rocks.png';

export default function Rock({ x, y, scale }) {
  return (
    <Sprite image={rockImage} scale={scale} x={x} y={y} anchor={(0.5, 1)} />
  );
}

Rock.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};
