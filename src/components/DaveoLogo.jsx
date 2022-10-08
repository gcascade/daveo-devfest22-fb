import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import daveoImage from '../images/daveo.png';
import daveoImageWhite from '../images/daveo_white.png';

export default function DaveoLogo({
  x, y, scale, color,
}) {
  const image = color === 1 ? daveoImage : daveoImageWhite;
  return (
    <Sprite image={image} scale={scale} x={x} y={y} anchor={0.5} />
  );
}

DaveoLogo.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  color: PropTypes.number.isRequired,
};
