import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import ground from '../images/ground.png';
import seaGround from '../images/seaGround.png';

export default function Ground({
  x, y, scale, color,
}) {
  const image = color === 1 ? ground : seaGround;
  return (
    <Sprite image={image} scale={scale} x={x} y={y} anchor={(0.5, 1)} />
  );
}

Ground.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  color: PropTypes.number.isRequired,
};
