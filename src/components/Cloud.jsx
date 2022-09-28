import React from 'react';

import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';

import cloudImage from '../images/clouds.png';

export default function Cloud({ x, y, scale }) {
  return (
    <Sprite image={cloudImage} scale={scale} x={x} y={y} anchor={(0.5, 1)} />
  );
}

Cloud.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};
