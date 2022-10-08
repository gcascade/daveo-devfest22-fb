import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import algaeImage from '../images/algae.png';

export default function Algae({ x, y, scale }) {
  return (
    <Sprite image={algaeImage} scale={scale} x={x} y={y} anchor={0.5} />
  );
}

Algae.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};
