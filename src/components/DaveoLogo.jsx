import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import daveoImage from '../images/daveo.png';

export default function DaveoLogo({ x, y, scale }) {
  return (
    <Sprite image={daveoImage} scale={scale} x={x} y={y} anchor={0.5} />
  );
}

DaveoLogo.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};
