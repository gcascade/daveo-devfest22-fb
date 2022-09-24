import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import obstacleImage from '../images/obstacle.png';

function Obstacle({ angle, x, y }) {
  return (
    <Sprite image={obstacleImage} x={x} y={y} angle={angle} />
  );
}

Obstacle.propTypes = {
  angle: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Obstacle;
