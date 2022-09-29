import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import devfestImage from '../images/devfest.png';

export default function DevFest({ x, y, scale }) {
  return (
    <Sprite image={devfestImage} scale={scale} x={x} y={y} anchor={0.5} />
  );
}

DevFest.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};
