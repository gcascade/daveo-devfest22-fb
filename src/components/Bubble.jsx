import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import bubbleImage from '../images/bubble.png';

export default function Bubble({ x, y, scale }) {
  return (
    <Sprite image={bubbleImage} scale={scale} x={x} y={y} anchor={0.5} />
  );
}

Bubble.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};
