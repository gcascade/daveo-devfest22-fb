import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import zeppelinImage from '../images/zeppelin.png';

export default function Zeppelin({ x, y, scale }) {
  return (
    <Sprite image={zeppelinImage} scale={scale} x={x} y={y} anchor={(0.5, 1)} />
  );
}

Zeppelin.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};
