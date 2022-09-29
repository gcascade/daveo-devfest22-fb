import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import elephantImage from '../images/elephant.png';

export default function Elephant({ x, y, scale }) {
  return (
    <Sprite image={elephantImage} scale={scale} x={x} y={y} anchor={0.5} />
  );
}

Elephant.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};
