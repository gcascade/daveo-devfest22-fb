import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import octopus from '../images/octopus.png';

export default function Octopus({
  x, y, scale,
}) {
  return (
    <Sprite image={octopus} scale={scale} x={x} y={y} anchor={0.5} />
  );
}

Octopus.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};
